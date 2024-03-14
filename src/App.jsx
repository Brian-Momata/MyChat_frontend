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
})
function App() {
  const [activeIcon, setActiveIcon] = useState('chats');
  const [clickedUser, setClickedUser] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handlePersonClick = (person) => setClickedUser(person);

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
            onAuthenticationSuccess
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
        onAuthenticationSuccess
      }}>
        <Auth />
      </IconContext.Provider>
    )
  )
}

export default App
