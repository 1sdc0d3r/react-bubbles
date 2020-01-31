import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "Lambda School",
    password: "i<3Lambd4"
  });

  const onChangeHandler = evt => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmitHandler = evt => {
    evt.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={onChangeHandler}
        />
        <label>password: </label>
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={onChangeHandler}
        />
        <button type="submit">Login!</button>
      </form>
    </>
  );
};

export default Login;
