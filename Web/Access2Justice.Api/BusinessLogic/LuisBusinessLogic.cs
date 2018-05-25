﻿using Access2Justice.Shared;
using Access2Justice.Shared.Interfaces;
using Access2Justice.Shared.Luis;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Access2Justice.Api
{
    public class LuisBusinessLogic : ILuisBusinessLogic
    {
        private readonly ILuisProxy _luisProxy;
        private readonly ILuisSettings _luisSettings;
        private readonly ITopicsResourcesBusinessLogic _topicsResourcesBusinessLogic;
        private readonly IWebSearchBusinessLogic _webSearchBusinessLogic;

        public LuisBusinessLogic(ILuisProxy luisProxy, ILuisSettings luisSettings, ITopicsResourcesBusinessLogic topicsResourcesBusinessLogic, IWebSearchBusinessLogic webSearchBusinessLogic)
        {
            _luisSettings = luisSettings;
            _luisProxy = luisProxy;
            _topicsResourcesBusinessLogic = topicsResourcesBusinessLogic;
            _webSearchBusinessLogic = webSearchBusinessLogic;
        }

        public async Task<dynamic> GetResourceBasedOnThresholdAsync(string query)
        {
            var luisResponse = await _luisProxy.GetIntents(query);
            var intentWithScore = ParseLuisIntent(luisResponse);

            int threshold = ApplyThreshold(intentWithScore);

            switch (threshold)
            {
                case (int)LuisAccuracyThreshold.High:
                    return await GetInternalResourcesAsync(intentWithScore.TopScoringIntent);
                case (int)LuisAccuracyThreshold.Medium:
                    JObject luisObject = new JObject { { "luisResponse", luisResponse } };
                    return luisObject.ToString();
                default:
                    return await GetWebResourcesAsync(query);
            }
        }

        public IntentWithScore ParseLuisIntent(string LuisResponse)
        {
            LuisIntent luisIntent = JsonConvert.DeserializeObject<LuisIntent>(LuisResponse);
            NumberFormatInfo provider = new NumberFormatInfo { PositiveSign = "pos " };
            return new IntentWithScore
            {
                IsSuccessful = true,
                TopScoringIntent = luisIntent?.TopScoringIntent?.Intent,
                Score = luisIntent?.TopScoringIntent?.Score ?? 0,
                TopNIntents = luisIntent?.Intents.Skip(1).Take(Convert.ToInt16(_luisSettings.TopIntentsCount, provider)).Select(x => x.Intent).ToList()
            };
        }

        public int ApplyThreshold(IntentWithScore intentWithScore)
        {
            NumberFormatInfo provider = new NumberFormatInfo { NumberDecimalDigits = 2 };
            decimal upperThershold = Convert.ToDecimal(_luisSettings.UpperThreshold, provider);
            decimal lowerThershold = Convert.ToDecimal(_luisSettings.LowerThreshold, provider);

            if (intentWithScore.Score >= upperThershold)
            {
                return (int)LuisAccuracyThreshold.High;
            }
            else if (intentWithScore.Score <= lowerThershold)
            {
                return (int)LuisAccuracyThreshold.Low;
            }
            else
            {
                return (int)LuisAccuracyThreshold.Medium;
            }
        }

        public async Task<dynamic> GetInternalResourcesAsync(string keywords)
        {
            string topic = string.Empty, resource = string.Empty;
            var topics = await _topicsResourcesBusinessLogic.GetTopicAsync(keywords);

            string topicIds = string.Empty;
            foreach (var item in topics)
            {
                topicIds += "  ARRAY_CONTAINS(c.topicTags, { 'id' : '" + item.id + "'}) OR";
            }

            dynamic serializedTopics = null;
            dynamic serializedResources = null;
            if (!string.IsNullOrEmpty(topicIds))
            {
                topicIds = topicIds.Remove(topicIds.Length - 2);
                var resources = await _topicsResourcesBusinessLogic.GetResourcesAsync(topicIds);

                serializedTopics = JsonConvert.SerializeObject(topics);
                serializedResources = JsonConvert.SerializeObject(resources);
            }

            JObject internalResources = new JObject {
                { "topics", JsonConvert.DeserializeObject(serializedTopics) },
                { "resources", JsonConvert.DeserializeObject(serializedResources) }
            };

            return internalResources.ToString();
        }

        public async Task<dynamic> GetWebResourcesAsync(string query)
        {
            var response = await _webSearchBusinessLogic.SearchWebResourcesAsync(query);

            JObject webResources = new JObject
            {
                { "webResources" , JsonConvert.DeserializeObject(response) }
            };
            return webResources.ToString();
        }
    }
}
