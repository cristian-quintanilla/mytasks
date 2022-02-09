interface Props {
	id: string;
	label: string;
	name: string;
	placeholder: string;
	type: 'text' | 'email' | 'password';
	value: string | undefined;
	onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ id, label, name, placeholder, type, value, onBlur, onChange }: Props): JSX.Element => (
	<>
		<label htmlFor={ id } className='login__form-group-label'>
			{ label }
		</label>

		<input
			className='login__form-group-input'
			autoComplete='off'
			type={ type }
			id={ id }
			name={ name }
			placeholder={ placeholder }
			value={ value }
			onBlur={ onBlur }
			onChange={ onChange }
		/>
	</>
);

export default InputForm;
