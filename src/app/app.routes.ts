import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { OtherComponent } from './other/other.component';
import { AuthGuard } from './core/auth.guard';
//import { SignupComponent } from './signup/signup.component';
//import { EmailComponent } from './email/email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    //{ path: 'signup', component: SignupComponent },
    //{ path: 'login-email', component: EmailComponent },
    { path: 'courses', component: CoursesListComponent },
    //{ path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
