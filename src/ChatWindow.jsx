import './styling/ChatWindow.css'
import { IconContext } from './App';
import { useContext } from 'react';

const ChatWindow = () => {
  const { clickedUser } = useContext(IconContext)
  return (
    <div className="chat-window">
      <div className="chat-window-profile">
        <img className='chat-window-avatar' src="" alt="profile" />
        <div className='user-info'>
          <h4>{clickedUser.name}</h4>
          <div className='status-container'>
            <span className='online-status'>Online</span>
            <span className='last-seen'>Last seen: {clickedUser.lastseen}</span>
          </div>
        </div>
      </div>
      <div className="messages-container">
      </div>
      <div className="write-messages">
        <input type="text" placeholder="Type your message..." />
        <button><ion-icon name="send-outline"></ion-icon></button>
      </div>
    </div>
  )
};

export default ChatWindow;
