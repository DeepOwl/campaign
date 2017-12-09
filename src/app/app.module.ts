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
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignService } from './campaign/campaign.service';
import { CampaignComponent } from './campaign/campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CoursesListComponent,
    UserProfileComponent,
    CampaignListComponent,
    LoginComponent,
    CampaignComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    NgbModule.forRoot(),
    routes
  ],
  providers: [CampaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
