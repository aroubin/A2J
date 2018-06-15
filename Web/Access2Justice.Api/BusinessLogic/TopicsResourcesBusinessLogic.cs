﻿using Access2Justice.CosmosDb.Interfaces;
using Access2Justice.Shared.Interfaces;
using Access2Justice.Shared.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Access2Justice.Api.BusinessLogic
{
    public class TopicsResourcesBusinessLogic : ITopicsResourcesBusinessLogic
    {
        private readonly IDynamicQueries dbClient;
        private readonly ICosmosDbSettings dbSettings;
        private readonly IBackendDatabaseService backendDatabaseService;

        public TopicsResourcesBusinessLogic(IDynamicQueries dynamicQueries, ICosmosDbSettings cosmosDbSettings, IBackendDatabaseService backendDbService)
        {
            dbClient = dynamicQueries;
            dbSettings = cosmosDbSettings;
            backendDatabaseService = backendDbService;
        }

        public async Task<dynamic> GetResourcesAsync(dynamic topics)
        {
            var ids = new List<string>();
            foreach(var topic in topics)
            {
                ids.Add(topic.id);
            }

            return await dbClient.FindItemsWhereArrayContainsAsync(dbSettings.ResourceCollectionId, "topicTags", "id", ids);
        }

        public async Task<dynamic> GetTopicsAsync(string keyword)
        {
            return await dbClient.FindItemsWhereContainsAsync(dbSettings.TopicCollectionId, "keywords", keyword);
        }

        public async Task<dynamic> GetTopLevelTopicsAsync()
        {
            return await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId, "parentTopicID", "");
        }

        public async Task<dynamic> GetSubTopicsAsync(string ParentTopicId)
        {
            return await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId, "parentTopicID", ParentTopicId);
        }

        public async Task<dynamic> GetResourceAsync(string ParentTopicId)
        {
            return await dbClient.FindItemsWhereArrayContainsAsync(dbSettings.ResourceCollectionId, "topicTags", "id", ParentTopicId);
        }

        public async Task<dynamic> GetDocumentAsync(string id)
        {
            return await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId, "id", id);
        }

        //Added for Topic and Resource Tools API
        //Get Topic Guid based on topic name for ParentTopicID in Topics and refernceTags in Resources
        public async Task<dynamic> GetTopicAsync(string topicName)
        {
            //var query = "SELECT c.id FROM c WHERE c.name = " + "\"" + topicName + "\"";
            //var result = await backendDatabaseService.QueryItemsAsync(cosmosDbSettings.TopicCollectionId, query);
            var result = await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId, "name", topicName);
            return result;
        }

        //Get Topic Details
        public async Task<dynamic> GetTopicDetailsAsync(string topicName)
        {
            //var query = "SELECT * FROM c WHERE c.name = " + "\"" + topicName + "\"";
            //var result = await backendDatabaseService.QueryItemsAsync(dbSettings.TopicCollectionId, query);
            var result = await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId, "name", topicName);
            return result;
        }

        //Get Resources Details
        public async Task<dynamic> GetResourceDetailAsync(string resourceName, string resourceType)
        {
            //var query = "SELECT * FROM c WHERE c.name = " + "\"" + resourceName + "\"" + " AND " + "c.resourceType = " + "\"" + resourceType + "\"";
            //SELECT* FROM c where c.name = "Sample" AND c.resourceType = "forms"

            var result = await dbClient.FindItemsWhereAsync(dbSettings.ResourceCollectionId, "name", resourceName, "resourceType", resourceType);//Need to create another method to fetch resource based on name and type
            return result;
        }

        //Added for mandatory fields
        public async Task<IEnumerable<Topic>> GetTopicMandatoryDetailsAsync(string topicName)
        {
            //var query = "SELECT * FROM c WHERE c.name = " + "\"" + topicName + "\"";
            IEnumerable<Topic> result = await dbClient.FindItemsWhereAsync(dbSettings.TopicCollectionId,"name", topicName);
            return result;
        }

        public async Task<IEnumerable<object>> CreateTopicsAsync(string path)
        {
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                var topics = JsonConvert.DeserializeObject<List<dynamic>>(json);
                foreach (var topic in topics)
                {
                    var result = await backendDatabaseService.CreateItemAsync(topic, dbSettings.TopicCollectionId);
                }
                return topics;
            }
        }

        public async Task<object> CreateTopicDocumentAsync(Topic topic)
        {
            var serializedResult = JsonConvert.SerializeObject(topic);
            JObject result = (JObject)JsonConvert.DeserializeObject(serializedResult);
            var results = await backendDatabaseService.CreateItemAsync(result, dbSettings.TopicCollectionId);
            return results;

        }

        public async Task<IEnumerable<object>> CreateResourcesAsync(string type, string path)
        {
            using (StreamReader r = new StreamReader(path))
            {
                dynamic resources = null;
                string json = r.ReadToEnd();
                resources = JsonConvert.DeserializeObject<List<dynamic>>(json);

                if (type == "Action Plans")
                {
                    foreach (var resource in resources)
                    {
                        //validations goes here
                        var result = await backendDatabaseService.CreateItemAsync(resource, dbSettings.ResourceCollectionId);
                    }
                }

                else if (type == "Forms")
                {
                    foreach (var resource in resources)
                    {
                        //validations goes here
                        var result = await backendDatabaseService.CreateItemAsync(resource, dbSettings.ResourceCollectionId);
                    }
                }
                return resources;
            }
        }

        public async Task<IEnumerable<object>> CreateResourceDocumentAsync(dynamic resource)
        {
            List<dynamic> results = new List<dynamic>();
            List<dynamic> resources = new List<dynamic>();

            var resourceObjects = JsonConvert.DeserializeObject<List<dynamic>>(resource);
            List<Form> forms = new List<Form>();
            foreach (var resourceObject in resourceObjects)
            {
                if (resourceObject.resourceType == "Forms")
                {
                    List<ReferenceTag> referenceTags = new List<ReferenceTag>();
                    List<Location> locations = new List<Location>();

                    foreach (JProperty field in resourceObject)
                    {

                        if (field.Name == "referenceTags")
                        {
                            foreach (var referenceTag in field.Value)
                            {
                                string id = string.Empty;
                                foreach (JProperty tags in referenceTag)
                                {
                                    if (tags.Name == "id")
                                    {
                                        id = tags.Value.ToString();
                                    }
                                }
                                referenceTags.Add(new ReferenceTag { ReferenceTags = id });
                            }
                        }

                        if (field.Name == "location")
                        {
                            foreach (var loc in field.Value)
                            {
                                string state = string.Empty, county = string.Empty, city = string.Empty, zipCode = string.Empty;
                                foreach (JProperty locs in loc)
                                {
                                    if (locs.Name == "state")
                                    {
                                        state = locs.Value.ToString();
                                    }
                                    else if (locs.Name == "county")
                                    {
                                        county = locs.Value.ToString();
                                    }
                                    else if (locs.Name == "city")
                                    {
                                        city = locs.Value.ToString();
                                    }
                                    else if (locs.Name == "zipCode")
                                    {
                                        zipCode = locs.Value.ToString();
                                    }
                                }
                                locations.Add(new Location { State = state, County = county, City = city, ZipCode = zipCode });
                            }
                        }
                    }

                    forms.Add(new Form()
                    {
                        ResourceId = Guid.NewGuid(),
                        Name = resourceObject.name,
                        Description = resourceObject.description,
                        ResourceType = resourceObject.resourceType,
                        ExternalUrls = resourceObject.externalUrl,
                        Urls = resourceObject.url,
                        ReferenceTags = referenceTags,
                        Location = locations,
                        Icon = resourceObject.icon,
                        FullDescription = resourceObject.fullDescription,
                        CreatedBy = resourceObject.createdBy,
                        ModifiedBy = resourceObject.modifiedBy,
                        Overview = resourceObject.overview
                    });
                }
            }

            foreach (var resourceForm in forms)
            {
                var serializedResult = JsonConvert.SerializeObject(resourceForm);
                var resourceFormObject = JsonConvert.DeserializeObject<object>(serializedResult);
                var result = await backendDatabaseService.CreateItemAsync(resourceFormObject, dbSettings.ResourceCollectionId);
                resources.Add(result);
            }

            return resources;
        }

    }
}
