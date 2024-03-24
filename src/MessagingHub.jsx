import './styling/MessagingHub.css';
import { useContext, useEffect, useState } from 'react';
import { IconContext } from './App';

const MessagingHub = () => {
  const { activeIcon, handlePersonClick, currentUser, setCurrentUser } = useContext(IconContext);
  const [users, setUsers] = useState([]);

  const usersApiEndpoint = 'http://127.0.0.1:3001/users'

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
    if (users.length > 0 && currentUser) {
      const newCurrentUser = users.find(user => user.id === currentUser.id);
      setCurrentUser(newCurrentUser);
    }
  }, [users]);

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
                <p className='chat-name'>{users[0]?.username}</p>
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
