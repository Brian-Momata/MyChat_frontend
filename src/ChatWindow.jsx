import './styling/ChatWindow.css'
import { IconContext } from './App';
import { useContext, useState, useEffect, useRef } from 'react';
import cableApp from './cable';

const ChatWindow = () => {
	const { clickedUser, currentUser, defaultProfile } = useContext(IconContext)
	const [messageContent, setMessageContent] = useState('')
	const [messages, setMessages] = useState([]);
	const messageInputRef = useRef(null);

	const cable = cableApp();

	const fetchMessages = async () => {
		try {
			const response = await fetch(`https://backend-api-dmnv.onrender.com/messages/fetch?clicked_user_id=${clickedUser.id}&current_user_id=${currentUser.id}`);
			if (!response.ok) {
				throw new Error('Failed to fetch messages');
			}
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	useEffect(() => {
		if (clickedUser) {
			fetchMessages();
		}
	}, [clickedUser]);

	const messagesUrl = 'https://backend-api-dmnv.onrender.com/user/send_message'

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
			messageInputRef.current.value = '';
			// Add the sent message to the messages array immediately to trigger a rerender
			const sentMessage = await response.json();
			setMessages((prevMessages) => [...prevMessages, sentMessage]);
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		if (currentUser) {
			cable.subscriptions.create(
				{
					channel: 'ChatsChannel',
					user_id: currentUser.id,
					recipient_id: clickedUser.id
				},
				{
					received: (message) => { setMessages([...messages, message]) }
				}
			);
		}

	}, [currentUser, cable.subscriptions, clickedUser, messages])

	return (
		<div className="chat-window">
			{clickedUser && (
				<>
					<div className="chat-window-profile">
						<img className='chat-window-avatar' src={clickedUser.avatar || defaultProfile} alt="profile" />
						<div className='user-info'>
							<h4>{clickedUser.username}</h4>
							<div className='status-container'>
								<span className='online-status'>Online</span>
								<span className='last-seen'>Last seen: {clickedUser.lastseen}</span>
							</div>
						</div>
					</div>
					<div className="messages-container">
						{messages.map((message) => (
							<div key={message.id} className={`message ${message.sender_id === currentUser.id ? 'sent' : 'received'}`}>
								<p>{message.content}</p>
							</div>
						))}

					</div>
					<div className="write-messages">
						<input
							type="text"
							placeholder="Type your message..."
							onChange={(e) => setMessageContent(e.target.value)}
							ref={messageInputRef}
						/>
						<button onClick={sendMessage}><ion-icon name="send-outline"></ion-icon></button>
					</div>
				</>
			)}
		</div>
	)
};

export default ChatWindow;
