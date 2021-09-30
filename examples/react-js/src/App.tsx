import './App.css';
import ClassForm from './components/ClassForm';
import FunctionForm from './components/FunctionForm';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const validation = {
    email: { required: true, email: true },
    firstName: { required: true, minlength: 2, maxlength: 6 },
    lastName: { required: true }
  };

  return (
    <Router>
        <Switch>
          <Route path="/function-form">
            <FunctionForm />
          </Route>
          <Route path="/class-form">
            <ClassForm validation={validation} />
          </Route>
        </Switch>
        <Redirect to="/function-form" />
    </Router>
  );
}

export default App;
