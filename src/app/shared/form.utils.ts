import { FormGroup } from "@angular/forms";

export class FormUtils {
  public constructor(private form: FormGroup) { }

  public fieldClass(fieldName: string) {
    return {
      'has-error': this.showFieldError(fieldName),
      'has-success': this.getField(fieldName).valid,
    }
  }

  public showFieldError(fieldName: string): boolean {
    let field = this.getField(fieldName);
    return field.invalid && (field.dirty || field.touched);
  }

  public getField(fieldName: string) {
    return this.form.get(fieldName);
  }
}