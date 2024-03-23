import { IconContext } from './App';
import './styling/NavSection.css';
import { useContext, useState } from 'react';

const NavSection = () => {
  const { activeIcon, setActiveIcon, showProfile, setShowProfile, currentUser } = useContext(IconContext);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const avatars = [
    { id: 1, src: "https://api.dicebear.com/8.x/avataaars/svg?seed=Milo" },
    { id: 2, src: "https://api.dicebear.com/8.x/avataaars/svg?seed=Max" },
    { id: 3, src: "https://api.dicebear.com/8.x/avataaars/svg?seed=Midnight" },
    { id: 4, src: "https://api.dicebear.com/8.x/lorelei/svg?seed=Midnight" },
    { id: 5, src: "https://api.dicebear.com/8.x/lorelei/svg?seed=Max" },
    { id: 6, src: "https://api.dicebear.com/8.x/open-peeps/svg?seed=Willow" },
  ];

  const handleIconClick = (icon) => {
    if (icon === 'profile') {
      setShowProfile((prev) => !prev);
    } else {
      setActiveIcon(icon);
      setShowProfile(false);
    }
  };

  const handleAvatarSelection = (avatarSrc) => {
    setShowAvatarOptions(false);
    // TODO: Add functionality to associate user with avatar
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
              <p><span>Username:</span> {currentUser.username}</p>
              <p><span>Email:</span> {currentUser.email}</p>
            </div>
            <div className='avatars'>
              <button onClick={() => setShowAvatarOptions(true)}>Select an avatar</button>
              {showAvatarOptions && (
                <div className='avatar-options'>
                  <ul>
                    {avatars.map((avatar) => (
                      <li key={avatar.id} onClick={() => handleAvatarSelection(avatar.src)}>
                        <img src={avatar.src} alt={`Avatar ${avatar.id}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
