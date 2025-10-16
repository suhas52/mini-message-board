import { useState, useEffect } from 'react';
import Messages from './components/messages'
import NewMessageForm from './components/newMessage'

function App() {
  
  const [messages, setMessages] = useState({});
  
  
  useEffect(() => {
    async function getMessages() {
      const response  = await fetch('http://localhost:8080/api/messages');
      const data = await response.json();
      setMessages(data.messages);
    }
    
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => clearInterval(interval);
  }, [])
  
  return<> <NewMessageForm></NewMessageForm>
  <Messages messages={ Array.from(messages) } />
  </> 
  
}

export default App;