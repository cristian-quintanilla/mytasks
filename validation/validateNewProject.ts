interface Values {
	title?: string;
}

export default function validateNewProject(values: Values) {
	let errores: Values = {};

	// Validate Title
	if (!values.title) {
		errores.title = 'Title is required.';
	} else if (values.title.trim().length < 3) {
		errores.title = 'Title must be at least 3 letters.';
	}

	return errores;
}
