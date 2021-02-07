import React from "react";
import Styles from "./ResetPassword.module.scss";
import { FaCheckCircle } from "react-icons/fa";

export default ({ message, component }) => {
    return (
        <div className={Styles.successBlock}>
            <FaCheckCircle />
            <p className = {Styles.heading}>{message}</p>
            {component ? <component /> : null}
        </div>
    )
}