import s from "./styles.module.scss";
import React from "react";

const TabDocuments = ({ legalDocuments }: { legalDocuments: string[] }) => {
  return <div className={s.tabDocuments}>
    {
      legalDocuments ?
        legalDocuments.map(url => (
          <div key={url}>
            <a href={url} target="_blank">{url}</a>
          </div>
        ))
        : '-'
    }
  </div>;
};

export default TabDocuments;
