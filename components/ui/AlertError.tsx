import { FaExclamation } from 'react-icons/fa';

interface Props {
	text: string;
}

const AlertError = ({ text }: Props) => (
	<div className='alert-danger'>
		<FaExclamation />
		{ text }
	</div>
);

export default AlertError;
