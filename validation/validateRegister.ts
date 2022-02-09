interface Values {
	name?: string;
	email?: string;
	password?: string;
}

export default function validateRegister(values: Values) {
	let errores: Values = {};

	// Validate Name
	if (!values.name) {
		errores.name = 'Name is required.';
	} else if (values.name.length < 3) {
		errores.name = 'Name must be at least 3 characters.';
	}

	// Validate Email
	if (!values.email) {
		errores.email = 'Email is required.';
	} else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
		errores.email = 'Email is invalid.';
	}

	// Validate Password
	if (!values.password) {
		errores.password = 'Password is required.';
	} else if (values.password.length < 6) {
		errores.password = 'Password must be at least 6 characters.';
	}

	return errores;
}
