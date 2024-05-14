import './styling/MessagingHub.css';
import { useContext, useEffect, useState } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon, handlePersonClick, users, sentMessages, defaultProfile, currentUser } = useContext(IconContext);
  const [latestMessages, setLatestMessages] = useState([]);

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const latestMsgs = await Promise.all(sentMessages.map(async (message) => {
        const latestMsg = await latestMessage(currentUser.id, message.receiver_id);
        return { receiverId: message.receiver_id, content: latestMsg.content, time: latestMsg.created_at };
      }));
      setLatestMessages(latestMsgs);
    }

    if (currentUser) {
      fetchLatestMessages();
    }
  }, [currentUser, sentMessages]);


  const latestMessage = async (senderId, receiverId) => {
    try {
      const response = await fetch(`https://backend-api-dmnv.onrender.com/user/latest_between_users?sender_id=${senderId}&receiver_id=${receiverId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest message:', error);
      return null;
    }
  };

  return (
    <div className="messaging-hub">
      {activeIcon === 'chats' && (
        <>
          <div className='hub-header'>
            <h3>Chats</h3>
          </div>
          {sentMessages.map((message, index) => {
            const receiver = users.find(user => user.id === message.receiver_id);
            const latestMsg = latestMessages.find(msg => msg.receiverId === receiver.id);
            console.table(latestMessages)
            return (
              <div key={index} className='hub-chat' onClick={() => handlePersonClick(receiver)}>
                <img className='hub-avatar' src={receiver.avatar || defaultProfile} alt="profile" />
                <div className='chat-details'>
                  <div className='chat-info'>
                    <p className='chat-name'>{receiver?.username}</p>
                    <span className='chat-time'>{new Date(latestMsg?.time).toLocaleTimeString()}</span>
                  </div>
                  <p className='last-message'>{latestMsg?.content}</p>
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
