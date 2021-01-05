import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { NetStatusService } from '../services/net-status.service';
import toolkit from '../../assets/Nestle_questi.json';
import { UpdatetoolkitComponent } from '../components/updatetoolkit/updatetoolkit.component';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  netStatus: string;
  colorNetEstatus: string;
  toolkits: any[];

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private netStatusService: NetStatusService
  ) {}

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.updateNetStatus(this.netStatusService.netStatus);
    console.log('will enter tab 2');
  }

  async getData() {
    this.firestore
      .collection('/Toolkit/')
      .snapshotChanges()
      .pipe()
      .subscribe((res) => {
        if (res) {
          this.toolkits = res.map((e) => {
            return {
              id: e.payload.doc.id,
              data: e.payload.doc.data(),
            };
          });
        }
      });
  }

  updateNetStatus(isEnabled: boolean) {
    if (isEnabled) {
      this.netStatusService.enableNetwork();
      this.netStatus = 'ONLINE';
      this.colorNetEstatus = 'success';
    } else {
      this.netStatusService.disableNetwork();
      this.netStatusService.netStatus = false;
      this.netStatus = 'OFFLINE';
      this.colorNetEstatus = 'danger';
    }
  }

  uploadToolkit() {
    let toolkitData: any = toolkit;
    toolkitData.date = Date.now();
    toolkitData.name = 'default' + Date.now();
    toolkitData.phone = '123123123' + Date.now();

    this.firestore
      .collection('/Toolkit/')
      .add(toolkitData)
      .then(() => {
        console.log('toolkit added');
      });
  }

  deleteTookit(id) {
    this.firestore.doc('/Toolkit/' + id).delete();
  }

  async updateToolkit(id, toolkit) {
    const modal = await this.modalController.create({
      component: UpdatetoolkitComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id,
        data: toolkit,
      },
    });
    return await modal.present();
  }
}
