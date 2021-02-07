import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Styles from "./Login.module.scss";
import Request from "../../util/request";
import { navigate } from "gatsby-link";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const Login = () => {

    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ serverCall, setServerCall ] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("login");
        if (loggedIn === "true") {
            navigate("/"); // redirect to home
            return null;
        }
    });

    function onInputChange(e) {
        setError(null);
        switch(e.target.name) {
            case "username": setUsername(e.target.value); break;
            case "password": setPassword(e.target.value);
        }
    }

    function validate() {
        if (serverCall) {
            return false;
        }
        if (!username) {
            setError(`Please enter username`);
            return false;
        }
        if (!password) {
            setError(`Please enter password`);
            return false;
        }
        setError(null);
        return true;
    }

    async function submit(e) {
        e.preventDefault();
        const isValid = validate();
        if (isValid === false) {
            return;
        }
        const auth = `Basic ${btoa(`${username}:${password}`)}`;
        const options = {
            method: "POST",
            headers: {
                "Authorization": auth,
            },
            url: "/api/private/user/login",
        };
        try {
            setServerCall(true);
            await Request.init(options);
            sessionStorage.setItem("login", true);
            navigate("/"); // redirect to home
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

    const loginBtnText = serverCall ? "Logging you In..." : "Log In";

    return (
        <div className = { Styles.loginWrapper }>
            <form onSubmit = {submit}>
                <p className = {Styles.heading}>Login to your account</p>
                <input type = "text" value = {username} name={"username"} onChange={onInputChange} placeholder = "Username" />
                <input type = "password" value = {password} name = "password" onChange={onInputChange} placeholder = "Password" />
                { error ? <ErrorBlock errorText = {error} /> : null }
                <input type = "submit" value = {loginBtnText} />
                <Link to = "/reset-password/" className = {Styles.forgotPassword}>Forgot Password?</Link>
                <div className = {Styles.lineBreak}></div>
                <Link to = "/signup"><button>Create New Account</button></Link>
            </form>
        </div>
    )
}

const ErrorBlock = ({ errorText }) => (
    <div className = {Styles.errorBlock}>
        <FaExclamationTriangle /> {errorText}
    </div>
)

export default Login;
