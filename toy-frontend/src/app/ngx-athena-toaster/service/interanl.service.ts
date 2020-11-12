import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ToasterMessage } from '../model/toaster.model';

@Injectable()
export class InteranlService {
  public toastMessage: Subject<ToasterMessage> = new Subject<ToasterMessage>();
  public toastClear: BehaviorSubject<ToasterMessage> = new BehaviorSubject<ToasterMessage>(null);

  constructor() { }
}
