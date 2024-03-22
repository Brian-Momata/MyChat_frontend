import './styling/ChatWindow.css'
import { IconContext } from './App';
import { useContext, useState } from 'react';

const ChatWindow = () => {
	const { clickedUser, currentUser } = useContext(IconContext)
	const [messageContent, setMessageContent] = useState('')

	const messagesUrl = 'http://127.0.0.1:3001/user/send_message'

	const sendMessage = async () => {
		try {
			const response = await fetch(messagesUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					sender_id: currentUser.id,
					receiver_id: clickedUser.id,
					content: messageContent,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			// Clear the message input after sending
			setMessageContent('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	return (
		<div className="chat-window">
			{clickedUser && (
				<>
					<div className="chat-window-profile">
						<img className='chat-window-avatar' src="" alt="profile" />
						<div className='user-info'>
							<h4>{clickedUser.username}</h4>
							<div className='status-container'>
								<span className='online-status'>Online</span>
								<span className='last-seen'>Last seen: {clickedUser.lastseen}</span>
							</div>
						</div>
					</div>
					<div className="messages-container">
					</div>
					<div className="write-messages">
						<input type="text" placeholder="Type your message..." onChange={(e) => setMessageContent(e.target.value)} />
						<button onClick={sendMessage}><ion-icon name="send-outline"></ion-icon></button>
					</div>
				</>
			)}
		</div>
	)
};

export default ChatWindow;
