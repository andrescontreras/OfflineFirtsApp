import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NetStatusService {
  netStatus: boolean;
  constructor(private firestore: AngularFirestore) {
    this.netStatus = true;
  }

  disableNetwork() {
    this.netStatus = false;
    this.firestore.firestore.disableNetwork().then(() => {
      console.log('network disabled');
    });
  }

  enableNetwork() {
    this.netStatus = true;
    this.firestore.firestore.enableNetwork().then(() => {
      console.log('network enabled');
    });
  }
}
