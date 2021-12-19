import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidators {
	static maxWordCount(max: number): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.value && typeof control.value === "string") {
				const value = control.value.trim();
				const words = value.split(" ");
				const actual = words.length;
				if (actual > max) {
					return { overMaxWords: true };
				} else {
					return null;
				}
			} else {
				return null;
			}
		};
	}

	static checkPasswords(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			let password = control.get("password").value;
			let password2 = control.get("password2").value;

			return password === password2 ? null : { notSame: true };
		};
	}
}
