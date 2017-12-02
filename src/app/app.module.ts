import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

import { CoreModule }from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component'}
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CoursesListComponent,
    UserProfileComponent,
    CampaignsComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    NgbModule.forRoot(),
    routes
  ],
  providers: [/*AuthService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
