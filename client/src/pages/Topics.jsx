import React, { useEffect } from "react";
import styles from "./Topics.module.scss";
import { setTopicsData } from "../stores/actions/topicsActions";
import { useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../components/common/PagesTitle";
import { apiGetCall } from "../utils/apiUtil";
import { TOPICS_ENDPOINT } from "../constants/apiUrlConst";

export const Topics = () => {
  const topicsData = useSelector((state) => state.topics.topicsData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiGetCall(TOPICS_ENDPOINT);
        const data = res.data.topics;
        dispatch(setTopicsData(data));
      } catch (error) {
        // Error is handled by the interceptor
        return;
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="row flex-nowrap m-0">
      <main className="col p-0">
        <PageTitle title="トピックス" mbClassName={"mb-4"} />

        <div className="accordion px-3 py-0" id="accordion">
          {topicsData &&
            topicsData.map((topic, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className={`accordion-button collapsed`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded={true}
                    aria-controls={`collapse-${index}`}
                  >
                    <span>{topic.published_date}</span>
                    <span className="ms-3">{topic.title}</span>
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="collapse"
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#accordion"
                >
                  <div className={`accordion-body ${styles.accordionBody}`}>
                    {topic.contents}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};
