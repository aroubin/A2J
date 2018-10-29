import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LatitudeLongitude } from './map-results';
declare var Microsoft: any;

@Injectable()
export class MapResultsService {
  latitudeLongitude: Array<LatitudeLongitude> = [];
  constructor(private http: HttpClient) {
  }

  getLocationDetails(address, credentials): any {
    //Since we are seeing this ↵ character in address field in console and couldn't find the same on 
    // mouse over. that's the reason we are replacing %0A(new line) with %20(space). BugId #464.
    let cleanAddress = encodeURI(address).replace('%0A', '%20');
    let searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + cleanAddress + '?output=json&key=' + credentials;
    return this.http.get(searchRequest);
  }

  getAddressBasedOnPoints(latitude, longitude, credentials): any {
    let searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + encodeURI(latitude) + ',' + encodeURI(longitude) + '?key=' + credentials;
    return this.http.get(searchRequest);
  }

  getStateFullName(countryRegion, state, credentials): any {
    let searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations?CountryRegion=' + encodeURI(countryRegion) + '&adminDistrict=' + encodeURI(state) + '&key=' + credentials;
    return this.http.get(searchRequest);
  }

  getMap() {
    let map = new Microsoft.Maps.Map('#my-map-results',
      {
        credentials: environment.bingmap_key
      });
  }

  mapResults(locationCoordinates) {
    this.latitudeLongitude = locationCoordinates;
    let map = new Microsoft.Maps.Map('#my-map-results',
      {
        credentials: environment.bingmap_key
      });
    for (let i = 0, len = this.latitudeLongitude.length; i < len; i++) {
      var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(this.latitudeLongitude[i].latitude, this.latitudeLongitude[i].longitude), {
        icon: '../../assets/images/location/poi_custom.png'
      });
      map.entities.push(pin);
      let bestview = Microsoft.Maps.LocationRect.fromLocations(this.latitudeLongitude);
      map.setView({ bounds: bestview, zoom: 5 });
    }

  }
}
