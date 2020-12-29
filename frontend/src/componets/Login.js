import React from "react";
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="../Slack_RGB.png" alt="" />
        <h1>Sign in to SlackJack</h1>
        <p>actionjacks22@gmail.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
