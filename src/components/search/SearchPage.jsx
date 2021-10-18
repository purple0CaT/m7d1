import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import SearchCard from "./SearchCard";
import "./style.css";

export default function SearchPage({ searchQuery, setSearch, setPicked }) {
  const [SearchData, setSearchData] = useState([]);
  const [Loading, setLoading] = useState(true);
  // FETCH
  const searchFetch = async (query) => {
    let url = `${process.env.REACT_APP_URLFETCH}/jobs?limit=10&skip=0&search=${query} `;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        await setSearchData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // renew
  useEffect(() => {
    searchFetch(searchQuery);
  }, [searchQuery]);
  //   clean
  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);
  return (
    <Container className="w-100">
      <br />
      <div className="p-2 text-muted">
        <h4>...search by: {searchQuery}</h4>
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
