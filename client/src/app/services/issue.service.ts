import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getIssues() {
    console.log('a je tuj hi???')
    console.log("get method", this.http.get(`${this.uri}/issue`));
    return this.http.get(`${this.uri}/issue`);

  }
  // getIssueById(id){
  //   return this.http.get(`${this.uri}/issues/${id}`);
  // }
}
