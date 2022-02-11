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
