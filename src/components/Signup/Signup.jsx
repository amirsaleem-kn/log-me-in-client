import React from "react";
import { Link } from "gatsby";
import Styles from "./Signup.module.scss";
import Request from "../../util/request";
import { navigate } from "gatsby-link";
import { FaExclamationTriangle } from "react-icons/fa";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                username: "",
                password: "",
            },
            error: null,
            serverCall: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
    }

    onInputChange(e) {
        const form = {...this.state.form};
        form[e.target.name] = e.target.value;
        this.setState({ form, error: null });
    }

    validate() {
        const form = this.state.form;
        const fields = Object.keys(form);
        for (const field of fields) {
            if (!form[field]) {
                this.setState({ error: `${field} is required` });
                return false;
            }
        }
        return true;
    }

    async submit(e) {
        e.preventDefault();
        const form = this.state.form;
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        const options = {
            method: "POST",
            data: form,
            url: "/api/private/user",
        };

        try {
            this.setState({ serverCall: true, error: null });
            await Request.init(options);
            this.setState({ serverCall: false});
            navigate("/login"); // redirect to login
        } catch (e) {
            if (e.response && e.response.data && e.response.data.errors && e.response.data.errors.length) {
                const { msg } = e.response.data.errors[0];
                this.setState({ error: msg, serverCall: false });
            } else {
                this.setState({ error: e.message, serverCall: false });
            }
        }
    }

    render() {
        const { form, serverCall, error } = this.state;
        const { firstName, lastName, email, phone, username, password } = form;
        const loginBtnText = serverCall ? "Creating a new account" : "Create Account";
        return (
            <div className = { Styles.signupWrapper }>
                <form onSubmit = {this.submit}>
                    <p className = {Styles.heading}>Create a New Account</p>
                    <input type = "text" value = {firstName} name={"firstName"} onChange={this.onInputChange} placeholder = "First Name" />
                    <input type = "text" value = {lastName} name={"lastName"} onChange={this.onInputChange} placeholder = "Last Name" />
                    <input type = "text" value = {email} name={"email"} onChange={this.onInputChange} placeholder = "Email" />
                    <input type = "text" value = {phone} name={"phone"} onChange={this.onInputChange} placeholder = "Phone" />
                    <input type = "text" value = {username} name={"username"} onChange={this.onInputChange} placeholder = "Username" />
                    <input type = "password" value = {password} name = "password" onChange={this.onInputChange} placeholder = "Password" />
                    { error ? <ErrorBlock errorText = {error} /> : null }
                    <input type = "submit" value = {loginBtnText} />
                    <Link to = "/login/" className = {Styles.forgotPassword}>Already have an account? Log in instead</Link>
                </form>
            </div>
        )
    }
}

const ErrorBlock = ({ errorText }) => (
    <div className = {Styles.errorBlock}>
        <FaExclamationTriangle /> {errorText}
    </div>
)

export default Signup;
