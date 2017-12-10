import { Component, OnInit, Input } from '@angular/core';
import { Campaign, Entity, CampaignService} from './campaign.service';
import { ActivatedRoute } from '@angular/router';

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})



export class CampaignComponent implements OnInit {

  @Input() campaign: Campaign;
  //campaign: Observable<Campaign>;
  entities$: Observable<Entity[]>;
  transferData: Object = {id: 1, msg: 'Hello'};
  receivedData: Array<any> = [];
  id: string;
  constructor(private route: ActivatedRoute, private campaignService: CampaignService) {
    this.id = route.snapshot.params.id;
    console.log(this.id);
  }

  ngOnInit() {
    this.getCampaign();
    this.getEntities();
  }

  getCampaign(): void {
      const id = this.route.snapshot.params.id;
      console.log(id);
      this.campaignService.getCampaign(id)
        .subscribe(campaign => this.campaign = campaign);
    }

    getEntities() {
      this.entities$ = this.campaignService.getEntities(this.id);
    }

    

    transferDataSuccess($event: any, destEntity:Entity) {
        console.log($event);
        console.log(destEntity);
        //destEntity.relationships.append({'entity':$event.dragData.id, 'relationship':'knows'} );
        this.campaignService.addRelationship(this.id, destEntity, "knows", $event.dragData );
    }
  createEntity(){
    this.campaignService.createEntity(this.id, this.name, this.nickname, this.description);
    this.name = '';
    this.nickname = '';
    this.description = '';
    this.showAdd = false;
  }


}
