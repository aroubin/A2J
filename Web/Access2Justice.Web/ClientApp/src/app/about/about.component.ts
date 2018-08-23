import { Component, OnInit } from '@angular/core';
import { StaticResourceService } from '../shared/static-resource.service';
import { About, Mission, Service, PrivacyPromise } from '../about/about';
import { Image } from '../home/home';
import { Global } from '../global';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private staticResourceService: StaticResourceService,
    private global:Global) { }
  name: string = 'AboutPage';
  aboutContent: About;
  aboutContentData: About;
  staticContent: any;
  staticContentSubcription: any;

  filterAboutContent(aboutContent): void {
    if (aboutContent) {
      this.aboutContentData = aboutContent;
    }
  }

  getAboutPageContent(): void {
    let aboutPageRequest = { name: this.name };
    if (this.staticResourceService.aboutContent && (this.staticResourceService.aboutContent.location[0].state == this.staticResourceService.getLocation())) {
      this.aboutContent = this.staticResourceService.aboutContent;
      this.filterAboutContent(this.staticResourceService.aboutContent);
    } else {
      //this.staticResourceService.getStaticContent(aboutPageRequest)
      //  .subscribe(content => {
      //    this.aboutContent = content[0];
      //    this.filterAboutContent(this.aboutContent);
      //    this.staticResourceService.aboutContent = this.aboutContent;
      //  });
      if (this.global.getData()) {
        this.staticContent = this.global.getData();
        this.staticContent.forEach(content => {
          if (content.name === this.name) {
            this.aboutContent = content;
            this.filterAboutContent(this.aboutContent);
            this.staticResourceService.aboutContent = this.aboutContent;
          }
        });
      }
    }
  }

  ngOnInit() {
    this.getAboutPageContent();
    this.staticContentSubcription = this.global.notifyStaticData
      .subscribe((value) => {
        this.getAboutPageContent();
      });
  }
}
