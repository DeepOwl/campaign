import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { OtherComponent } from './other/other.component';
import { AuthGuard } from './core/auth.guard';
//import { SignupComponent } from './signup/signup.component';
//import { EmailComponent } from './email/email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    //{ path: 'signup', component: SignupComponent },
    //{ path: 'login-email', component: EmailComponent },

    //{ path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'campaign-list', component: CampaignListComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
