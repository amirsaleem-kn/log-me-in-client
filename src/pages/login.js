import React from "react";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import Container from "../components/Container/Container";

export default () => {
    return (
        <Container fullPage = {false}>
            <Login />
        </Container>
    )
}
