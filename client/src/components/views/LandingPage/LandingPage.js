import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/users/hello").then((response) => {
      console.log(response);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("LogOut Fail");
      }
    });
  };

  const loginHandler = () => {
    props.history.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        fontSize: "48px",
        fontWeight: "bold",
        flexDirection: "column",
      }}
    >
      Start Page
      <Button onClick={loginHandler}>Login</Button>
      <Button onClick={onClickHandler}>LogOut</Button>
    </div>
  );
}

export default LandingPage;
