//https://github.com/codediodeio/angular-firestarter/blob/master/src/app/items/shared/item.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthService} from './../core/auth.service'
import { User } from './../core/auth.service'
export class Campaign {
  $key: string;
  name: string;
  description: string;
}

@Injectable()
export class CampaignService {

  private basePath = '/campaigns';
  campaignsCollection: AngularFirestoreCollection<Campaign>;
  campaignDocument: AngularFirestoreDocument<Campaign>;
  userId =  '';
  constructor(private afs: AngularFirestore, private auth: AuthService)  {
    //auth.user.subscribe(user => this.user = user);
    //console.log('here', user.uid);
    //this.campaignsCollection = this.afs.collection('campaigns/')

    auth.user.take(1)
      .subscribe(user => {
        this.userId = user.uid;
        console.log(user.uid);
        this.campaignsCollection = this.afs.collection('campaigns/' ,
              (ref) => ref.where('owner', '==', user.uid)
            );
      });

  }

  getSnapshot(): Observable<Campaign[]> {
    //['added', 'modified', 'removed']
    return this.campaignsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Campaign;
        console.log(data);
        return {id: a.payload.doc.id, name: data.name, description: data.description, owner:data.owner};
      });
    });
  }
  //
  // getUserCampaigns(userId) {
  //   console.log(userId);
  //   const campaignsRef = this.afs.collection('campaigns', ref => ref.where('owner', '==', userId) );
  //   console.log(campaignsRef);
  //   return campaignsRef.snapshotChanges().map((actions) => {
  //     return actions.map((a) => {
  //       const data = a.payload.doc.data() as Campaign;
  //       console.log(data);
  //       return {id: a.payload.doc.id, name: data.name, description: data.description};
  //     });
  //   });
  // }
  //

  createCampaign(name: string, description: string) {
    const campaign = {
      name:name,
      description: description,
      created_at: new Date().getTime(),
      owner: this.userId;
    };
    console.log ('adding', campaign);
    return this.campaignsCollection.add(campaign);
  }
  deleteCampaign(id:string) {

    //console.log ('removing', campaign);
    return this.getCampaign(id).delete();
  }

  // Return an observable list of Campaigns
  getCampaign(id: string): Observable<Campaign[]> {

    return this.afs.doc<Campaign>(`campaigns/${id}`);
  }
}
