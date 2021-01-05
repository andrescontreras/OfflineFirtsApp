import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { UpdaterecordComponent } from '../components/updaterecord/updaterecord.component';
import { first } from 'rxjs/operators';
import { NetStatusService } from '../services/net-status.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  doc: any;
  records: { id: string; description: string; amount: number; type: string }[];
  addrecord: { type: string; description: string; amount: number };
  netStatus: string;
  colorNetEstatus: string;
  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private netStatusService: NetStatusService
  ) {}

  ngOnInit() {
    this.addrecord = { type: '', description: '', amount: null };

    this.getData();
  }

  ionViewWillEnter() {
    this.updateNetStatus(this.netStatusService.netStatus);
    console.log('will enter tab 1');
  }

  async getData() {
    console.log('init**********');

    this.firestore
      .collection('/Records/', (ref) => ref.where('type', '==', 'income'))
      .snapshotChanges()
      .pipe()
      .subscribe((res) => {
        if (res) {
          this.records = res.map((e) => {
            return {
              id: e.payload.doc.id,
              description: e.payload.doc.data()['description'],
              amount: e.payload.doc.data()['amount'],
              type: e.payload.doc.data()['type'],
            };
          });
        }
      });
    this.firestore.firestore.waitForPendingWrites().then((res) => {
      console.log('waitForPendingWrites');
      console.log(res);
    });

    // const itemsCollection = this.firestore.collection('Records');
    // const items = itemsCollection.valueChanges({ idField: 'description' });
    // items.subscribe((res) => {
    //   console.log(res);
    // });
  }

  AddRecord(type, description, amount) {
    let addrecord = {};
    addrecord['type'] = type;
    addrecord['description'] = description;
    addrecord['amount'] = amount;
    console.log(addrecord);
    this.firestore
      .collection('/Records/')
      .add(addrecord)
      .then(() => {
        this.addrecord = { type: '', description: '', amount: null };
      });
  }
  async UpdateRecord(id, type, description, amount) {
    const modal = await this.modalController.create({
      component: UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id,
        type: type,
        description: description,
        amount: amount,
      },
    });
    return await modal.present();
  }
  DeleteRecord(id) {
    this.firestore.doc('/Records/' + id).delete();
  }

  updateNetStatus(isEnabled: boolean) {
    if (isEnabled) {
      this.netStatusService.enableNetwork();
      this.netStatus = 'ONLINE';
      this.colorNetEstatus = 'success';
    } else {
      this.netStatusService.disableNetwork();
      this.netStatus = 'OFFLINE';
      this.colorNetEstatus = 'danger';
    }
  }
}
