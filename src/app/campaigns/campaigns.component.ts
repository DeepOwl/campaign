import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CampaignService } from './campaign.service';
import { Campaign } from './campaign.service';
import { AuthService } from './../core/auth.service';
@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns$: Observable<Campaign[]>;

  constructor(private auth: AuthService, private campaignService: CampaignService) {

  }

  ngOnInit() {
    //this.campaigns$ = this.campaignService.getSnapshot();
    this.auth.user.subscribe(user => {
      this.campaigns$ = this.campaignService.getUserCampaigns(user.uid);
    })
  }


}
