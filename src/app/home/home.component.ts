import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Vault } from '../_models';
import { AuthenticationService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    vaults: Vault[] = [];

    // constructor(private userService: UserService) {}
  constructor() {}

    ngOnInit() {
        // this.userService.getAll().pipe(first()).subscribe(users => { 
        //     this.users = users; 
        // });
    }
}