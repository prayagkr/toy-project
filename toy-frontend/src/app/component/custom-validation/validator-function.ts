import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';


export function passwordValidatorFn(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const pass = control.get('password').value;
        const confPass = control.get('confirmPassword').value;
        let response = null;

        if (pass !== confPass) {
            response = { passwordNotMatch: true };
        }
        return response;
    };
}
