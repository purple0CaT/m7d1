import "./style.css";
import React from "react";
import { useState } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addTheName, setSearch } from "../../redux/action/action";
import OutsideClickHandler from "react-outside-click-handler";

//
import {
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import NavProf from "./NavProf";
//

const Navbar = ({ history }) => {
  const [userName, setuserName] = useState("");
  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  //
  const [DropDown, setDropDown] = useState(false);
  const closeDropdown = () => setDropDown(false);

  //
  const runSearch = async (val) => {
    dispatch(setSearch({ query: val, type: "title" }));
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
            <Link to="/" className="mr-3 navIcon">
              <AiFillHome size="1.8rem" className="" />
            </Link>
            <div className="navSearch">
              <BsSearch className="mx-1" size="1.5rem" />
              {/* <input type="text" name="" id="" placeholder="...search" /> */}
              <Form.Control
                value={search.searchQuery}
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
                onKeyPress={(e) =>
                  e.key === "Enter" && dispatch(addTheName(userName))
                }
              />
            ) : (
              <>
                <div className="separator mr-2"> </div>

                {/*  */}
                <div className="position-relative">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setDropDown(false);
                    }}
                  >
                    <div
                      className="navBtn profileName d-flex align-items-center mr-2"
                      onClick={() => setDropDown(!DropDown)}
                      onMouseEnter={() => setDropDown(!DropDown)}
                      onMouseOver={() => setDropDown(true)}
                    >
                      <h5 className="my-0">{user.name}</h5>{" "}
                    </div>
                    {DropDown && (
                      <NavProf
                        closeDropdown={closeDropdown}
                        style={{ transition: "ease-in" }}
                      />
                    )}
                  </OutsideClickHandler>
                </div>
                {/*  */}
                {/* <DropdownButton
                  menuAlign="right"
                  title={user.name}
                  id="dropdown-menu-align-right"
                  className="profileName"
                >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                </DropdownButton> */}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Navbar);
