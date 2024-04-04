import React from "react";
import styles from "./Card.module.scss";
import CountUp from "react-countup";

export function Card({ card, index }) {
  return (
    <div
      className={`col-md-4 p-0 ${!index ? "" : "ms-3"} ${styles.cardWrapper}`}
    >
      <div
        className={`h-100 card shadow rounded ${styles.card} ${
          styles[`card-${index}`]
        }`}
      >
        <div className="card-body d-flex flex-row p-0">
          <span className="card-title align-self-center m-0 ps-3">
            {card.title}
          </span>
          <span className="card-text align-self-center me-2 ms-auto fs-4">
            <CountUp end={card.text} duration={2} separator="," />
          </span>
          <span className={`align-self-center fs-4 ${styles.person}`}>人</span>
        </div>
      </div>
    </div>
  );
}
