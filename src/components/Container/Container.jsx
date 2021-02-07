import React from "react";
import Styles from "./Container.module.scss";

export default ({ children }) => (
    <div className = { Styles.container }>
        {children}
    </div>
)
