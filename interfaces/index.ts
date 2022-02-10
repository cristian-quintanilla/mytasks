export interface TaskInterface {
	id: string;
	title: string;
	done: boolean;
}

export interface ProjectInterface {
	id: string;
	title: string;
	tasks: TaskInterface[] | null;
}
