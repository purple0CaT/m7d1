import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { setSearch } from "../redux/action/action";
import "./style.css";
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  setSearchIt: (query) => {
    dispatch(setSearch(query));
  },
});
function Profile({ user, history, setSearchIt }) {
  useEffect(() => {
    !user.name && history.push("/");
  }, []);
  return (
    <Container>
      <br />
      <Row>
        <Col xs="12 text-muted text-center">
          <h4>Hello, {user.name}!</h4>
          <br />
        </Col>
        <Col xs="12" md="4">
          <div className="text-center">
            <img src={user.image} alt="" className="profileImg" />
          </div>
        </Col>
        <Col xs="12" md="8">
          <div className="profileCard">
            {" "}
            <h5 className="text-muted">
              User Name: <span className="text-dark">{user.name}</span>
            </h5>{" "}
            {user.favorites.length > 0 && (
              <h6 className="text-muted">
                Fav. companies:{" "}
                {user.favorites.map((c) => (
                  <Link
                    className="link"
                    to={`/search?company=${c}`}
                    className="text-dark"
                    onClick={() => setSearchIt({ type: "company", query: c })}
                  >
                    {" "}
                    {c},
                  </Link>
                ))}
              </h6>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
