import React, { useState, useContext } from "react";
import "./login.css";
import Message from "../../Layout/Message/message";
import { AuthContext } from "../../../Contexts/AuthContext";

function Login() {

  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [remember, setRemember] = useState(false);
  var [message, setMessage] = useState<boolean>(false);
  var [messageText, setMessageText] = useState<string>("");
  var [messageType, setMessageType] = useState<string>("");

  var context = useContext(AuthContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    switch (e.target.name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "remember":
        setRemember(e.target.checked);
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let result = await context?.login(username, password, remember)
    if(!result)
    {
      setMessage(true);
      setMessageType("error");
      setMessageText("Username ou Password incorretos.")
    }
    
  }

  function destroyMessage() {
    setMessage(false);
    setMessageText("");
    setMessageType("");
  }

  function checkMessage() {
    if (message) {
      return (
        <Message
          text={messageText}
          type={messageType}
          destroy={destroyMessage}
        />
      );
    }
  }

  return (
    <>
      {checkMessage()}

      <div className="login-area">
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <p>Login</p>
          <div className="login-container">
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <div className="remember-container">
              <label htmlFor="remember">Remember me:</label>
              <input
                type="checkbox"
                name="remember"
                id=""
                className="remember"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
