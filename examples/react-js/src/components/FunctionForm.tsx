import { FunctionComponent, useState } from 'react';
import { useValidation } from 'react-native-form-validator';

interface FunctionFormProps {}

const FunctionForm: FunctionComponent<FunctionFormProps> = () => {
  const [touchedFields, setTouchedFields] = useState({ email: false, firstName: false, lastName: false });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      email: { required: true, email: true },
      firstName: { required: true, minlength: 2, maxlength: 6 },
      lastName: { required: true }
    },
    state: { firstName, lastName, email }
  });

  const onBlurHandler = (event: React.FormEvent<HTMLElement>, field: string) =>
    setTouchedFields((prevFields) => ({ ...prevFields, [field]: true }));

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, firstName, lastName);
    setFirstName('');
    setLastName('');
    setEmail('');
    setTouchedFields({ firstName: false, lastName: false, email: false });
  };

  return (
    <header className="App-header">
      <form onSubmit={formSubmitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'email')}
            value={email}
            placeholder="Seize an email"
          />
          <p className="error-text">
            {touchedFields.email && isFieldInError('email') && getErrorsInField('email').join('\n')}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'firstName')}
            value={firstName}
            placeholder="Seize a first name"
          />
          <p className="error-text">
            {touchedFields.firstName && isFieldInError('firstName') && getErrorsInField('firstName').join('\n')}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="astName">Last Name</label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'lastName')}
            value={lastName}
            placeholder="Seize a last name"
          />
          <p className="error-text">
            {touchedFields.lastName && isFieldInError('lastName') && getErrorsInField('lastName').join('\n')}
          </p>
        </div>
        <div className="actions">
          <button disabled={!isFormValid}>Submit</button>
        </div>
      </form>
    </header>
  );
};

export default FunctionForm;
