import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SearchCard from "./SearchCard";
import "./style.css";
import { connect } from "react-redux";
import { searchBy, setUpPage, cleanUpAct } from "./../redux/action/action";

const mapStateToProps = (state) => ({
  search: state.search,
});
const mapDispatchToProps = (dispatch) => ({
  searchNow: (query) => {
    dispatch(searchBy(query));
  },
  setPage: (page) => {
    dispatch(setUpPage(page));
  },
  cleanUp: (value) => {
    dispatch(cleanUpAct(value));
  },
});

const SearchPage = ({ search, searchNow, setPage, setPicked, cleanUp }) => {
  const [Loading, setLoading] = useState(false);

  const nextFetch = async () => {
    setPage(search.page + 1);
  };
  const prevFetch = async () => {
    if (search.page > 0) {
      setPage(search.page - 1);
    }
  };
  // RENEW
  useEffect(() => {
    searchNow();
  }, [search.searchQuery, search.page]);
  //   CLEAN UP
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);
  return (
    <Container className="w-100">
      <br />
      <div className="p-2 text-muted d-flex justify-content-between">
        <h4>...search by: {search.searchQuery}</h4>
        <div className="d-flex">
          <div
            className="navBtns d-flex justify-content-center align-items-center mr-2"
            onClick={() => {
              prevFetch();
            }}
          >
            <AiOutlineArrowLeft />
          </div>
          <div
            className="navBtns d-flex justify-content-center align-items-center"
            onClick={() => {
              nextFetch();
            }}
          >
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
      <Row>
        {search.error ? (
          <Alert key={123} variant="danger" className="mx-auto">
            {search.error}{" "}
          </Alert>
        ) : search.loading ? (
          <Col xs="12 text-center">
            <Spinner animation="border" />
          </Col>
        ) : (
          <>
            {search.data.data &&
              search.data.data.map((cart) => (
                <SearchCard data={cart} key={cart._id} setPicked={setPicked} />
              ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
