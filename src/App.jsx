import { createContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import NavSection from "./NavSection"
import MessagingHub from "./MessagingHub"
import ChatWindow from "./ChatWindow"
import Auth from "./Auth"
import SmallScreen from "./SmallScreen"
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
  setActiveComponent: () => { },
  activeComponent: '',
})
function App() {
  const [activeIcon, setActiveIcon] = useState('chats');
  const [clickedUser, setClickedUser] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("messagingHub");

  const defaultProfile = 'https://api.dicebear.com/8.x/icons/svg?seed=Sassy&backgroundColor[]'
  const usersApiEndpoint = 'https://backend-api-dmnv.onrender.com/users';

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);


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
        const sentMessagesApiEndpoint = `https://backend-api-dmnv.onrender.com/user/sent_messages?user_id=${currentUser.id}`;
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

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get('token');
      if (token) {
        const response = await fetch('https://backend-api-dmnv.onrender.com/validate_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setAuthenticated(true);
        } else {
          Cookies.remove('token');
          setAuthenticated(false);
        }
      }
    }
    checkAuthentication();
  }, [])

  const handlePersonClick = (person) => {
    setClickedUser(person);
    setShowProfile(false);
    if (isSmallScreen) {
      setActiveComponent("chatWindow");
    }
  }
  const onAuthenticationSuccess = () => {
    setAuthenticated(true);
  };

  return (
    authenticated ? (
      <>
        <div className="app">
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
            setActiveComponent,
            activeComponent,
          }}>
            {isSmallScreen ? (
              <SmallScreen />
            ) : (
              <>
                <NavSection />
                <MessagingHub />
                <ChatWindow />
              </>
            )}
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
