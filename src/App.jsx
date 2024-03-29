import React, { createContext, useState, useEffect } from "react"
import NavSection from "./NavSection"
import MessagingHub from "./MessagingHub"
import ChatWindow from "./ChatWindow"
import Auth from "./Auth"
import './styling/App.css'

export const IconContext = createContext({
  activeIcon: '',
  setActiveIcon: () => { },
  clickedUser: {},
  handlePersonClick: () => { },
  onAuthenticationSuccess: () => { },
  showProfile: Boolean,
  setShowProfile: () => { },
  currentUser: {},
  setCurrentUser: () => { },
  users: [],
  sentMessages: [],
  defaultProfile: '',
})
function App() {
  const [activeIcon, setActiveIcon] = useState('chats');
  const [clickedUser, setClickedUser] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  const defaultProfile = 'https://api.dicebear.com/8.x/icons/svg?seed=Sassy&backgroundColor[]'
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
  }, []);

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

  const handlePersonClick = (person) => {
    setClickedUser(person);
    setShowProfile(false);
  }
  const onAuthenticationSuccess = () => {
    console.log("Authentication successful!");
    setAuthenticated(true);
  };

  return (
    authenticated ? (
      <>
        <div className="app">
          <div className="header">
            <ion-icon name="logo-wechat"></ion-icon>
            <h4>MyChat</h4>
          </div>
          <IconContext.Provider value={{
            activeIcon,
            setActiveIcon,
            clickedUser,
            handlePersonClick,
            onAuthenticationSuccess,
            showProfile,
            setShowProfile,
            setCurrentUser,
            currentUser,
            users,
            sentMessages,
            defaultProfile,
          }}>
            <NavSection />
            <MessagingHub />
            <ChatWindow />
          </IconContext.Provider>
        </div>
      </>
    ) : (
      <IconContext.Provider value={{
        activeIcon,
        setActiveIcon,
        clickedUser,
        handlePersonClick,
        onAuthenticationSuccess,
        setCurrentUser,
        users,
      }}>
        <Auth />
      </IconContext.Provider>
    )
  )
}

export default App
