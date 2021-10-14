import { FormGroup } from '@angular/forms';
import { markFormControlsTouchedHelper } from '@u/helpers/mark-from-controls.helper';

export const SaveForm = () => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(form: FormGroup) => void>) => {
  const method = descriptor.value;

  // eslint-disable-next-line space-before-function-paren
  descriptor.value = function (): any {
    const form: FormGroup = arguments[0];

    if (form.invalid) {
      markFormControlsTouchedHelper(form);
      return false;
    }

    return method.apply(this, arguments);
  };
};
