import React from "react";
import { Component } from "react";
import { TextField, Button, Container,  Card,  Link } from "@material-ui/core";
import "./Login.css"

const styles = {
  paperContainer: {
      width: '500px',
      height:'500px'
  },
  mainContainer: {
    display: 'flex',
    
    margin: '0px',
    background: 'black',
    color: 'white',
    height: '1000px'
  },
  loginForm: {
    margin: '10px'
  },
  button: {
    
    margin: '3px,  green',
    color: 'green',
    background: 'black',
    borderRadius: '3px',
    width: '100px',
    // border-radius:'4px',
    // border:'1px solid #18ab29',
    // display:'inline-block',
    cursor:'pointer',
    // color:#ffffff',
    
    // padding:6px 12px;
    
    // text-shadow:0px 1px 0px #2f6627;
  },
  

}; 
class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleTextChange = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  login = (e) => {
    e.preventDefault();
    document.cookie = "loggedIn=true;max-age=60*1000*5";

    console.log(document.cookie);
    const payload = { ...this.state };
    console.log("THE USER", payload);
    console.log(this.props);
    // this.props.setUser(payload);
    console.log(this.props.user);
    window.location.replace("/movie");
  };

  render() {
    return (
      <div>
        
        <Container maxWidth="xl" style = {styles.mainContainer}>
        {/* <Card style={styles.paperContainer}>
          
        </Card> */}
          <form className="login-form" style = {styles.loginForm}maxwidth="md"onSubmit={this.login}>
            <h3>Welcome to your movie list. If this is your first time, <Link>sign up.</Link>  Otherwise login below.</h3>
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.username}
              name="username"
              label="Username"
              type="text"
            />
            <br></br>
            <TextField
              required
              onChange={this.handleTextChange}
              value={this.state.password}
              name="password"
              label="Password"
              type="password"
            />
            <br></br>
            <br></br>
            <button
              type="submit"
              className="myButton"
              style={styles.button}
              
            >
              Login
            </button>
          </form>
        </Container>
        </div>
    );
  }
}

export default Login;
