import React, { createContext, useState } from "react"
import NavSection from "./NavSection"
import MessagingHub from "./MessagingHub"
import ChatWindow from "./ChatWindow"
import './styling/App.css'

export const IconContext = createContext({
  activeIcon: '',
  setActiveIcon: () => {},
  clickedUser: {},
  handlePersonClick: () => {},
})
function App() {
  const [activeIcon, setActiveIcon] = useState('chats');
  const [clickedUser, setClickedUser] = useState('');

  const handlePersonClick = (person) => setClickedUser(person);
  return (
    <div className="app">
      <div className="header">
        <ion-icon name="logo-wechat"></ion-icon>
        <h4>MyChat</h4>
      </div>
      <IconContext.Provider value={{ 
          activeIcon,
          setActiveIcon,
          clickedUser,
          handlePersonClick
        }}>
        <NavSection />
        <MessagingHub />
        <ChatWindow />
      </IconContext.Provider>
    </div>
  )
}

export default App
