import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const SearchCard = ({ data, setPicked }) => {
  return (
    <Col xs="12" md="3" className="my-1">
      <Link
        to={`/company-detail/${data._id}`}
        className="link"
        onClick={() => setPicked(data)}
      >
        <div className="searchcard">
          <img
            src={data.url}
            alt=""
            style={{
              width: "100%",
              aspectRatio: "2 / 1",
              backgroundImage:
                "url(https://cld-jeans.com/static/backgrounds/default-img.jpg)",
              objectFit: "cover",
            }}
          />
          <div className="px-2 py-1 cardBody d-flex flex-column">
            <div className="text-right">
              <h6 className="text-dark">{data.title}</h6>
            </div>
            {/* LIST P infos */}
            <small className="text-muted">
              Category:{" "}
              <span className="text-dark font-weight-bold">
                {data.category}
              </span>
            </small>
            <small className="text-muted">
              company:{" "}
              <span className="text-dark font-weight-bold">
                {data.company_name}
              </span>
            </small>
            <small className="text-muted">
              Job Type:{" "}
              <span className="text-dark font-weight-bold">
                {data.job_type}
              </span>
            </small>
            <small className="text-muted">
              Location:{" "}
              <span className="text-dark font-weight-bold">
                {data.candidate_required_location}
              </span>
            </small>
            <small>
              {" "}
              <span className="text-muted float-right mt-1">
                {dateFormat(data.publication_date, "mmm d, yyyy")}
              </span>
            </small>
            {/* <div className="searchDesc">
              <small dangerouslySetInnerHTML={{ __html: data.description }} />
            </div> */}
            {/* {data.description} */}
          </div>
        </div>
      </Link>
    </Col>
  );
};
export default SearchCard;
