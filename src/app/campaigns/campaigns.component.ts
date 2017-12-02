import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  campaignsObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {
    this.campaignsObservable = this.getCampaigns('/campaigns');
  }
  getCampaigns(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}
