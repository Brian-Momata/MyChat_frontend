import './styling/MessagingHub.css';
import { useContext, useEffect, useState } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon, handlePersonClick, currentUser, setCurrentUser } = useContext(IconContext);
  const [users, setUsers] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  const usersApiEndpoint = 'http://127.0.0.1:3001/users';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersApiEndpoint);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  useEffect(() => {
    const fetchSentMessages = async () => {
      if (currentUser) {
        const sentMessagesApiEndpoint = `http://127.0.0.1:3001/user/sent_messages?user_id=${currentUser.id}`;
        try {
          const response = await fetch(sentMessagesApiEndpoint);
          const data = await response.json();
          setSentMessages(data);
        } catch (error) {
          console.error('Error fetching sent messages:', error);
        }
      }
    };

    fetchSentMessages();
  }, [currentUser]);

  useEffect(() => {
    if (users.length > 0 && currentUser) {
      const newCurrentUser = users.find(user => user.id === currentUser.id);
      setCurrentUser(newCurrentUser);
    }
  }, []);

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
                <img className='hub-avatar' src={receiverUser?.avatar} alt="profile" />
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
              <img className='hub-avatar' src={person.avatar} alt="profile" />
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
