import { Injectable } from '@angular/core';
import { ToasterMessage, ToastType } from '../model/toaster.model';
import { InteranlService } from './interanl.service';

@Injectable()
export class AthenaToasterService {


  constructor(private interanlService: InteranlService) { }

  public success(message: string, header?: string) {
    this.interanlService.toastMessage.next(new ToasterMessage(message, header, ToastType.SUCCESS));
  }

  public error(message: string, header?: string) {
    this.interanlService.toastMessage.next(new ToasterMessage(message, header, ToastType.ERROR));
  }

  public warning(message: string, header?: string) {
    this.interanlService.toastMessage.next(new ToasterMessage(message, header, ToastType.WARNING));
  }

  public info(message: string, header?: string) {
    this.interanlService.toastMessage.next(new ToasterMessage(message, header, ToastType.INFO));
  }

  public clearAll() {
    this.interanlService.toastMessage.next(null);
  }
}
