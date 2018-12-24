import React, { Component } from "react";
import "./style.css";

class MyHtml extends Component {
  render() {
    return (
      <div id="id01" className="modal">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span
              onClick={() => alert("123")}
              className="close"
              title="Close Modal"
            >
              &times;
            </span>
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />

            <button type="submit">Login</button>
            <label>
              <input type="checkbox" name="remember" />
            </label>
          </div>
          <div className="container">
            <button
              type="button"
              onClick={() => alert("123")}
              className="cancelbtn"
            >
              Cancel
            </button>
            <span className="psw">
              Forgot <a href="#">password?</a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default MyHtml;
