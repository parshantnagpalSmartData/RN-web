/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========     Page for service hit loader      ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React, { Component } from "react";
import { ScaleLoader } from "halogenium";

class Loader extends Component {
	render() {
		return (
			<div>
				<div
					style={{
						display: "block",
						fontSize: "0",
						position: "fixed",
						zIndex: "9999",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)"
					}}
				>
					{this.props.isShowingLoader && <ScaleLoader color="#333" size="26px" margin="4px" />}
				</div>
			</div>
		);
	}
}

export default Loader;
