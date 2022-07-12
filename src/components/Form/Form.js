import React, { useState } from 'react';
import { dateIsValid, emailIsValid, isInTheFuture } from '../../utils';
import './Form.css';

const defaultFormValues = {
  name: {
    value: '',
    error: null,
  },
  email: {
    value: '',
    error: null,
  },
  dateOfBirth: {
    value: new Date().toISOString().split('T')[0],
    error: null,
  },
  favouriteColor: {
    value: '#5469D4',
  },
  salary: {
    value: 0,
  },
};

export default function Form() {
  const [formState, setFormState] = useState(defaultFormValues);
  const { name, email, dateOfBirth, favouriteColor, salary } = formState;

  const isNameValid = (value) => value && value !== '' && value.length < 100;

  const isEmailValid = (value) =>
    value && value.length < 100 && emailIsValid(value);

  const isDateOfBirthValid = (value) =>
    value && dateIsValid(value) && !isInTheFuture(new Date(value));

  const isFormInputsValid =
    isNameValid(name.value) &&
    isEmailValid(email.value) &&
    isDateOfBirthValid(dateOfBirth.value);

  const setFormErrorMessages = () => {
    setFormState({
      ...formState,
      name: {
        ...name,
        error: isNameValid(name.value)
          ? ''
          : 'Name is invalid. It cannot be empty or more than 100 letters.',
      },
      email: {
        ...email,
        error: isEmailValid(email.value)
          ? ''
          : 'Email is invalid. The format is incorrect or more than 100 letters.',
      },
      dateOfBirth: {
        ...dateOfBirth,
        error: isDateOfBirthValid(dateOfBirth.value)
          ? ''
          : 'Date of birth is invalid or in the future. Please select date in calendar or input the correct date.',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInputsValid) {
      alert(
        'Info submitted.' +
          `\nName: ${name.value}` +
          `\nEmail: ${email.value}` +
          `\nDate of Birth: ${dateOfBirth.value}` +
          `\nFavourite Color: ${favouriteColor.value}` +
          `\nSalary: ${salary.value >= 100 ? '>' : ''}£${salary.value}${
            salary.value > 0 ? 'k' : ''
          }`
      );
      setFormState(defaultFormValues);
    } else {
      setFormErrorMessages();
    }
  };

  const handleInputChange = (e, field) => {
    setFormState({
      ...formState,
      [field]: {
        ...formState[field],
        value: e.target.value,
      },
    });
  };

  return (
    <section>
      <div className='form-wrapper'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form__field'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name.value}
              placeholder='Name'
              onChange={(e) => handleInputChange(e, 'name')}
            />
            {name.error && (
              <div className='margin-top-12'>
                <label className='form__error-label'>{name.error}</label>
              </div>
            )}
          </div>
          <div className='form__field'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              value={email.value}
              placeholder='Email'
              onChange={(e) => handleInputChange(e, 'email')}
            />
            {email.error && (
              <div className='margin-top-12'>
                <label className='form__error-label'>{email.error}</label>
              </div>
            )}
          </div>
          <div className='form__field'>
            <label htmlFor='dateOfBirth'>Date of Birth</label>
            <input
              type='date'
              name='dateOfBirth'
              defaultValue={dateOfBirth.value}
              onChange={(e) => handleInputChange(e, 'dateOfBirth')}
            />
            {dateOfBirth.error && (
              <div className='margin-top-12'>
                <label className='form__error-label'>{dateOfBirth.error}</label>
              </div>
            )}
          </div>
          <div className='form__field'>
            <label htmlFor='favouriteColor'>
              Favourite Color: {favouriteColor.value}
            </label>
            <input
              type='color'
              name='favouriteColor'
              value={favouriteColor.value}
              onChange={(e) => handleInputChange(e, 'favouriteColor')}
            />
            {favouriteColor.error && (
              <div className='margin-top-12'>
                <label className='form__error-label'>
                  {favouriteColor.error}
                </label>
              </div>
            )}
          </div>
          <div className='form__field'>
            <label htmlFor='salary'>
              Salary:&nbsp;
              {salary.value >= 100 && `>`}
              {`£${salary.value}`}
              {salary.value > 0 && 'k'}
            </label>
            <input
              type='range'
              name='salary'
              min='0'
              max='100'
              value={salary.value}
              onChange={(e) => handleInputChange(e, 'salary')}
            />
            {salary.error && (
              <div className='margin-top-12'>
                <label className='form__error-label'>{salary.error}</label>
              </div>
            )}
          </div>
          <div>
            <input type='submit' value='Continue' />
          </div>
        </form>
      </div>
    </section>
  );
}
