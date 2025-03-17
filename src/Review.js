import React from "react";
import Resize from "./Resize";

const Review = (props) => {
  const isPortrait = Resize();

  return (
    <div className={isPortrait ? "review-card" : "review-card mobile"}>
      <div className={isPortrait ? "review-content" : "review-content mobile"}>
        <div style={{ padding: "0 20px 0 30px" }}>
          <div
            style={{
              display: "flex",
              placeItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: isPortrait ? "" : "7vw" }}>{props.name}</h2>
            <a
              className="link"
              href={props.link}
              target="_blank"
              rel="noreferrer"
            >
              <p className="telegram-icon"></p>
              <p className="array-corner-icon"></p>
            </a>
          </div>
          <p className={isPortrait ? "review" : "review mobile"}>
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
