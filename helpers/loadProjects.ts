import { db, collection, getDocs } from '../firebase/config';
import { ProjectInterface } from '../interfaces/index';

export const loadProjects = async (uid: string) => {
	const projects: ProjectInterface[] = [];
	const querySnapshot = await getDocs(collection(db, `${ uid }/mytasks/projects`));

	querySnapshot.forEach(doc => {
		projects.push({
			id: doc.id,
			title: doc.data().title,
		});
	});

	return projects;
}
