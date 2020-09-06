import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const setEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const setNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const setConfirmPasswordHandler = (event) => {
    setconfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 같지 않습니다. ");
    }

    let body = {
      email,
      name,
      password,
    };

    dispatch(signUpUser(body)).then((response) => {
      console.log(response);
      if (response.payload.signUpSuccess) {
        props.history.push("/login");
      } else {
        alert("Fail to SignUp");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={setEmailHandler} />
        <label>Name</label>
        <input type="text" value={name} onChange={setNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={setPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={setConfirmPasswordHandler}
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default RegisterPage;
