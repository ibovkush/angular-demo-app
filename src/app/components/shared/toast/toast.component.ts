import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'demo-toast',
  template: `
    <div class="alert alert-cstm alert-cstm-warning " role="alert">
      <button (click)="remove()" type="button" class="close" data-dismiss="alert" aria-label="Close">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <div class="row">
        <div class="alert-icon">
          <i class="icon-"></i>
        </div>
        <div class="alert-content">
          <h4>
            {{ title }}
          </h4>
          <p>
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          display: 'none',
          opacity: 0,
        })
      ),
      transition(
        'inactive => active',
        animate(
          '300ms ease-out',
          keyframes([
            style({
              opacity: 0,
            }),
            style({
              opacity: 0.8,
            }),
            style({
              opacity: 1,
            }),
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '300ms ease-out',
          keyframes([
            style({
              opacity: 0.6,
              bottom: 0,
            }),
            style({
              opacity: 0.1,
            }),
            style({
              opacity: 0,
            }),
          ])
        )
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class DemoToastComponent extends Toast {
  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  action(event: any): boolean {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
