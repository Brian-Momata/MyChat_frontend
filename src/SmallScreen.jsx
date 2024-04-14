import { useContext } from "react";
import NavSection from "./NavSection";
import MessagingHub from "./MessagingHub";
import ChatWindow from "./ChatWindow";
import { IconContext } from "./App";

const SmallScreen = () => {
  const { activeComponent, clickedUser } = useContext(IconContext);

  return (
    <>
      {activeComponent === "messagingHub" && <MessagingHub />}
      {clickedUser && activeComponent === "chatWindow" && <ChatWindow />}
      <NavSection />
    </>
  )

};

export default SmallScreen;
