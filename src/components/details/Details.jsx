import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import "./style.css";

export default function Details({ data, setPicked }) {
  const [prodDetail, setprodDetail] = useState([]);
  let { id } = useParams();

  //
  const fetchDetails = async (val) => {
    const url = `${process.env.REACT_APP_URLFETCH}/${val}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    console.log(data);

    // fetchDetails(id);
  }, []);
  useEffect(() => {
    return () => {
      setPicked(null);
    };
  }, []);
  return (
    <>
      <br />
      <Container>
        {data?.title && (
          <Row>
            <Col xs="12" md="4">
              <img
                src={data.url}
                alt=""
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  backgroundImage:
                    "url(https://cld-jeans.com/static/backgrounds/default-img.jpg)",
                  objectFit: "cover",
                }}
              />{" "}
            </Col>
            <Col xs="12" md="8" className="d-flex flex-column">
              <div className="detailBox mb-2">
                <div className="d-flex justify-content-between">
                  <h4>{data.title}</h4>
                  <small className="text-muted">
                    published:{" "}
                    <span className="text-dark">
                      {dateFormat(data.publication_date, "mmm d, yyyy")}
                    </span>
                  </small>
                </div>
                <h5>
                  <Link to={`/search/${data.company_name}`}>
                    {" "}
                    <small className="text-muted">
                      company: {data.company_name}
                    </small>{" "}
                  </Link>
                </h5>
              </div>
              <div className="d-flex justify-content-between align-items-center detailBox mb-2">
                <p>
                  <small className="text-muted">type: </small> {data.job_type}
                </p>
                <p>
                  <small className="text-muted">category: </small>{" "}
                  {data.category}
                </p>
                <p>
                  <small className="text-muted">location: </small>
                  {data.candidate_required_location}
                </p>
              </div>

              <div className="detailBox">
                <small dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
