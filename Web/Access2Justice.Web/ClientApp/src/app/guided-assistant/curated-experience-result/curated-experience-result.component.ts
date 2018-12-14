import { Component, OnInit, Input } from '@angular/core';
import { NavigateDataService } from '../../shared/navigate-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapService } from '../../shared/map/map.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-curated-experience-result',
  templateUrl: './curated-experience-result.component.html',
  styleUrls: ['./curated-experience-result.component.css']
})
export class CuratedExperienceResultComponent implements OnInit {
  guidedAssistantResults;
  relevantIntents: Array<string>;
  subscription: any;
  locationSubscription: any;

  constructor(
    private navigateDataService: NavigateDataService,
    private toastr: ToastrService,
    private router: Router,
    private mapService: MapService,
    private location: Location) { }

  saveForLater() {
    this.toastr.success("Topics added. You can view them later once you've completed the guided assistant.");
  }

  filterIntent() {
    if (this.guidedAssistantResults.relevantIntents) {
      this.relevantIntents = this.guidedAssistantResults.relevantIntents
        .filter(resource => resource !== 'None');
    }
  }
  backToSearch() {
    sessionStorage.removeItem("searchTextResults");
    this.router.navigateByUrl('/guidedassistant');
  }

  ngOnInit() {
    this.locationSubscription = this.location.subscribe(x => {
      if (x.type === "popstate") {
        this.backToSearch();
      }
    });
    this.subscription = this.mapService.notifyLocation
      .subscribe((value) => {
        sessionStorage.removeItem('searchTextResults');
        this.router.navigateByUrl('/guidedassistant');
      });

    this.guidedAssistantResults = this.navigateDataService.getData();
    this.filterIntent();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

}
