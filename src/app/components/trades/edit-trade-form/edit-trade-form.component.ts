import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBaseComponent } from '@c/shared/forms/form-base.component';
import { environment } from '@env/environment';
import { getGroup } from '@u/forms/form-generics';
import moment from 'moment';

import { EditTradeFormModel } from './edit-trade-form.model';

@Component({
  selector: 'demo-edit-trade-form',
  templateUrl: './edit-trade-form.component.html',
  styleUrls: ['./styles/edit-trade-form.component.scss'],
})
export class EditTradeFormComponent extends FormBaseComponent<EditTradeFormModel> implements OnInit {
  constructor() {
    super(
      getGroup<EditTradeFormModel>({
        entryDate: { vldtr: Validators.required },
        entryPrice: { vldtr: Validators.required },
        exitDate: { vldtr: Validators.required },
        exitPrice: { vldtr: Validators.required },
      })
    );
  }
  currentDate = moment();
  dateFormat = environment.dateFormat;

  ngOnInit(): void {}
}
