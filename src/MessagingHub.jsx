import './styling/MessagingHub.css';
import { useContext } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon, handlePersonClick, users, sentMessages, defaultProfile } = useContext(IconContext);

  return (
    <div className="messaging-hub">
      {activeIcon === 'chats' && (
        <>
          <div className='hub-header'>
            <h3>Chats</h3>
          </div>
          {sentMessages.map((message, index) => {
            const receiverUser = users.find(user => user.id === message.receiver_id);
            return (
              <div key={index} className='hub-chat' onClick={() => handlePersonClick(receiverUser)}>
                <img className='hub-avatar' src={receiverUser.avatar || defaultProfile} alt="profile" />
                <div className='chat-details'>
                  <div className='chat-info'>
                    <p className='chat-name'>{receiverUser?.username}</p>
                    <span className='chat-time'>{new Date(message.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className='last-message'>{message.content}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
      {activeIcon === 'people' && (
        <div className='hub-header'>
          <h3>People</h3>
          {users.map((person, index) => (
            <div key={index} className='hub-person' onClick={() => handlePersonClick(person)}>
              <img className='hub-avatar' src={person.avatar || defaultProfile} alt="profile" />
              <div className='person-details'>
                <p className='person-name'>{person.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagingHub;
