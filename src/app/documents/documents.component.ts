import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { DocumentService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  currentUser: User;
  documents = [];
  columnsToDisplay = ['documentNumber', 'type', 'status'];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService) { }

  title: string = 'Vault Documents';

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser) {
      this.documentService.getDocuments(this.currentUser.sessionId)
        .subscribe(getDocumentsResponse => {
          this.documents = getDocumentsResponse.documents;
        });
    }
  }

  onAddDocument() { }

}
