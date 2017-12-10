import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CampaignService } from './../campaign.service';
import { Campaign } from './../campaign.service';
import { AuthService } from './../../core/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns$: Observable<Campaign[]>;

  constructor(private auth: AuthService, private campaignService: CampaignService) {

  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.campaigns$ = this.campaignService.getSnapshot();
    })
  }

  createCampaign(){
    this.campaignService.createCampaign(this.name, this.description);
    this.name = '';
    this.description = '';
    this.showAdd = false;
  }
  deleteCampaign(id){
    this.campaignService.deleteCampaign(id);
    //console.log(this.campaignService.getCampaign(id));
  }

}
