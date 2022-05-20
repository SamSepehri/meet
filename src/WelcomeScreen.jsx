import React from "react";

import "./WelcomeScreen.css";

function WelcomeScreen(props) {
    const logo = require("./logo_transparent.png");
    return props.showWelcomeScreen ? (
        <div className="bgimg">
            <img className="logoPosition" src={logo} alt="logo" />

            <div className="middleText">
                <h1 className="h1">Welcome to meetUp</h1>
                <h2 className="middleDownText">
                    <a
                        className="a"
                        href="https://samsepehri.github.io/meet/privacy.html"
                        rel="nofollow noopener"
                    >
                        Privacy policy
                    </a>
                </h2>
            </div>
            <div className="google-btn-position">
                <div className="google-btn">
                    <div className="google-icon-wrapper">
                        <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        />
                    </div>

                    <p
                        className="btn-text"
                        onClick={() => {
                            props.getAccessToken();
                        }}
                        rel="nofollow noopener"
                    >
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>

            <div className="transbox bottomText">
                <p>Login to see upcoming events around the WORLD for full-stack developers.</p>
            </div>
        </div>
    ) : null;
}

export default WelcomeScreen;