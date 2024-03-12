import './styling/MessagingHub.css';
import { useContext } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon, handlePersonClick } = useContext(IconContext);

  // I'm using this for the functionality. Will delete later
  const people = [
    { name: 'John', lastseen: 'Yesterday, 12:13 PM' },
    { name: 'Brian', lastseen: 'Yesterday, 09:13 PM' },
    { name: 'Momata', lastseen: 'Today, 12:13 AM' }
  ];

  return (
    <div className="messaging-hub">
      {activeIcon === 'chats' && (
        <>
          <div className='hub-header'>
            <h3>Chats</h3>
          </div>
          <div className='hub-chat' onClick={() => handlePersonClick(people[0])}>
            <img className='hub-avatar' src="" alt="profile" />
            <div className='chat-details'>
              <div className='chat-info'>
                <p className='chat-name'>{people[0].name}</p>
                <span className='chat-time'>Time</span>
              </div>
              <p className='last-message'>Last message</p>
            </div>
          </div>
        </>
      )}
      {activeIcon === 'people' && (
        <div className='hub-header'>
          <h3>People</h3>
          <div className='hub-person' onClick={() => handlePersonClick(people[0])}>
            <img className='hub-avatar' src="" alt="profile" />
            <div className='person-details'>
              <p className='person-name'>{people[0].name}</p>
            </div>
          </div>
          <div className='hub-person' onClick={() => handlePersonClick(people[1])}>
            <img className='hub-avatar' src="" alt="profile" />
            <div className='person-details'>
              <p className='person-name'>{people[1].name}</p>
            </div>
          </div>
          <div className='hub-person' onClick={() => handlePersonClick(people[2])}>
            <img className='hub-avatar' src="" alt="profile" />
            <div className='person-details'>
              <p className='person-name'>{people[2].name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingHub;
