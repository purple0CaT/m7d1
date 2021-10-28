import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  deleteFavJob,
  deleteOfFavorite,
  setSearch,
} from "../../redux/action/action";
import { BiTrashAlt } from "react-icons/bi";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ReduxStore } from "../../types/types";
interface Types extends RouteComponentProps {}

function Favorites({ history }: Types) {
  const user = useSelector((state: ReduxStore) => state.user);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    // console.log(user.favorites);
    !user.name && history.push("/");
  }, []);
  return (
    <Container>
      <br />
      <h4 className="text-muted">...favorites:</h4>
      <Row className="mt-3">
        <Col xs="12" md="4">
          <h4 className="text-center text-muted">Company:</h4>
          {user.favorites?.length > 0 ? (
            user.favorites.map((f, i) => (
              // <Col xs="12" md="3" className="my-1" key={f._id + f.company_name}>
              <div
                className="favoriteCard d-flex justify-content-between my-1"
                key={i + f}
              >
                <Link
                  to={`/search?company=${f}`}
                  className="link"
                  onClick={() => {
                    dispatch(setSearch({ type: "company", query: f }));
                  }}
                >
                  <div>
                    <h6 className="m-0">
                      <small> company: </small> {f}
                    </h6>
                  </div>
                </Link>
                <BiTrashAlt
                  className="delete"
                  onClick={() => dispatch(deleteOfFavorite(f))}
                />
              </div>
              // </Col>
            ))
          ) : (
            <Col xs="12" className="text-center text-muted">
              {" "}
              <h4>No company saved</h4>
            </Col>
          )}
        </Col>
        <Col xs="12" md="4">
          <h4 className="text-center text-muted"> Jobs:</h4>{" "}
          {user.favoriteJobs?.length > 0 ? (
            user.favoriteJobs.map((f) => (
              <div className="my-1" key={f._id + f.company_name}>
                <div className="favoriteCard d-flex justify-content-between">
                  <Link
                    to={`/company-detail/${f._id}`}
                    className="link"
                    onClick={() => {
                      dispatch(
                        setSearch({ type: "company", query: f.company_name })
                      );
                    }}
                  >
                    <div>
                      <h6 className="m-0">{f.title}</h6>
                    </div>
                  </Link>
                  <BiTrashAlt
                    className="delete"
                    onClick={() => dispatch(deleteFavJob(f))}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              {" "}
              <h4>No jobs saved</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Favorites);
