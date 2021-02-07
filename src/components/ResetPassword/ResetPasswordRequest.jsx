import React, { useState } from "react";
import Styles from "./ResetPassword.module.scss";
import Request from "../../util/request";
import ErrorBlock from "./ErrorBlock";
import { useQueryParam, StringParam } from "use-query-params";
import SuccessBox from "./SuccessBlock";
import { Link } from "gatsby";

export default () => {
    const [username, setUsername] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [ error, setError ] = useState(null);
    const [ serverCall, setServerCall ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    const [requestId, setRequestId] = useQueryParam("requestId", StringParam);

    function onInputChange(e) {
        setError(null);
        switch(e.target.name) {
            case "password": setNewPassword(e.target.value); break;
            case "confirmPassword": setConfirmPassword(e.target.value); break;
            case "username": setUsername(e.target.value); break;
        }
    }

    async function submit(e) {
        e.preventDefault();

        if (!username) {
            setError("Username is required");
            return;
        }
        
        if (!newPassword || !confirmPassword) {
            setError("Please enter password");
            return;
        }

        if (newPassword != confirmPassword) {
            setError("Passwords doesn't match");
            return;
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `6dbb951682c7c81cc30a06fc311227be`,
            },
            data: {
                password: newPassword,
                username,
                requestId
            },
            url: "http://localhost:8082/api/private/user/reset/password/",
        };
        try {
            setServerCall(true);
            await Request.init(options);
            setShowSuccess(true);
        } catch (e) {
            if (e.response && e.response.data && e.response.data.errors && e.response.data.errors.length) {
                const { msg } = e.response.data.errors[0];
                setError(msg);
            } else {
                setError(e.message);
            }
        } finally {
            setServerCall(false);
        }
    }

    const submitBtnText = serverCall ? "Please wait..." : "Reset Password";

    return (
        <div className = {Styles.resetWrapper}>
            { showSuccess ? <SuccessBox message={`Password reset was successful!`} component={<RedirectToLogin />} />  : <form onSubmit = {submit}>
                <p className = {Styles.heading}>Reset Your Password</p>
                <input type = "text" value = {username} name={"username"} onChange={onInputChange} placeholder = "Enter your username" />
                <input type = "password" value = {newPassword} name={"password"} onChange={onInputChange} placeholder = "Enter New Password" />
                <input type = "password" value = {confirmPassword} name={"confirmPassword"} onChange={onInputChange} placeholder = "Confirm Password" />
                { error ? <ErrorBlock errorText = {error} /> : null }
                <input type = "submit" value = {submitBtnText} />
            </form> }
        </div>
    )
}

const RedirectToLogin = () => (
    <Link to = "/login" style={{ fontSize: "14px" }}>Return to Login</Link>
)
