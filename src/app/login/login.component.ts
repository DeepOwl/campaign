import { Component, OnInit } from '@angular/core';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthMethods } from 'angularfire2';
import { AuthService } from './../core/auth.service'
import { Router } from '@angular/router';
//import { moveIn } from '../router.animations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: any;
      constructor(public auth: AuthService, private router: Router) { }

        /*
          /// Social Login
          signInWithGithub() {
            this.auth.githubLogin()
            .then(() => this.afterSignIn());
          }
        */
          signInWithGoogle() {
            this.auth.googleLogin()
              .then(() => this.afterSignIn());
          }
        /*
          signInWithFacebook() {
            this.auth.facebookLogin()
              .then(() => this.afterSignIn());
          }

          signInWithTwitter() {
            this.auth.twitterLogin()
              .then(() => this.afterSignIn());
          }

          /// Anonymous Sign In
          signInAnonymously() {
            this.auth.anonymousLogin()
              .then(() => this.afterSignIn());
          }
        */
          /// Shared
          private afterSignIn() {
            // Do after login stuff here, such router redirects, toast messages, etc.
            this.router.navigate(['/campaigns']);
          }


}
