import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Toaster, ToastType, ToasterMessage } from '../../model/toaster.model';
import { InteranlService } from '../../service/interanl.service';
import { AthenaToasterService } from '../../service/athena-toaster.service';

@Component({
  selector: 'app-athena-toaster',
  templateUrl: './athena-toaster.component.html',
  styleUrls: ['./athena-toaster.component.scss']
})
export class AthenaToasterComponent implements OnInit {

  public toasters: Array<Toaster> = new Array<Toaster>();
  private counter: number;

  constructor(
    private interanlService: InteranlService,
    private cd: ChangeDetectorRef
    ) {
    this.counter = 0;
    this.callSubscrubeToaster();
  }

  ngOnInit() {

  }

  private callSubscrubeToaster() {
    this.interanlService.toastMessage
      .subscribe(
        (toastMessage: ToasterMessage) => {
          if (toastMessage) {
            const colorType: Array<boolean> = this.checkType(toastMessage);
            this.toasters.push(new Toaster(this.counter++, toastMessage.message, toastMessage.header, colorType));
          } else {
            this.toasters = new Array<Toaster>();
          }
          this.cd.detectChanges();
        });
  }

  /**
   * Creates array of boolean with lenght 4. At a time any 1 index will be true others will be false.
   * index 0 - SUCCESS
   * index 1 - ERROR
   * index 2 - WARNING
   * index 3 - INFO
   * @param {ToasterMessage} toastMessage Provide ToastMessage type from SUCCESS, ERROR, WARNING, INFO
   */
  private checkType(toastMessage: ToasterMessage): Array<boolean> {
    switch (toastMessage.type) {
      case ToastType.SUCCESS:
        return new Array<boolean>(true, false, false, false);
      case ToastType.ERROR:
        return new Array<boolean>(false, true, false, false);
      case ToastType.WARNING:
        return new Array<boolean>(false, false, true, false);
      case ToastType.INFO:
        return new Array<boolean>(false, false, false, true);
      default:
        throw new Error('Unrecognized ToastType');
    }
  }

  /**
   * Removes toaster message from the stack.
   * If toaster id is provided then it checks, if that id is in toaster then it removes it.
   * If toaster id is undefined and index is defined then it will remove toaster from that index.
   * @param {number} id Toaster id
   * @param {number} index Toaster index no
   */
  public close(id: number, index: number) {
    const len = this.toasters.length;
    if (id !== undefined && id !== null) {
      this.toasters.splice(this.getIndexof(id, this.toasters), 1);
      // tslint:disable-next-line: no-unused-expression
      (len <= 1) ? this.toasters = new Array<Toaster>() : null;
    } else if (index !== undefined && index !== null) {
      if (index <= (len - 1)  && index >= 0) {
        this.toasters.splice(index, 1);
        // tslint:disable-next-line: no-unused-expression
        (len <= 1) ? this.toasters = new Array<Toaster>() : null;
      }
    }
  }

  public getIndexof(id: number, toasters: Array<Toaster>): number {
    let indexes = -1;
    for (let index = 0; index < toasters.length; index++) {
      if (toasters[index].id === id) {
        indexes = index;
        break;
      }
    }
    return indexes;
  }

}
