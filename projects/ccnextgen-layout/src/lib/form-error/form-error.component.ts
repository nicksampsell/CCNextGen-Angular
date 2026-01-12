import { CommonModule } from "@angular/common";
import { Component, Input,} from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: 'form-error',
    templateUrl: './form-error.component.html',
    standalone: true,
    imports:[CommonModule]
})
export class FormError {
    @Input() control!: AbstractControl | null;
    @Input() customErrors: { [key:string]:string} = {};
    @Input() wrapperTag: string | null = null;
    @Input() wrapperClass: string = 'invalid-feedback d-block';

    get errorMessage(): string | null {
        if(this.control && this.control.invalid && (this.control.dirty || this.control.touched))
        {
            for(const errorName in this.control.errors)
            {
                if(this.control.errors?.hasOwnProperty(errorName))
                {

                    // Prioritize custom error messages
                    if(this.customErrors[errorName]){
                        return this.customErrors[errorName];
                    }
                
                    // Fallback to default messages for common validators
                    switch(errorName) {
                        case 'required':
                            return 'This field is required.';
                        case 'minlength':
                            return `Minimum length is ${this.control.errors['minlength'].requiredLength} characters.`;
                        case 'maxlength':
                            return `Maximum length is ${this.control.errors['maxlength'].requiredLength} characters.`;
                        case 'email':
                            return 'Invalid email format.';
                        case 'pattern':
                            return 'Invalid format.';
                    }
                }
            }
        }
        return null;
    }
}