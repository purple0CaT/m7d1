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
    // console.log(data);

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
                  {" "}
                  <small className="text-muted">
                    company:{" "}
                    <Link
                      to={`/search?company=${data.company_name}`}
                      className="link linkClr"
                    >
                      <span>{data.company_name}</span>
                    </Link>
                  </small>{" "}
                </h5>
              </div>
              <div className="d-flex justify-content-between align-items-center detailBox mb-2">
                <span>
                  <small className="text-muted">type: </small> {data.job_type}
                </span>
                <span>
                  <small className="text-muted">category: </small>{" "}
                  <Link to={`/search?category=${data.category}`}>
                    {" "}
                    <span className="link linkClr">{data.category}</span>
                  </Link>
                </span>
                <span>
                  <small className="text-muted">location: </small>
                  {data.candidate_required_location}
                </span>
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
