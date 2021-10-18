import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import "./style.css";

export default function Navbar({ search, setSearch }) {
  let history = useHistory();
  const runSearch = (val) => {
    setSearch(val);
    if (val & (val !== "undefined") || val !== "") {
      history.push("/search");
    } else {
      history.push("/");
    }
  };
  return (
    <div className="navContainer">
      <Container>
        <Row className="navBar">
          <Col xs="12" md="4" className="d-flex align-items-center my-1">
            <Link to="/" className="mr-3">
              <AiFillHome size="1.5rem" className="text-muted" />
            </Link>
            <div className="navSearch">
              <BsSearch className="mx-1" size="1.5rem" />
              {/* <input type="text" name="" id="" placeholder="...search" /> */}
              <Form.Control
                value={search}
                type="text"
                placeholder="...search"
                onChange={(e) => {
                  runSearch(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col
            xs="12"
            md="8"
            className="d-flex align-items-center justify-content-end my-1"
          >
            {" "}
            <NavLink
              className="d-flex align-items-center navBtn font-weight-bold"
              exact
              to="/"
              activeClassName="selectedNavb"
            >
              <span className="text-dropdown">Home</span>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
