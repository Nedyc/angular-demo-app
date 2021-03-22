
import {FormGroup, AbstractControl} from '@angular/forms';

export default class Utils {
  static getErrorMessage(fieldName: any, itemForm: FormGroup): string {
      const field:AbstractControl = <AbstractControl>itemForm.get(fieldName);
      if(field.touched && field.status === "INVALID"){
        if(field.hasError("required"))
            return "Campo richiesto";
        else if(field.hasError("minlength"))
            return "La lunghezza minima è di " + field.errors?.minlength.requiredLength;
        else if(field.hasError("maxlength"))
            return "La lunghezza massima è di " + field.errors?.maxlength.requiredLength;
      }

    return "";
  }
}