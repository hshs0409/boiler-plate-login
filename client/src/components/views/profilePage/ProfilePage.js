import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeProfile } from "../../../_actions/user_action";

function ProfilePage(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const setEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const setNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email,
      name,
      password,
    };

    dispatch(changeProfile(body)).then((response) => {
      console.log(response);
      if (response.payload.success) {
        props.history.push("/profile");
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

        <button type="submit">Change Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
