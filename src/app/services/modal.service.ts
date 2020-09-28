import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];
  modalIsOpen = new Subject<boolean>();

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  setOpenModal(isOpen: boolean) {
    this.modalIsOpen.next(isOpen);
  }

  isOpen() {
    return this.modalIsOpen.asObservable();
  }
  
  open(id: string) {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
    this.modalIsOpen.next(true);
  }

  close(id: string) {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
    this.modalIsOpen.next(false);
  }
}
