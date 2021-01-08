import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firestore: AngularFirestore,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //   // watch network for a disconnection
    //   this.network.onDisconnect().subscribe(() => {
    //     console.log('network was disconnected :-(');
    //   });

    //   // stop disconnect watch
    //   // disconnectSubscription.unsubscribe();

    //   // watch network for a connection
    //   this.network.onConnect().subscribe(() => {
    //     console.log('network connected!');
    //     // We just got a connection but we need to wait briefly
    //     // before we determine the connection type. Might need to wait.
    //     // prior to doing any api requests as well.
    //     setTimeout(() => {
    //       if (this.network.type === 'wifi') {
    //         console.log('we got a wifi connection, woohoo!');
    //       }
    //     }, 3000);
    //   });

    //   this.network.onChange().subscribe((response) => {
    //     console.log('***********');
    //   });
  }
}
