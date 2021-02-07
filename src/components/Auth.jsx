import React from "react";
import { navigate } from "gatsby-link";

export default (component) => {
    const loggedIn = sessionStorage.getItem("login") === "true";
    if (loggedIn) {
        return component;
    }
    navigate("/login")
}
