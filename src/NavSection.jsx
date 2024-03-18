import { IconContext } from './App';
import './styling/NavSection.css';
import { useContext } from 'react';

const NavSection = () => {
  const { activeIcon, setActiveIcon, showProfile, setShowProfile, currentUser } = useContext(IconContext);

  const handleIconClick = (icon) => {
    if (icon === 'profile') {
      setShowProfile((prev) => !prev);
    } else {
      setActiveIcon(icon);
      setShowProfile(false);
    }
  };

  return (
    <nav>
      <ul>
        <li className={activeIcon === 'chats' ? 'active' : ''} onClick={() => handleIconClick('chats')}>
          <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
        </li>
        <li className={activeIcon === 'people' ? 'active' : ''} onClick={() => handleIconClick('people')}>
          <ion-icon name="people-outline"></ion-icon>
        </li>
      </ul>
      <div className='nav-config'>
        <i className={activeIcon === 'settings' ? 'active' : ''} onClick={() => handleIconClick('settings')}>
          <ion-icon name="cog-outline"></ion-icon>
        </i>
        {showProfile && (
          <div className='profile-modal'>
            <div className='profile-img-container'>
              <div className='profile'>
                <img src="" alt="profile" />
              </div>
            </div>
            <div className='profile-details'>
              <p>{currentUser.username}</p>
              <p>email: {currentUser.email}</p>
            </div>
          </div>
        )}

        <div className='nav-profile' onClick={() => handleIconClick('profile')}>
          <img src="" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default NavSection;
