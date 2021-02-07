import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";

export default ({ children, fullPage = true }) => (
  <div>
    { fullPage ? <Header /> : null}
    <Container>{children}</Container>
    { fullPage ? <Footer /> : null}
  </div>
);
