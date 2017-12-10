//https://github.com/codediodeio/angular-firestarter/blob/master/src/app/items/shared/item.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthService} from './../core/auth.service'
import { User } from './../core/auth.service'
export class Campaign {
  id: string;
  name: string;
  description: string;
}

export class Entity {
  id: string;
  name: string;
  nickname: string;
  description: string;
  created_at: any;
  updated_at: any;
  relationships: [any];
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

    return this.campaignsCollection.add(campaign);
  }
  deleteCampaign(id:string) {
    return this.getCampaignDoc(id).delete();
  }

  // Return an observable list of Campaigns
  getCampaignDoc(id: string): Observable<Campaign[]> {
    return this.afs.doc<Campaign>(`campaigns/${id}`);
  }

  // Return an observable list of Campaigns
  getCampaign(id: string): Observable<Campaign[]> {
    return this.getCampaignDoc(id).valueChanges();
  }

  getEntities(campaign:string):Observable<Entity[]>{
    console.log("getting entities for", campaign);
    // return this.getCampaignDoc(campaign).collection('entities').valueChanges();
    return this.getCampaignDoc(campaign).collection('entities').snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Entity;
        console.log(data);
        data.id = a.payload.doc.id;
        return data;//{id: a.payload.doc.id, name: data.name, description: data.description, owner:data.owner};
      });
    });

  }


  createEntity(campaign:string, name:string, nickname:string, description: string) {
    const entity = {
      name:name,
      nickname:nickname,
      description:description,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      relationships:[]
    }
    return this.getCampaignDoc(campaign).collection('entities').add(entity);
  }

  addRelationship(campaign:string, entity:Entity, rel:string, target: Entity ){
    const r = {
      src:entity.id,
      relationship:rel,
      dest:target.id
    }
    entity.relationships.push(r);
    return this.getCampaignDoc(campaign).collection('entities').doc(entity.id).update({'relationships': entity.relationships});


  }

}
