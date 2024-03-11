import './styling/MessagingHub.css';
import { useContext } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon } = useContext(IconContext);

  return (
    <div className="messaging-hub">
      {activeIcon === 'chats' && (
        <>
          <div className='hub-header'>
            <h3>Chats</h3>
          </div>
          <div className='hub-chat'>
            <img className='chat-avatar' src="" alt="profile" />
            <div className='chat-details'>
              <div className='chat-info'>
                <p className='chat-name'>Name</p>
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
        </div>
      )}
    </div>
  );
};

export default MessagingHub;
