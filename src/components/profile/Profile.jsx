import "./style.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../redux/action/action";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

function Profile({ history }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //
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
            <h5 className="text-muted m-0">
              User Name: <span className="text-dark">{user.name}</span>
            </h5>{" "}
            {user.favorites.length > 0 && (
              <h6 className="text-muted m-0 mt-2">
                Fav. companies:{" "}
                {user.favorites.map((c) => (
                  <Link
                    className="link"
                    to={`/search?company=${c}`}
                    className="text-dark"
                    onClick={() =>
                      dispatch(setSearch({ type: "company", query: c }))
                    }
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

export default withRouter(Profile);
