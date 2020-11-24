import React, { useRef, useState } from "react";
import firebase from "firebase";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import whatsAppLogo from "../images/whatsapp-symbol.svg";
import GoogleIcon from "../images/google-icon.svg";
import { Phone } from "@material-ui/icons";
import { auth, provider } from "../config/firebase";
import "./Login.css";

const Login = () => {
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const formRef = useRef();
  const containerRef = useRef();

  const handlePhoneNoLogin = (e) => {
    e.preventDefault();
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", { size: "visible" });
    let phoneNumber = `${code}${number}`;

    if (phoneNumber) {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, recaptcha)
        .then((res) => {
          let code = prompt("Please Enter the OTP: ");
          if (code == null) return;
          res
            .confirm(code)
            .then((authUser) => {
              const username = prompt("Enter Username: ");
              return authUser.user.updateProfile({
                displayName: username,
              });
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Please Enter Phone Number");
    }
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => res)
      .catch((err) => alert(err.message));
  };

  const signInWithPhone = () => {
    formRef.current.style.display = "flex";
    containerRef.current.style.display = "none";
  };

  const cancelPhoneSignIn = () => {
    containerRef.current.style.display = "flex";
    formRef.current.style.display = "none";
  };

  return (
    <div className="login" id="login">
      <div ref={containerRef} className="login__container">
        <img src={whatsAppLogo} alt="WhatsAppLogo" />
        <h1>Sign In To WhatsApp</h1>
        <button onClick={signInWithGoogle} className="login__googleBtn">
          <img src={GoogleIcon} alt="Google Icon" className="login__google" />
          <span>Sign in with Google</span>
        </button>
        <button onClick={signInWithPhone} className="login__phoneBtn">
          <Phone />
          <span>Sign in with phone</span>
        </button>
      </div>
      <form ref={formRef} className="login__form">
        <h1>Enter Your phone number</h1>
        <div className="login__number">
          <FormControl className="login__code">
            <InputLabel>Code</InputLabel>
            <Input
              className="login__inputCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
          <FormControl className="login__number">
            <InputLabel>Phone number</InputLabel>
            <Input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} />
          </FormControl>
        </div>
        <div className="recaptcha" id="recaptcha"></div>
        <div className="login__buttons">
          <Button onClick={cancelPhoneSignIn}>Cancel</Button>
          <Button onClick={handlePhoneNoLogin} type="submit">
            Verify
          </Button>
        </div>
        <p>By tapping Verify, an SMS may be sent. Message & data rates may apply.</p>
      </form>
    </div>
  );
};

export default Login;
