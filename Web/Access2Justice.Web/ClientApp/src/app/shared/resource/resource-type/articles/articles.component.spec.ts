import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { UserActionSidebarComponent } from '../../../sidebars/user-action-sidebar/user-action-sidebar.component';
import { GuidedAssistantSidebarComponent } from '../../../sidebars/guided-assistant-sidebar/guided-assistant-sidebar.component';
import { ServiceOrgSidebarComponent } from '../../../sidebars/service-org-sidebar/service-org-sidebar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ShowMoreService } from '../../../sidebars/show-more/show-more.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigateDataService } from '../../../navigate-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../../../global';
import { PaginationService } from '../../../pagination/pagination.service';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let mockRouter;
  let mockGlobal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ 
        ArticlesComponent,
        UserActionSidebarComponent,
        GuidedAssistantSidebarComponent,
        ServiceOrgSidebarComponent
      ],
      providers: [ 
        ShowMoreService,
        NavigateDataService,
        { provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '123'}}}
          }, 
        { provide: Router, useValue: mockRouter },
        { provide: Global, useValue: mockGlobal },
        PaginationService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
