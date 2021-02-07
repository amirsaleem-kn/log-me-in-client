import React, { useState } from "react";
import Styles from "./ResetPassword.module.scss";
import Request from "../../util/request";
import ErrorBlock from "./ErrorBlock";
import SuccessBox from "./SuccessBlock";


const ResetPassword = () => {
    const [email, setEmail] = useState(null);
    const [ error, setError ] = useState(null);
    const [ serverCall, setServerCall ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    function onInputChange(e) {
        setError(null);
        switch(e.target.name) {
            case "email": setEmail(e.target.value); break;
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function submit(e) {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `6dbb951682c7c81cc30a06fc311227be`,
            },
            data: {
                email
            },
            url: "http://localhost:8082/api/private/user/reset/password/link",
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

    const submitBtnText = serverCall ? "Please wait..." : "Get Password Reset Link";

    return (
        <div className = {Styles.resetWrapper}>
            { showSuccess ? <SuccessBox message={`We've sent an email to ${email}. Please open the link to reset your password`} /> : <Form submit={submit} email={email} onInputChange={onInputChange} error={error} submitBtnText={submitBtnText} /> }
        </div>
    )
}

const Form = ({ submit, email, onInputChange, error, submitBtnText }) => {
    return (
        <form onSubmit = {submit}>
            <p className = {Styles.heading}>Enter your email to reset the password</p>
            <input type = "text" value = {email} name={"email"} onChange={onInputChange} placeholder = "john.doe@example.com" />
            { error ? <ErrorBlock errorText = {error} /> : null }
            <input type = "submit" value = {submitBtnText} />
        </form>
    )
}


export default ResetPassword;
