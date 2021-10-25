import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Container, Row, Col } from "react-bootstrap";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
  addFavJob,
  addTheName,
  addToFavorite,
  deleteFavJob,
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
  const curentData =
    sData.filter((x) => x._id === id)[0] ||
    user.favoriteJobs.filter((x) => x._id === id)[0];
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
        {curentData?.title && (
          <Row>
            <Col xs="12" md="4">
              <img
                src={curentData.url}
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
                  <h4>{curentData.title}</h4>
                  <small className="text-muted">
                    published:{" "}
                    <span className="text-dark">
                      {dateFormat(curentData.publication_date, "mmm d, yyyy")}
                    </span>
                  </small>
                </div>
                <div className="d-flex justify-content-between">
                  <h5>
                    {" "}
                    <small className="text-muted d-flex">
                      company:{" "}
                      <Link
                        to={`/search?company=${curentData.company_name}`}
                        onClick={() =>
                          dispatch(
                            setSearch({
                              type: "company",
                              query: curentData.company_name,
                            })
                          )
                        }
                      >
                        <span className="link linkClr mr-1">
                          {curentData.company_name}
                        </span>
                      </Link>
                      {user?.name &&
                        (!user.favorites.some(
                          (c) => c === curentData.company_name
                        ) ? (
                          <div
                            className="bookmark"
                            // value={data.company_name})
                            onClick={(e) =>
                              dispatch(addToFavorite(curentData.company_name))
                            }
                          >
                            <BsBookmark />
                          </div>
                        ) : (
                          <div
                            className="bookmark"
                            // value={data.company_name})
                            onClick={(e) =>
                              dispatch(
                                deleteOfFavorite(curentData.company_name)
                              )
                            }
                          >
                            <BsBookmarkFill />
                          </div>
                        ))}
                    </small>{" "}
                  </h5>
                  <div>
                    {user?.name &&
                      (!user.favoriteJobs.some(
                        (c) => c.company_name === curentData.company_name
                      ) ? (
                        <div
                          className="bookmark"
                          // value={data.company_name})
                          onClick={(e) => dispatch(addFavJob(curentData))}
                        >
                          <BsBookmark size="1.4rem" />
                        </div>
                      ) : (
                        <div
                          className="bookmark"
                          onClick={(e) => dispatch(deleteFavJob(curentData))}
                        >
                          <BsBookmarkFill size="1.4rem" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center detailBox mb-2">
                <span>
                  <small className="text-muted">type: </small>{" "}
                  {curentData.job_type}
                </span>
                <span>
                  <small className="text-muted">category: </small>{" "}
                  <Link
                    to={`/search?category=${curentData.category}`}
                    onClick={() =>
                      dispatch(
                        setSearch({
                          type: "category",
                          query: curentData.category,
                        })
                      )
                    }
                  >
                    {" "}
                    <span className="link linkClr">{curentData.category}</span>
                  </Link>
                </span>
                <span>
                  <small className="text-muted">location: </small>
                  {curentData.candidate_required_location}
                </span>
              </div>

              <div className="detailBox">
                <small
                  dangerouslySetInnerHTML={{ __html: curentData.description }}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Details;
