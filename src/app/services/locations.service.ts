import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any[]>(`/o/LocationCompraDigitalPortlet/api/city/country`);
  }

  getRegions(countryId: number): Observable<any> {
    return this.http.get(`/o/LocationCompraDigitalPortlet/api/city/region/country/${countryId}`);
  }

  getCities(regionId: number): Observable<any> {
    return this.http.get(`/o/LocationCompraDigitalPortlet/api/city/region/${regionId}`);
  } 
}
