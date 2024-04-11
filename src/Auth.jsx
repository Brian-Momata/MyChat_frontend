import { useState, useContext } from 'react';
import { IconContext } from './App';
import './styling/Auth.css'
import logo from './assets/logoipsum-250.svg'

const Auth = () => {
  const { onAuthenticationSuccess, setCurrentUser } = useContext(IconContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [type, setType] = useState('signin');

  const apiUrl = `https://backend-api-dmnv.onrender.com/users/${type === 'signup' ? 'signup' : 'login'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      user: {
        email,
        password,
        username: type === 'signup' ? username : undefined,
      },
    };

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    };

    try {
      const response = await fetch(apiUrl, fetchOptions);
      if (response.ok) {
        onAuthenticationSuccess();
        const responseData = await response.json();
        const currentUser = responseData.data.user;
        setCurrentUser(currentUser);
      } else {
        alert(type === 'signup' ? 'Failed to sign up' : 'Failed to log in');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setType((prevType) => (prevType === 'signup' ? 'signin' : 'signup'));
    // reset the form fields
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword.length < 6);
  };

  return (
    <div className='auth-wrapper'>
      <div>
        <img src={logo} className='app-logo' alt="logo" />
      </div>
      <div className={`auth-container ${type}`}>
        <h2>{type === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <>
              <label htmlFor='username'>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
            <p className="error-message">Password must be at least 6 characters long.</p>
          )}
          <button type="submit">{type === 'signup' ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <p>
          {type === 'signup'
            ? 'Already have an account?'
            : "Don't have an account yet?"}
          <a href='#' onClick={handleLinkClick}>
            {type === 'signup' ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
