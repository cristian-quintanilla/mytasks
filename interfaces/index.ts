export interface TaskInterface {
	id: string;
	title: string;
	done: boolean;
	project: string;
}

export interface ProjectInterface {
	id: string;
	title: string;
}

export interface AuthInterface {
	uid: string;
	name: string;
}

export interface NewUserInterface {
	name: string;
	email: string;
	password: string;
}

export interface LoginRecordsInterface {
	email: string;
	password: string;
}
