import React from "react";
import Layout from "../components/Layout/Layout";
import ResetPasswordRequest from "../components/ResetPassword/ResetPasswordRequest";
import Container from "../components/Container/Container";

export default () => {
    return (
        <Container fullPage = {false}>
            <ResetPasswordRequest />
        </Container>
    )
}
