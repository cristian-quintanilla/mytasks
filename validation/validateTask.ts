interface Values {
	task?: string;
}

export default function validateTask(values: Values) {
	let errores: Values = {};

	// Validate task
	if (!values.task) {
		errores.task = 'Task is required.';
	} else if (values.task.trim().length < 5) {
		errores.task = 'Task must be at least 5 characters.';
	}

	return errores;
}
