import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [formName, setFormName] = useState('');
  const [toggleloading, setToggleloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value);
  };
  const handleClick = async () => {
    setToggleloading(!toggleloading);
    await createUser({ name: formName });
    navigate('/search');
  };

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <>
      <h2>Login</h2>
      <form
        onSubmit={ handleClick }
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          data-testid="login-name-input"
          onChange={ (event) => { handleChange(event); } }
          value={ formName }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ formName.length < 3 }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
