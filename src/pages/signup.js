import React from "react";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Signup/Signup";
import Container from "../components/Container/Container";

export default () => {
    return (
        <Container fullPage = {false}>
            <Signup />
        </Container>
    )
}
