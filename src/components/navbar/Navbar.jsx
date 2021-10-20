import React from "react";
import { connect } from "react-redux";
import "./style.css";
import { useState } from "react";
import { withRouter } from "react-router";
//
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { addTheName } from "../redux/action/action";
//
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  addName: (company) => {
    dispatch(addTheName(company));
  },
});
//
const Navbar = ({ search, setSearch, addName, history, user }) => {
  const [userName, setuserName] = useState("");
  //
  const runSearch = (val) => {
    setSearch(val);
    if (val & (val !== "undefined") || val !== "") {
      val.length > 2 && history.push("/search");
    } else {
      history.push("/");
    }
  };
  //
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
              className="d-flex align-items-center navBtn font-weight-bold mr-2"
              exact
              to="/"
              activeClassName="selectedNavb"
            >
              <span className="text-dropdown">Home</span>
            </NavLink>
            {!user?.name ? (
              <FormControl
                className="nameInput"
                placeholder="...your name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addName(userName)}
              />
            ) : (
              <>
                {" "}
                <NavLink
                  className="d-flex align-items-center navBtn font-weight-bold mr-2"
                  exact
                  to="/favorites"
                  activeClassName="selectedNavb"
                >
                  <span className="text-dropdown">Favorites</span>
                </NavLink>
                <div className="navBtn profileName d-flex align-items-center">
                  <h5 className="my-0">{user.name}</h5>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
