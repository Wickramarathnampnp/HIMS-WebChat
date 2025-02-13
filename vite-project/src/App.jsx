
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from "react";
import ReactWebChat from "botframework-webchat";

function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const fetchToken = async () => {
      const directLineSecret = "YOUR_DIRECT_LINE_SECRET";
      const response = await fetch("https://directline.botframework.com/v3/directline/tokens/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${directLineSecret}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setToken(data.token);
    };

    fetchToken();
  }, []);

  if (!token) return <p>Loading chat...</p>;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <ReactWebChat
        directLine={window.WebChat.createDirectLine({ token })}
        userID="User123"
        username="User"
        locale="en-US"
      />
    </div>
  );
}

export default App
