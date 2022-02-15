import { db, collection, getDocs, query, where } from '../firebase/config';
import { TaskInterface } from '../interfaces';

export const loadTasks = async (uid: string, project: string) => {
	const tasks: TaskInterface[] = [];

  const tasksRef = collection(db, `${ uid }/mytasks/tasks`);
  const q = query(tasksRef, where('project', '==', project));
  const querySnapshot = await getDocs(q);

	querySnapshot.forEach(doc => {
		tasks.push({
			id: doc.id,
			title: doc.data().title,
      done: doc.data().done,
      project: project,
		});
	});

	return tasks;
}
