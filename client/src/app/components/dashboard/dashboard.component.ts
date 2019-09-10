import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from "axios";
import { Router } from '@angular/router'

import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/Issue';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  issues: Issue[];
  test: "ardi";
  title: string;

  constructor(
    // private issueService: IssueService, private router: Router
  ) { }
  url = 'http://localhost:3000/';

  ngOnInit() {
    console.log('pse')
    this.getIssues();
  }
  getIssues() {
    // this.issueServicke.getIssues().subscribe((issues) => {
    // console.log(issues.data)
    // })

    axios.get(this.url + 'issue')
      .then(res => {
        console.log(res.data);
        this.issues = res.data;
        console.log(this.issues[0])
        // console.log(res.data[0].created_at);
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateIssue(id) {
    console.log(id + "driloni")


    let obj = {
      resolved: true
    };
    axios.put(this.url + 'issue/' + id, obj).then(res => {
      console.log(res.data);
      this.getIssues();

      // console.log(res.data[0].created_at);
    })
      .catch(err => {
        console.log(err);
      });
  }
  createIssue() {
    let obj = {
      title: this.title
    };

    axios.post(this.url + 'issue', obj).then(res => {
      console.log(res.data);
      this.getIssues();
      this.title = "";
      // console.log(res.data[0].created_at);
    })
      .catch(err => {
        console.log(err);
      });
  }

  deleteIssue(id) {
    axios.delete(this.url + 'issue/' + id).then(res => {
      console.log(res.data);
      this.getIssues();
      // console.log(res.data[0].created_at);
    })
      .catch(err => {
        console.log(err);
      });
  }

}




