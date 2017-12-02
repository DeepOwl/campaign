import { NgModule } from '@angular/core';

//import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, AuthGuard]
})
export class CoreModule { }
