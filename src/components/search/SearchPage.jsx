import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchBy, setUpPage, cleanUpAct } from "../../redux/action/action";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SearchCard from "./SearchCard";

const SearchPage = ({ setPicked }) => {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  // next prev
  const nextFetch = async () => {
    dispatch(setUpPage(search.page + 1));
  };
  const prevFetch = async () => {
    if (search.page > 0) {
      dispatch(setUpPage(search.page - 1));
    }
  };
  // RENEW
  useEffect(() => {
    dispatch(searchBy());
  }, [search.searchQuery, search.page]);
  //   CLEAN UP
  useEffect(() => {
    return () => {
      dispatch(cleanUpAct());
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

export default SearchPage;
