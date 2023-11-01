import React from "react";

function ApiDetails({ apiEntry }) {
  return (
    <div className="api-details">
      {apiEntry && (
        <div>
          <p>
            <b>API Content:</b> {apiEntry.API}
          </p>
          <p>
            <b>Category:</b> {apiEntry.Category}
          </p>
          <p>
            <b>Description:</b> {apiEntry.Description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ApiDetails;
