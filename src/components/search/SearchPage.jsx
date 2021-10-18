import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SearchCard from "./SearchCard";
import "./style.css";
import { useLocation } from "react-router-dom";

export default function SearchPage({ searchQuery, setSearch, setPicked }) {
  const [SearchData, setSearchData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Page, setPage] = useState(0);
  const params = useLocation();
  // URL checker
  const urlCheck = (query) => {
    // console.log(query);
    const params = new URLSearchParams(window.location.search);
    let skip = Page * 8;
    let title = query ? `&title=${query}` : "";
    let company = params.has("company")
      ? `&company=${params.get("company")}`
      : "";
    let category = params.has("category")
      ? `&category=${params.get("category")}`
      : "";
    //
    let url = `${process.env.REACT_APP_URLFETCH}/jobs?limit=8&skip=${skip}${title}${company}${category}
    `;
    return url;
  };
  // FETCH
  const searchFetch = async (query) => {
    let url = urlCheck(query);
    setLoading(true);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSearchData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  const nextFetch = async () => {
    setPage(Page + 1);
  };
  const prevFetch = async () => {
    if (Page > 0) {
      setPage(Page - 1);
    }
  };
  // renew
  // useEffect(() => {
  //   console.log(searchQuery);
  //   urlCheck(searchQuery);
  // }, [searchQuery]);
  useEffect(() => {
    searchFetch(searchQuery);
  }, [searchQuery, Page]);
  //   clean
  useEffect(() => {
    return () => {
      setSearch("");
      setPage(0);
    };
  }, []);
  return (
    <Container className="w-100">
      <br />
      <div className="p-2 text-muted d-flex justify-content-between">
        <h4>...search by: {searchQuery}</h4>
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
        {Loading ? (
          <Col xs="12 text-center">
            <Spinner animation="border" />
          </Col>
        ) : (
          <>
            {SearchData?.data &&
              SearchData.data.map((cart) => (
                <SearchCard data={cart} key={cart._id} setPicked={setPicked} />
              ))}
          </>
        )}
      </Row>
    </Container>
  );
}
