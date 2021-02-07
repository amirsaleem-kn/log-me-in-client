import React, { useEffect } from "react";
import Styles from "./Home.module.scss";
import Section from "../Section/Section";
import { H1 } from "../Typography/Heading";
import { navigate } from "gatsby-link";

export default () => {

    if (typeof sessionStorage !== "undefined") {
        if (sessionStorage.getItem("login") !== "true") {
            navigate("/login");
            return null;
        }
    }

    return (
        <main className = {Styles.home}>
            <Section>
                <H1>Welcome to Our Site</H1>
            </Section>
        </main>
    );    
}