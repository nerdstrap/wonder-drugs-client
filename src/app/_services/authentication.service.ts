import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3100'
// const API_URL = 'https://vv-consulting-candidate-rd-exercise22.veevavault.com/api/v19.1';
const MY_USERNAME = 'rd_candidate22@vv-consulting.com';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*'
            })};
          
            const data = {
                username: username,
                password: password
            };
        
        return this.http.post<any>(`${API_URL}/auth`, data, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.sessionId) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}