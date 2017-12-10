import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FormsModule } from '@angular/forms';
import { CoreModule }from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component'}
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignService } from './campaign/campaign.service';
import { CampaignComponent , KeysPipe } from './campaign/campaign.component';
import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CoursesListComponent,
    UserProfileComponent,
    CampaignListComponent,
    LoginComponent,
    CampaignComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    NgbModule.forRoot(),
    DndModule.forRoot(),

    routes
  ],
  providers: [CampaignService],
  bootstrap: [AppComponent],

})
export class AppModule { }
