import './styling/NavSection.css'
import { useState } from 'react';

const NavSection = () => {
  const [activeIcon, setActiveIcon] = useState('chats');
  
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  return (
    <nav>
      <ul>
        <li className={activeIcon === 'chats'? 'active': ''} onClick={() => handleIconClick('chats')}>
          <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
        </li>
        <li className={activeIcon === 'people'? 'active': ''} onClick={() => handleIconClick('people')}>
          <ion-icon name="people-outline"></ion-icon>
        </li>
      </ul>
      <div className='nav-config'>
        <i className={activeIcon === 'settings'? 'active': ''} onClick={() => handleIconClick('settings')}>
          <ion-icon name="cog-outline"></ion-icon>
        </i>
        <div className='profile'>
          <img src="" />
        </div>
      </div>
    </nav>
  )
};

export default NavSection;
