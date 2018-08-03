import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionPlansComponent } from './action-plans.component';
import { PersonalizedPlanService } from '../../../../guided-assistant/personalized-plan/personalized-plan.service';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap';
import { PlanSteps, UpdatePlan, Steps, PlanTag, StepTag, UserUpdatePlan } from '../../../../guided-assistant/personalized-plan/personalized-plan';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';
import { TemplateRef } from '@angular/core';
import { ArrayUtilityService } from '../../../../shared/array-utility.service';

const mockMarkCompletedUpdatedPlan = {
  getMarkCompletedUpdatedPlan: () => { return Observable.of(); }
};

describe('ActionPlansComponent', () => {
  let component: ActionPlansComponent;
  let fixture: ComponentFixture<ActionPlansComponent>;
  let modalService: BsModalService;
  let sharedService: ArrayUtilityService;
  //let template: TemplateRef<any>;
  let mockPlanDetails = {};
  let mockplanSteps: Array<PlanSteps>;
  let mockplanStep: PlanSteps = { topicId: '', topicName: '', stepTags: [] };
  let mockdisplaySteps: boolean = false
  let mockupdatePlan: UpdatePlan = { id: '', oId: '', planTags: this.planTags };
  let personalizedPlanService: PersonalizedPlanService;
  let mockPlanDetailsJson = {
    "id": "bf8d7e7e-2574-7b39-efc7-83cb94adae07",
    "oId": "User Id",
    "type": "plans",
    "planTags": [
      {
        "topicId": "addf41e9-1a27-4aeb-bcbb-7959f95094ba",
        "stepTags": [
          {
            "id": {
              "id": "6b230be1-302b-7090-6cb3-fc6aa084274c",
              "type": "steps",
              "title": "Make sure your summons is real.",
              "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
              "resourceTags": [
                {
                  "id": {
                    "id": "9fc75d90-7ffa-4c26-9cb7-ba271f2007ad",
                    "name": "Lorem ipsum dolor sit amet",
                    "description": "Subhead lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem",
                    "resourceType": "Videos",
                    "externalUrl": "",
                    "url": "https://channel9.msdn.com/Shows/Azure-Friday/Managing-costs-with-the-Azure-Budgets-API-and-Action-Groups/player",
                    "topicTags": [
                      {
                        "id": "f102bfae-362d-4659-aaef-956c391f79de"
                      },
                      {
                        "id": "afabf032-72a8-4b04-81cb-c101bb1a0730"
                      },
                      {
                        "id": "3aa3a1be-8291-42b1-85c2-252f756febbc"
                      },
                      {
                        "id": "addf41e9-1a27-4aeb-bcbb-7959f95094ba"
                      },
                      {
                        "id": "bd900039-2236-8c2c-8702-d31855c56b0f"
                      }
                    ],
                    "location": [
                      {
                        "state": "Hawaii",
                        "city": "Kalawao",
                        "zipCode": "96742"
                      },
                      {
                        "zipCode": "96741"
                      },
                      {
                        "state": "Hawaii",
                        "city": "Honolulu"
                      },
                      {
                        "state": "Alaska"
                      },
                      {
                        "state": "New York",
                        "city": "New York"
                      }
                    ],
                    "icon": "./assets/images/resources/resource.png",
                    "overview": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "isRecommended": "",
                    "createdBy": "",
                    "createdTimeStamp": "",
                    "modifiedBy": "",
                    "modifiedTimeStamp": "2018-05-01T04:18:00Z",
                    "_rid": "mwoSAJdNlwIFAAAAAAAAAA==",
                    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIFAAAAAAAAAA==/",
                    "_etag": "\"0e009cd2-0000-0000-0000-5b3603830000\"",
                    "_attachments": "attachments/",
                    "_ts": 1530266499
                  }
                },
                {
                  "id": {
                    "id": "19a02209-ca38-4b74-bd67-6ea941d41518",
                    "name": "Organization Name 1",
                    "type": "Housing Law Services",
                    "description": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "resourceType": "Organizations",
                    "externalUrl": "",
                    "url": "websiteurl.com",
                    "topicTags": [
                      {
                        "id": "afabf032-72a8-4b04-81cb-c101bb1a0730"
                      },
                      {
                        "id": "3aa3a1be-8291-42b1-85c2-252f756febbc"
                      }
                    ],
                    "location": [
                      {
                        "zipCode": "96741"
                      },
                      {
                        "state": "Hawaii",
                        "city": "Haiku-Pauwela"
                      },
                      {
                        "state": "Alaska"
                      }
                    ],
                    "icon": "./assets/images/resources/resource.png",
                    "address": "Honolulu, Hawaii 96813, United States",
                    "telephone": "000-000-0000",
                    "overview": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "eligibilityInformation": "Copy describing eligibility qualification lorem ipsum dolor sit amet. ",
                    "reviewedByCommunityMember": "Quote from community member consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "reviewerFullName": "",
                    "reviewerTitle": "",
                    "reviewerImage": "",
                    "createdBy": "",
                    "createdTimeStamp": "",
                    "modifiedBy": "",
                    "modifiedTimeStamp": "2018-04-01T04:18:00Z",
                    "_rid": "mwoSAJdNlwIGAAAAAAAAAA==",
                    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIGAAAAAAAAAA==/",
                    "_etag": "\"14002777-0000-0000-0000-5b3b215b0000\"",
                    "_attachments": "attachments/",
                    "_ts": 1530601819
                  }
                }
              ],
              "_rid": "mwoSAJdNlwIyAAAAAAAAAA==",
              "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIyAAAAAAAAAA==/",
              "_etag": "\"cd00ed8e-0000-0000-0000-5b2cf6550000\"",
              "_attachments": "attachments/",
              "_ts": 1529673301
            },
            "order": 1,
            "markCompleted": false
          },
          {
            "id": {
              "id": "d46aecee-8c79-df1b-4081-1ea02b5022df",
              "type": "steps",
              "title": "Try to resolve the issue with your landlord to see if you can come to an agreement",
              "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
              "resourceTags": [],
              "_rid": "mwoSAJdNlwIzAAAAAAAAAA==",
              "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIzAAAAAAAAAA==/",
              "_etag": "\"cd00e08e-0000-0000-0000-5b2cf6500000\"",
              "_attachments": "attachments/",
              "_ts": 1529673296
            },
            "order": 2,
            "markCompleted": false
          }
        ],
        "id": [
          {
            "id": "addf41e9-1a27-4aeb-bcbb-7959f95094ba",
            "name": "Family",
            "parentTopicID": "",
            "resourceType": "Topics",
            "keywords": "EVICTION",
            "location": [
              {
                "state": "Hawaii",
                "county": "Kalawao County",
                "city": "Kalawao",
                "zipCode": "96742"
              },
              {
                "zipCode": "96741"
              }
            ],
            "jsonContent": "",
            "icon": "./assets/images/topics/topic14.png",
            "createdBy": "",
            "createdTimeStamp": "",
            "modifiedBy": "",
            "modifiedTimeStamp": "",
            "_rid": "mwoSALHtpAEBAAAAAAAAAA==",
            "_self": "dbs/mwoSAA==/colls/mwoSALHtpAE=/docs/mwoSALHtpAEBAAAAAAAAAA==/",
            "_etag": "\"2700f297-0000-0000-0000-5b3366320000\"",
            "_attachments": "attachments/",
            "_ts": 1530095154
          }
        ]
      },
      {
        "topicId": "932abb0a-c6bb-46da-a3d8-5f52c2c914a0",
        "stepTags": [
          {
            "id": {
              "id": "2705d544-6af7-bd69-4f19-a1b53e346da2",
              "type": "steps",
              "title": "Take to your partner to see if you can come to an agreement",
              "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
              "resourceTags": [
                {
                  "id": {
                    "id": "9fc75d90-7ffa-4c26-9cb7-ba271f2007ad",
                    "name": "Lorem ipsum dolor sit amet",
                    "description": "Subhead lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem",
                    "resourceType": "Videos",
                    "externalUrl": "",
                    "url": "https://channel9.msdn.com/Shows/Azure-Friday/Managing-costs-with-the-Azure-Budgets-API-and-Action-Groups/player",
                    "topicTags": [
                      {
                        "id": "f102bfae-362d-4659-aaef-956c391f79de"
                      },
                      {
                        "id": "afabf032-72a8-4b04-81cb-c101bb1a0730"
                      },
                      {
                        "id": "3aa3a1be-8291-42b1-85c2-252f756febbc"
                      },
                      {
                        "id": "addf41e9-1a27-4aeb-bcbb-7959f95094ba"
                      },
                      {
                        "id": "bd900039-2236-8c2c-8702-d31855c56b0f"
                      }
                    ],
                    "location": [
                      {
                        "state": "Hawaii",
                        "city": "Kalawao",
                        "zipCode": "96742"
                      },
                      {
                        "zipCode": "96741"
                      }
                    ],
                    "icon": "./assets/images/resources/resource.png",
                    "overview": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "isRecommended": "",
                    "createdBy": "",
                    "createdTimeStamp": "",
                    "modifiedBy": "",
                    "modifiedTimeStamp": "2018-05-01T04:18:00Z",
                    "_rid": "mwoSAJdNlwIFAAAAAAAAAA==",
                    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIFAAAAAAAAAA==/",
                    "_etag": "\"0e009cd2-0000-0000-0000-5b3603830000\"",
                    "_attachments": "attachments/",
                    "_ts": 1530266499
                  }
                },
                {
                  "id": {
                    "id": "19a02209-ca38-4b74-bd67-6ea941d41518",
                    "name": "Organization Name 1",
                    "type": "Housing Law Services",
                    "description": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "resourceType": "Organizations",
                    "externalUrl": "",
                    "url": "websiteurl.com",
                    "topicTags": [
                      {
                        "id": "afabf032-72a8-4b04-81cb-c101bb1a0730"
                      },
                      {
                        "id": "3aa3a1be-8291-42b1-85c2-252f756febbc"
                      }
                    ],
                    "location": [
                      {
                        "zipCode": "96741"
                      },
                      {
                        "state": "Hawaii",
                        "city": "Haiku-Pauwela"
                      },
                      {
                        "state": "Alaska"
                      }
                    ],
                    "icon": "./assets/images/resources/resource.png",
                    "address": "Honolulu, Hawaii 96813, United States",
                    "telephone": "000-000-0000",
                    "overview": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "eligibilityInformation": "Copy describing eligibility qualification lorem ipsum dolor sit amet. ",
                    "reviewedByCommunityMember": "Quote from community member consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "reviewerFullName": "",
                    "reviewerTitle": "",
                    "reviewerImage": "",
                    "createdBy": "",
                    "createdTimeStamp": "",
                    "modifiedBy": "",
                    "modifiedTimeStamp": "2018-04-01T04:18:00Z",
                    "_rid": "mwoSAJdNlwIGAAAAAAAAAA==",
                    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIGAAAAAAAAAA==/",
                    "_etag": "\"14002777-0000-0000-0000-5b3b215b0000\"",
                    "_attachments": "attachments/",
                    "_ts": 1530601819
                  }
                }
              ],
              "_rid": "mwoSAJdNlwI0AAAAAAAAAA==",
              "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwI0AAAAAAAAAA==/",
              "_etag": "\"cd00d98e-0000-0000-0000-5b2cf64b0000\"",
              "_attachments": "attachments/",
              "_ts": 1529673291
            },
            "order": 1,
            "markCompleted": false
          },
          {
            "id": {
              "id": "3d64b676-cc4b-397d-a5bb-f4a0ea6d3040",
              "type": "steps",
              "title": "Submit a complaint for custody form",
              "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
              "resourceTags": [
                {
                  "id": {
                    "id": "19a02209-ca38-4b74-bd67-6ea941d41518",
                    "name": "Organization Name 1",
                    "type": "Housing Law Services",
                    "description": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "resourceType": "Organizations",
                    "externalUrl": "",
                    "url": "websiteurl.com",
                    "topicTags": [
                      {
                        "id": "afabf032-72a8-4b04-81cb-c101bb1a0730"
                      },
                      {
                        "id": "3aa3a1be-8291-42b1-85c2-252f756febbc"
                      }
                    ],
                    "location": [
                      {
                        "zipCode": "96741"
                      },
                      {
                        "state": "Hawaii",
                        "city": "Haiku-Pauwela"
                      },
                      {
                        "state": "Alaska"
                      }
                    ],
                    "icon": "./assets/images/resources/resource.png",
                    "address": "Honolulu, Hawaii 96813, United States",
                    "telephone": "000-000-0000",
                    "overview": "Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter. Lorem ipsum solor sit amet bibodem consecuter orem ipsum solor sit amet bibodem consecuter lorem ipsum solor sit amet bibodem consecuter.",
                    "eligibilityInformation": "Copy describing eligibility qualification lorem ipsum dolor sit amet. ",
                    "reviewedByCommunityMember": "Quote from community member consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "reviewerFullName": "",
                    "reviewerTitle": "",
                    "reviewerImage": "",
                    "createdBy": "",
                    "createdTimeStamp": "",
                    "modifiedBy": "",
                    "modifiedTimeStamp": "2018-04-01T04:18:00Z",
                    "_rid": "mwoSAJdNlwIGAAAAAAAAAA==",
                    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIGAAAAAAAAAA==/",
                    "_etag": "\"14002777-0000-0000-0000-5b3b215b0000\"",
                    "_attachments": "attachments/",
                    "_ts": 1530601819
                  }
                }
              ],
              "_rid": "mwoSAJdNlwI2AAAAAAAAAA==",
              "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwI2AAAAAAAAAA==/",
              "_etag": "\"0000dd93-0000-0000-0000-5b31ec230000\"",
              "_attachments": "attachments/",
              "_ts": 1529998371
            },
            "order": 2,
            "markCompleted": false
          }
        ],
        "id": [
          {
            "id": "932abb0a-c6bb-46da-a3d8-5f52c2c914a0",
            "name": "DivorceWithChildren",
            "parentTopicID": "f102bfae-362d-4659-aaef-956c391f79de",
            "resourceType": "Topics",
            "keywords": "CHILD ABUSE|CHILD CUSTODY",
            "location": [
              {
                "state": "Hawaii",
                "city": "Kalawao",
                "zipCode": "96742"
              },
              {
                "zipCode": "96741"
              },
              {
                "state": "Hawaii",
                "city": "Honolulu"
              },
              {
                "state": "Hawaii",
                "city": "Hawaiian Beaches"
              },
              {
                "state": "Hawaii",
                "city": "Haiku-Pauwela"
              },
              {
                "state": "Alaska"
              }
            ],
            "jsonContent": "",
            "icon": "./assets/images/topics/topic14.png",
            "createdBy": "",
            "createdTimeStamp": "",
            "modifiedBy": "",
            "modifiedTimeStamp": "",
            "_rid": "mwoSALHtpAELAAAAAAAAAA==",
            "_self": "dbs/mwoSAA==/colls/mwoSALHtpAE=/docs/mwoSALHtpAELAAAAAAAAAA==/",
            "_etag": "\"27006799-0000-0000-0000-5b3366420000\"",
            "_attachments": "attachments/",
            "_ts": 1530095170
          }
        ]
      }
    ],
    "_rid": "mwoSAJdNlwIxAAAAAAAAAA==",
    "_self": "dbs/mwoSAA==/colls/mwoSAJdNlwI=/docs/mwoSAJdNlwIxAAAAAAAAAA==/",
    "_etag": "\"09009fe4-0000-0000-0000-5b4450b00000\"",
    "_attachments": "attachments/",
    "_ts": 1531203760
  };

  let mockPlanDetailsArray = [mockPlanDetailsJson];

  let mockPlanSteps = [{
    "stepTags": [
      {
        "id": {
          "id": "6b230be1-302b-7090-6cb3-fc6aa084274c",
          "type": "steps",
          "title": "Make sure your summons is real.",
          "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
        },
        "order": 1,
        "markCompleted": false
      },
      {
        "id": {
          "id": "d46aecee-8c79-df1b-4081-1ea02b5022df",
          "type": "steps",
          "title": "Try to resolve the issue with your landlord to see if you can come to an agreement",
          "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
        },
        "order": 2,
        "markCompleted": false
      }
    ],
    "topicId": "addf41e9-1a27-4aeb-bcbb-7959f95094ba",
    "topicName": "Family"
  },
  {
    "stepTags": [
      {
        "id": {
          "id": "2705d544-6af7-bd69-4f19-a1b53e346da2",
          "type": "steps",
          "title": "Take to your partner to see if you can come to an agreement",
          "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
        },
        "order": 1,
        "markCompleted": false
      },
      {
        "id": {
          "id": "3d64b676-cc4b-397d-a5bb-f4a0ea6d3040",
          "type": "steps",
          "title": "Submit a complaint for custody form",
          "description": "Why you should do this dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
        },
        "order": 2,
        "markCompleted": false
      }
    ],
    "topicId": "932abb0a-c6bb-46da-a3d8-5f52c2c914a0",
    "topicName": "DivorceWithChildren"
  }];

  //let mockPlanTags = "testPlanTags"
  let mockTemplate = "testTemplate";
  let mockIsChecked = true;
  let mockPlanTags: Array<PlanTag>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, ModalModule.forRoot()
      ],
      declarations: [ActionPlansComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [PersonalizedPlanService, BsModalService, ArrayUtilityService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.get(BsModalService);
    personalizedPlanService = fixture.debugElement.injector.get(PersonalizedPlanService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should define component", () => {
    expect(component).toBeDefined();
  });

  it("should call getPersonalizedPlan on ngChanges", () => {
    spyOn(component, 'getPersonalizedPlan');
    component.ngOnChanges();
    component.getPersonalizedPlan(mockPlanDetails);
    expect(component.getPersonalizedPlan).toHaveBeenCalled();
  });

  it("should assign values for planSteps and displaySteps if planDetails list is empty in getPersonalizedPlan method", () => {
    spyOn(component, 'getPersonalizedPlan');
    component.getPersonalizedPlan(mockPlanDetails);
    expect(component.planStep).toEqual(mockplanStep);
    expect(component.displaySteps).toEqual(mockdisplaySteps);
  });

  it("should assign the array json value to the input plan Details in getPersonalizedPlan method", () => {
    spyOn(component, 'getPersonalizedPlan');
    component.planDetails = mockPlanDetailsArray;
    component.getPersonalizedPlan(component.planDetails);
    expect(component.getPersonalizedPlan).toHaveBeenCalled();
  });

  it("should assign values for planSteps and displaySteps in getPersonalizedPlan method", () => {
    spyOn(component, 'getPersonalizedPlan');
    component.getPersonalizedPlan(mockPlanDetailsJson);
    expect(component.planSteps).not.toBeNull();
    expect(component.displaySteps).not.toBe(true);
  });

  it("should call orderBy method in getPersonalizedPlan", () => {
    spyOn(component, 'orderBy')
    component.getPersonalizedPlan(mockPlanDetailsJson);
    expect(component.orderBy).toHaveBeenCalled();
  });

  it("should call update user plan", () => {
    spyOn(component, 'updatedUserPlan');
    component.updatedUserPlan(mockIsChecked, mockPlanTags, mockTemplate);
    expect(component.updatedUserPlan).toHaveBeenCalled();
  });

  it("should assign values for updatedUserPlan method if updatePlan is empty", () => {
    spyOn(component, 'updatedUserPlan');
    component.updatedUserPlan(mockIsChecked, mockPlanTags, mockTemplate);
    //details of for updatePlan should not be empty
    expect(component.updatePlan).toEqual(mockupdatePlan);
    //isCompleted status is false if details of updatePlan is empty
    expect(component.isCompleted).toBeFalsy(true);
  });

  it('should make a call to service getMarkCompletedUpdatedPlan from updatedUserPlan', () => {
    spyOn(component, 'updatedUserPlan');
    spyOn(personalizedPlanService, "getMarkCompletedUpdatedPlan");
    component.updatedUserPlan(mockIsChecked, mockPlanTags, mockTemplate);
    expect(personalizedPlanService.getMarkCompletedUpdatedPlan).toHaveBeenCalled;
  });

  it('should make a call to service getMarkCompletedUpdatedPlan from userPlan', () => {
    spyOn(component, 'updatedUserPlan');
    spyOn(personalizedPlanService, 'userPlan');
    spyOn(personalizedPlanService, "getMarkCompletedUpdatedPlan");
    component.updatedUserPlan(mockIsChecked, mockPlanTags, mockTemplate);
    expect(personalizedPlanService.getMarkCompletedUpdatedPlan).toHaveBeenCalled;
  });

  it('should call checkCompleted', () => {
    spyOn(component, 'checkCompleted');
    expect(component.checkCompleted).toHaveBeenCalled;
  });

});