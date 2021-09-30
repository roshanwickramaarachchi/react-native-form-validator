import ValidationComponent, { ClassValidationProps, FormState } from 'react-native-form-validator';

class ClassForm extends ValidationComponent<ClassValidationProps, FormState> {
  constructor(props: ClassValidationProps) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      touchedFields: { firstName: false, lastName: false, email: false }
    };
  }

  onBlurHandler(event: React.FormEvent<HTMLElement>, field: string): void {
    this.setState({ touchedFields: { ...this.state.touchedFields, [field]: true } });
  }

  formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, firstName, lastName } = this.state;

    console.log(email, firstName, lastName);

    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      touchedFields: { firstName: false, lastName: false, email: false }
    });
  }

  render(): JSX.Element {
    return (
      <header className="App-header">
        <form onSubmit={this.formSubmitHandler.bind(this)}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'email')}
              value={this.state.email}
              placeholder="Seize an email"
            />
            <p className="error-text">
              {this.state.touchedFields.email &&
                this.isFieldInError('email') &&
                this.getErrorsInField('email').join('\n')}
            </p>
          </div>
          <div className="form-control">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              onChange={(e) => this.setState({ ...this.state, firstName: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'firstName')}
              value={this.state.firstName}
              placeholder="Seize a first name"
            />
            <p className="error-text">
              {this.state.touchedFields.firstName &&
                this.isFieldInError('firstName') &&
                this.getErrorsInField('firstName').join('\n')}
            </p>
          </div>
          <div className="form-control">
            <label htmlFor="astName">Last Name</label>
            <input
              id="lastName"
              type="text"
              onChange={(e) => this.setState({ ...this.state, lastName: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'lastName')}
              value={this.state.lastName}
              placeholder="Seize a last name"
            />
            <p className="error-text">
              {this.state.touchedFields.lastName &&
                this.isFieldInError('lastName') &&
                this.getErrorsInField('lastName').join('\n')}
            </p>
          </div>
          <button disabled={!this.isFormValid}>Submit</button>
        </form>
      </header>
    );
  }
}

export default ClassForm;
