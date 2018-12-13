/**
 * Name : Parshant Nagpal
 * FileName: routes.web.js
 * Description : contains all routes that we are used inside react router
 * Date : 12 December 2018
 */
import React from "react";
import { Router, Route, Link } from "react-router-dom";
import SignIn from "../container/auth/Login";
import Screen2 from "../container/Screen2";

import history from "../utilities/history";
export default (routes = () => {
  return (
    <Router history={history}>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={SignIn} />
        <Route path="/Screen2" component={Screen2} />
        {/* <Route path="/topics" component={Topics} /> */}
      </div>
    </Router>
  );
});

// const Home = () => <h2>Home</h2>;
// const About = () => <h2>About</h2>;
// const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>

//     <ul>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.path}/:id`} component={Topic} />
//     <Route
//       exact
//       path={match.path}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

// const Header = () => (
//   <ul>
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/about">About</Link>
//     </li>
//     <li>
//       <Link to="/topics">Topics</Link>
//     </li>
//   </ul>
// );
