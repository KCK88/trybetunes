import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [userName, setUserName] = useState('');
  const [toggleloading, setToggleloading] = useState(true);
  useEffect(() => {
    getUser().then((user) => {
      setUserName(user.name);
      setToggleloading((prevState) => !prevState);
    });
  }, []);

  if (toggleloading) {
    return (<Loading />);
  }

  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search" />
      <NavLink data-testid="link-to-favorites" to="/favorites" />
      <NavLink data-testid="link-to-profile" to="/profile" />
      <p data-testid="header-user-name">{userName}</p>
    </header>
  );
}

export default Header;
