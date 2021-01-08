import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { SpeedTestService } from 'ng-speed-test';

@Injectable({
  providedIn: 'root',
})
export class NetStatusService {
  netStatus: boolean;
  netStatusSubject = new BehaviorSubject(true);
  constructor(
    private firestore: AngularFirestore,
    private network: Network,
    public toastController: ToastController,
    private speedTestService: SpeedTestService
  ) {
    this.netStatus = true;
    this.checkconnection();
    this.changeNetStatus();
    this.networkLatency();

    this.firestore.firestore.settings({
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED, // disable LRU garbage collection
    });
  }

  changeNetStatus() {
    this.netStatusSubject.subscribe((isEnabled) => {
      isEnabled ? this.enableNetwork() : this.disableNetwork();
    });
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

  checkconnection() {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.presentToast('network was disconnected :-(');
      this.netStatusSubject.next(false);
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.presentToast('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          this.presentToast('we got a wifi connection, woohoo!');
          this.netStatusSubject.next(true);
        }
      }, 3000);
    });

    this.speedTestService.isOnline().subscribe((isOnline) => {
      console.log('***********', isOnline);
      this.netStatusSubject.next(isOnline);
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  async networkLatency() {
    const speed = await this.speedTestService
      .getMbps({
        iterations: 2,
        retryDelay: 500,
      })
      .toPromise();
    console.log('Your speed is ' + speed);
    if (speed < 2) {
      this.presentToast('Your network speed is less than 2 Mbps');
    }
  }
}
