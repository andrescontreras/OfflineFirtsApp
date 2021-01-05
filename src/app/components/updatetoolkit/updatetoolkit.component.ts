import { Component, OnInit, Input } from '@angular/core';

//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-updatetoolkit',
  templateUrl: './updatetoolkit.component.html',
  styleUrls: ['./updatetoolkit.component.scss'],
})
export class UpdatetoolkitComponent implements OnInit {
  @Input() id: string;
  @Input() data: any;

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  UpdateRecord() {
    this.data.date = Date.now();
    this.firestore
      .doc('/Toolkit/' + this.id)
      .update(this.data)
      .then(() => {
        console.log('actualizado');
      });
    this.modalController.dismiss();
  }

  CloseModal() {
    this.modalController.dismiss();
  }
}
