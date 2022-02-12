import { ChangeEvent, useEffect, useState } from 'react';

export const useForm = <T extends Object>(initialState: T, validate: (t: T) => T, fn: () => void) => {
	const [ values, setValues ] = useState<T>(initialState);
	const [ errors, setErrors ] = useState<T>({} as T);
	const [ submitForm, setSubmitForm ] = useState<boolean>(false);

	useEffect(() => {
		if (submitForm) {
			const noErrors = Object.keys(errors).length === 0;

			// fn -> Función que se ejecuta en el componente
			if (noErrors) {
				fn();
			}

			setSubmitForm(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors]);

	//* Handle Change
	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setValues({
			...values,
			[name]: value
		});
	}

	//* Handle Blur
	const handleBlur = () => {
		const errorsValidation = validate(values);
		setErrors(errorsValidation);
	}

	//* Submit form
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const errorsValidation = validate(values);
		setErrors(errorsValidation);
		setSubmitForm(true);
	}

	//* Reset form
	const reset = () => {
		setValues(initialState);
	}

	return {
		values,
		errors,
		handleInputChange,
		handleBlur,
		onSubmit,
		reset,
	}
}
