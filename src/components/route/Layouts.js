/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 19 April 2018
 * @author: Monika Rani
 */

import React from "react";
// import SideBarMenu from './SideBarMenu';
// import Footer from './Footer';
/*************** Front Layout ***************/

export const frontLayout = props => <div>{props.children}</div>;

/*************** Dashboard Layout ***************/

export const dashboardLayout = props => {
  let {  isLogin } = props.children.props;
  return (
    <div>
      {isLogin ? (
        <div className="mainOuter afterLogin">
          <section className="contentarea dashboard contentWrapper">
            <div>hjydgshjasghjgasjd</div>
            {/* <SideBarMenu history={history} /> */}
            <div className="pageContent mainContainer">{props.children}</div>
          </section>
        </div>
      ) : (
        ""
      )}
      {/* <Footer /> */}
    </div>
  );
};
