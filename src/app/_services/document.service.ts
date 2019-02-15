import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3100'

@Injectable({ providedIn: 'root' })
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocuments(sessionId: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    return this.http.get<any>(`${API_URL}/objects/documents`, options);
  }

  postDocument(sessionId: string, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    return this.http.post<any>(`${API_URL}/objects/documents`, data, options);
  }
}
