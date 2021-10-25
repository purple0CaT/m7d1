import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteOfFavorite, setSearch } from "../../redux/action/action";
import { BiTrashAlt } from "react-icons/bi";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// const mapStateToProps = (state) => ({ user: state.user });
// const mapDispatchToProps = (dispatch) => ({
//   deleteFavorite: (company) => {
//     dispatch(deleteOfFavorite(company));
//   },
//   setSearchIt: (query) => {
//     dispatch(setSearch(query));
//   },
// });
function Favorites({ history }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    !user.name && history.push("/");
  }, []);
  return (
    <Container>
      <br />
      <h4 className="text-muted">...favorites:</h4>
      <Row className="mt-3 flex-column">
        {user.favorites.length > 0 ? (
          user.favorites.map((f) => (
            <Col xs="12" md="3" className="my-1">
              <div className="favoriteCard d-flex justify-content-between">
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
            </Col>
          ))
        ) : (
          <Col xs="12" className="text-center text-muted">
            {" "}
            <h4>No favorites</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default withRouter(Favorites);
