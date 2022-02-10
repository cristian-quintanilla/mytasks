import AlertError from '../ui/AlertError';

import validateTask from '../../validation/validateTask';
import { useForm } from '../../hooks/useForm';

const INITIAL_STATE = {
	task: ''
}

const AddEditTask = () => {
  const { values, errors, handleBlur, handleInputChange, onSubmit } = useForm(INITIAL_STATE, validateTask, addOrEdit);
	const { task } = values;

	//* Add / Edit Task
	async function addOrEdit() {
    console.log('addOrEdit taskObject');
	}

  return (
    <section className='form-task'>
      <h2 className='form-task__title'>Add Task</h2>

      <form className='form-task__form' onSubmit={ onSubmit }>
        <input
          type='text'
          id='task-name'
          name='task'
          className='form-task__form-input'
          autoComplete='off'
          placeholder='Task Name'
          value={ task }
          onBlur={ handleBlur }
          onChange={ handleInputChange }
        />

        {
          errors.task ? (
            <AlertError text={ errors.task } />
          ) : (
            <button
              type='submit'
              className='form-task__form-button'
              disabled={ !task }
            >
              Add Task
            </button>
          )
        }
      </form>
    </section>
  );
}

export default AddEditTask;
