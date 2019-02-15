import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:3100'

@Injectable({ providedIn: 'root' })
export class MetadataService {

  constructor(private http: HttpClient) { }

  getDocumentTypes(sessionId: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    return this.http.get<any>(`${API_URL}/metadata/objects/documents/types`, options);
  }

  getDocumentType(sessionId: string, documentType: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    let documentTypeValue = documentType.substring(documentType.indexOf('metadata/objects/documents/types/') + 33);

    return this.http.get<any>(`${API_URL}/metadata/objects/documents/types/${documentTypeValue}`, options);
  }

  getDocumentSubtype(sessionId: string, documentSubtype: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    let documentSubtypeValue = documentSubtype.substring(documentSubtype.indexOf('metadata/objects/documents/types/') + 33);

    return this.http.get<any>(`${API_URL}/metadata/objects/documents/types/${documentSubtypeValue}`, options);
  }

  getDocumentClassification(sessionId: string, documentClassification: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };

    let documentClassificationValue = documentClassification.substring(documentClassification.indexOf('metadata/objects/documents/types/') + 33);

    return this.http.get<any>(`${API_URL}/metadata/objects/documents/types/${documentClassificationValue}`, options);
  }

  getObjectRecords(sessionId: string, objectName: string) {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      }),
      params: {
        sessionId: sessionId
      }
    };


    return this.http.get<any>(`${API_URL}/metadata/vobjects/${objectName}`, options);
  }

}
