import React from "react";

export default ({ loading }) => (
  <div className="loading-bar">
    {loading ? <div className="loading active" /> : null}
  </div>
);
