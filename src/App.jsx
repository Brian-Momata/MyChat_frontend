import NavSection from "./NavSection"
import MessagingHub from "./MessagingHub"
import ChatWindow from "./ChatWindow"
import './styling/App.css'

function App() {
  return (
    <div className="app">
      <div className="header">
        <ion-icon name="logo-wechat"></ion-icon>
        <h4>MyChat</h4>
      </div>
      <NavSection />
      <MessagingHub />
      <ChatWindow />
    </div>
  )
}

export default App
