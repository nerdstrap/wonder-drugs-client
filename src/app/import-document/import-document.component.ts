import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { FileUploader } from "ng2-file-upload";
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';

import { DocumentService, MetadataService } from '../_services';
import { User } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-import-document',
  templateUrl: './import-document.component.html',
  styleUrls: ['./import-document.component.css']
})
export class ImportDocumentComponent implements OnInit {

  uploadForm: FormGroup;
  currentUser: User;

  vaultObjects = [];
  countryRecords = [];
  facilityRecords = [];
  departmentRecords = [];
  documentTypes = [];
  selectedDocumentType = '';
  documentSubtypes = [];
  selectedDocumentSubtype = '';
  documentProperties = [];
  documentLifecycles = [];
  selectedDocumentLifecycle = '';
  selectedCountry = '';
  selectedFacility = '';
  selectedDepartment = '';

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  title: string = 'Import Vault Document';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private documentService: DocumentService,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      country: [null, null],
      department: [null, null],
      facility: [null, null],
      type: [null, null],
      subtype: [null, null],
      lifecycle: [null, null],
      approvedDate: ['', Validators.required]
    });

    // prevent more than 1 file being added to the queue
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser) {
      this.metadataService.getObjectRecords(this.currentUser.sessionId, 'country__v')
        .subscribe(getObjectRecordsResponse => {
          this.countryRecords = getObjectRecordsResponse.data;
        });
      this.metadataService.getObjectRecords(this.currentUser.sessionId, 'facility__v')
        .subscribe(getObjectRecordsResponse => {
          this.facilityRecords = getObjectRecordsResponse.data;
        });
      this.metadataService.getObjectRecords(this.currentUser.sessionId, 'department__v')
        .subscribe(getObjectRecordsResponse => {
          this.departmentRecords = getObjectRecordsResponse.data;
        });

      this.metadataService.getDocumentTypes(this.currentUser.sessionId)
        .subscribe(getDocumentTypeResponse => {
          this.documentTypes = getDocumentTypeResponse.types;
        });
    }
  }

  onTypeSelectionChange() {
    if (this.currentUser) {
      this.metadataService.getDocumentType(this.currentUser.sessionId, this.selectedDocumentType)
        .subscribe(getDocumentTypeResponse => {
          this.documentSubtypes = getDocumentTypeResponse.subtypes;
        });
    }
  }

  onSubtypeSelectionChange() {
    if (this.currentUser) {
      this.metadataService.getDocumentSubtype(this.currentUser.sessionId, this.selectedDocumentSubtype)
        .subscribe(getDocumentSubtypeResponse => {
          this.documentProperties = getDocumentSubtypeResponse.properties;
          this.documentLifecycles = getDocumentSubtypeResponse.availableLifecycles;
        });
    }
  }

  onSubmit() {
    // file queue length should only be 1
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }

    for (var j = 0; j < this.uploader.queue.length; j++) {

      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;

      let type__v = this.documentTypes.find(x => x.value == this.selectedDocumentType).label;
      let subtype__v = this.documentSubtypes.find(x => x.value == this.selectedDocumentSubtype).label;
      let lifecycle__v = this.documentLifecycles.find(x => x.name == this.selectedDocumentLifecycle).label;
      data.append('sessionId', this.currentUser.sessionId);
      data.append('file', fileItem);
      data.append('name__v', fileItem.name);
      data.append('type__v', type__v);
      data.append('subtype__v', subtype__v);
      data.append('lifecycle__v', lifecycle__v);
      data.append('external_id__c', UUID.UUID());
      let approvedDateValue = moment(this.uploadForm.controls.approvedDate.value).format('YYYY-MM-DD');
      data.append('approved_date__vs', approvedDateValue);
      data.append('country__v', this.selectedCountry);
      data.append('created_by__v', this.currentUser.userId.toString());
      let creationDateValue = moment().toISOString()
      data.append('document_creation_date__v', creationDateValue);
      data.append('owning_facility__v', this.selectedFacility);
      data.append('owning_department__v', this.selectedDepartment);
      data.append('external_import__c', 'true');
      data.append('external_id__v', UUID.UUID());

      this.documentService.postDocument(this.currentUser.sessionId, data)
        .subscribe(postDocumentResponse => {
          if (postDocumentResponse.responseStatus === "SUCCESS") {
            console.log(postDocumentResponse);
            this.snackBar.open('Document Uploaded', 'Dismiss', {
              duration: 3000
            });
            this.router.navigate(['/documents']);
          }
        });
    }
    this.uploader.clearQueue();
  }

}
