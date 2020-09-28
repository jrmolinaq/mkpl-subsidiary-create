import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SubsidiaryRequestParams, SubsidiaryListResponse, SubsidiaryDetail, Subsidiary } from '../interfaces/subsidiaries.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {

  constructor(private http: HttpClient) { }

  getSubsidiaries(providerId: any, order = 'id', orderBy = 'ascending'): Observable<SubsidiaryListResponse> {
    const params = new HttpParams().set('limit', '10').set('page', '0').set('order', order)
    .set('order_by', orderBy).set('provider_id', providerId.toString());

    return this.http.get<SubsidiaryListResponse>(`/o/ProviderCompraDigitalPortlet/api/subsidiary/list`, { params });
  }

  toggleSubsidiaries(id: any) {
    return this.http.put(`/o/ProviderCompraDigitalPortlet/api/subsidiary/active/${id}`, {});
  }
/*
  getSubsidiary(id: string): Observable<SubsidiaryDetail> {
    return this.http.get<SubsidiaryDetail>(`http://localhost:8081/api/subsidiary/${id}`);
  }

  updateSubsidiary(subsidiary: any, cityId: string, providerId: string) {
    const params = new HttpParams().set('city_id', cityId).set('provider_id', providerId);
    return this.http.put(`http://localhost:8081/api/subsidiary`, subsidiary, { params });
  }
*/
  createSubsidiary(subsidiary: any, cityId: string, providerId: string) {
    const params = new HttpParams().set('city_id', cityId).set('provider_id', providerId);
    return this.http.post(`/o/ProviderCompraDigitalPortlet/api/subsidiary/stored`, subsidiary, { params });
  }
}
