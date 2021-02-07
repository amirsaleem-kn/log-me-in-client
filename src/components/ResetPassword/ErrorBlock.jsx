import React from "react";
import Styles from "./ResetPassword.module.scss";
import { FaExclamationTriangle } from "react-icons/fa";

export default ({ errorText }) => (
    <div className = {Styles.errorBlock}>
        <FaExclamationTriangle /> {errorText}
    </div>
)
