import React from "react";
import Styles from "./Header.module.scss";
import { H1 } from "../Typography/Heading";
import { navigate } from "gatsby-link";

export default () => {
    const logout = () => {
        sessionStorage.setItem("login", false);
        navigate("/login");
    }
    return (
        <header className = {Styles.header}>
            <section>
                <H1>LOG ME IN</H1>
            </section>
            <section>
                <button onClick={logout}>Logout</button>
            </section>
        </header>
    )
}
