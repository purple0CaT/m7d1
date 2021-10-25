import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Container, Row, Col } from "react-bootstrap";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
  addToFavorite,
  deleteOfFavorite,
  setSearch,
} from "../../redux/action/action";
// JSX
const Details = ({ setPicked }) => {
  // CONST
  const user = useSelector((state) => state.user);
  const sData = useSelector((state) => state.search.data.data);
  const dispatch = useDispatch();
  let { id } = useParams();
  // DATA
  const data = sData.filter((x) => x._id === id)[0];
  // RENEW
  useEffect(() => {
    console.log(sData.filter((x) => x._id === id));
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
                  <small className="text-muted d-flex">
                    company:{" "}
                    <Link
                      to={`/search?company=${data.company_name}`}
                      className="link linkClr mr-1"
                      onClick={() =>
                        dispatch(
                          setSearch({
                            type: "company",
                            query: data.company_name,
                          })
                        )
                      }
                    >
                      <span>{data.company_name}</span>
                    </Link>
                    {user?.name &&
                      (!user.favorites.some((c) => c === data.company_name) ? (
                        <div
                          className="bookmark"
                          // value={data.company_name})
                          onClick={(e) =>
                            dispatch(addToFavorite(data.company_name))
                          }
                        >
                          <BsBookmark />
                        </div>
                      ) : (
                        <div
                          className="bookmark"
                          // value={data.company_name})
                          onClick={(e) =>
                            dispatch(deleteOfFavorite(data.company_name))
                          }
                        >
                          <BsBookmarkFill />
                        </div>
                      ))}
                  </small>{" "}
                </h5>
              </div>
              <div className="d-flex justify-content-between align-items-center detailBox mb-2">
                <span>
                  <small className="text-muted">type: </small> {data.job_type}
                </span>
                <span>
                  <small className="text-muted">category: </small>{" "}
                  <Link
                    to={`/search?category=${data.category}`}
                    onClick={() =>
                      dispatch(
                        setSearch({ type: "category", query: data.category })
                      )
                    }
                  >
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
};

export default Details;
