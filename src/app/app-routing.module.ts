import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';

import { LoginComponent } from './login/login.component';
import { DocumentsComponent } from './documents/documents.component';
import { ImportDocumentComponent } from './import-document/import-document.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: 'import-document', component: ImportDocumentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
