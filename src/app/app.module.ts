import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//IMPORT OFFICIAL ANGULAR FIRE AND THE ENVIRONMENT TO LOAD FIREBASE.
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

//IMPORT FIRESTORE (DB) MODULE TO PERFORM A QUERY
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UpdaterecordComponent } from './components/updaterecord/updaterecord.component';
import { FormsModule } from '@angular/forms';
import { UpdatetoolkitComponent } from './components/updatetoolkit/updatetoolkit.component';
import { Network } from '@ionic-native/network/ngx';
import { SpeedTestModule } from 'ng-speed-test';

@NgModule({
  declarations: [AppComponent, UpdaterecordComponent, UpdatetoolkitComponent],
  entryComponents: [UpdaterecordComponent, UpdatetoolkitComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SpeedTestModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebase'),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
