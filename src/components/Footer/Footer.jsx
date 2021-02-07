import React from "react";
import Styles from "./Footer.module.scss";
import { H2, H5 } from "../Typography/Heading";

export default () => (
    <footer className = {Styles.footer}>
        <H2>Footer</H2>
        <H5>This is site footer</H5>
    </footer>
)
