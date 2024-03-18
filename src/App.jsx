import React, { createContext, useState } from "react"
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
})
function App() {
  const [activeIcon, setActiveIcon] = useState('chats');
  const [clickedUser, setClickedUser] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

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
            currentUser
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
      }}>
        <Auth />
      </IconContext.Provider>
    )
  )
}

export default App
