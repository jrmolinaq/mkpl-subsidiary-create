import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ModalService } from './services/modal.service';

declare const Liferay: any;

@Component({
  selector: 'modal',
  templateUrl: 
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-subsidiary-create/app/modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() applyPadding = true;
  @Output() closeModal = new EventEmitter();
  private element: any;
  
  constructor(
    private modalService: ModalService, 
    private el: ElementRef) {
      this.element = el.nativeElement;
  }

  ngOnInit() {
    const modal = this;
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'modal-container') {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.modalService.setOpenModal(false);
    this.closeModal.emit();
  }
}
