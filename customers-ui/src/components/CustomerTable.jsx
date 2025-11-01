import React from "react";

const CustomerTable = ({
  data,
  visibleRows,
  sortKey,
  sortDir,
  handleSort,
  visibleCount,
  totalAvailable,
  query,
}) => {
  return (
    <div className="table-container">
      <table className="customers-table">
        <thead>
          <tr>
            {["id", "name", "email", "phone", "score", "addedBy"].map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="sticky"
                style={{ cursor: "pointer" }}
              >
                {key.toUpperCase()}{" "}
                {sortKey === key ? (sortDir === 1 ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data === null && (
            <tr className="loading-row">
              <td colSpan="6">Generating 1M records... please wait</td>
            </tr>
          )}

          {data && visibleRows.length === 0 && (
            <tr>
              <td colSpan="6">No results</td>
            </tr>
          )}

          {visibleRows.map((row) => (
            <tr key={row.id} className="row">
              <td>{row.id}</td>
              <td className="name-cell">
                <div className="avatar">{row.avatar}</div>
                <div>
                  <div className="name">{row.name}</div>
                  <div className="sub">
                    Last: {new Date(row.lastMessageAt).toLocaleString()}
                  </div>
                </div>
              </td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.score}</td>
              <td>{row.addedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        Showing {visibleCount} of {totalAvailable}{" "}
        {query ? "(filtered)" : "(total)"}
      </div>
    </div>
  );
};

export default CustomerTable;
