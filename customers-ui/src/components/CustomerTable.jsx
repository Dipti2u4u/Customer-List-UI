import React from "react";
import "../styles/styles.css";
import MyProfile from "../images/Myprofile.jpeg";

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
            <th>
              <input type="checkbox" />
            </th>
            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Customer {sortKey === "name" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th
              onClick={() => handleSort("email")}
              style={{ cursor: "pointer" }}
            >
              Email {sortKey === "email" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
            <th style={{ cursor: "default" }}>Last Message Sent At</th>
            <th
              onClick={() => handleSort("addedBy")}
              style={{ cursor: "pointer" }}
            >
              Add Filters{" "}
              {sortKey === "addedBy" ? (sortDir === 1 ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Loading / Empty states */}
          {data === null && (
            <tr className="loading-row">
              <td colSpan="5">Generating records... please wait</td>
            </tr>
          )}
          {data && visibleRows.length === 0 && (
            <tr>
              <td colSpan="5">No results</td>
            </tr>
          )}

          {/* Data rows */}
          {visibleRows.map((row) => (
            <tr key={row.id} className="row">
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div className="name-cell">
                  <div className="avatar">
                    {/* ✅ Using your image */}
                    <img
                      src={MyProfile}
                      alt="My Profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="customer-info">
                    <span className="name">{row.name}</span>
                    <span className="sub">{row.phone}</span>
                  </div>
                </div>
              </td>
              <td>{row.email}</td>
              <td>{new Date(row.lastMessageAt).toLocaleString()}</td>
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





// import React from "react";
// import "../styles/styles.css";
// import MyProfile from "../images/Myprofile.jpeg"; 
// const CustomerTable = ({
//   data,
//   visibleRows,
//   sortKey,
//   sortDir,
//   handleSort,
//   visibleCount,
//   totalAvailable,
//   query,
// }) => {
//   return (
//     <div className="table-container">
//       <table className="customers-table">
//         <thead>
//           <tr>
//             <th>
//               <input type="checkbox" />
//             </th>
//             <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
//               Customer {sortKey === "name" ? (sortDir === 1 ? "▲" : "▼") : ""}
//             </th>
//             <th onClick={() => handleSort("score")} style={{ cursor: "pointer" }}>
//               Score {sortKey === "score" ? (sortDir === 1 ? "▲" : "▼") : ""}
//             </th>
//             <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
//               Email {sortKey === "email" ? (sortDir === 1 ? "▲" : "▼") : ""}
//             </th>
//             <th style={{ cursor: "default" }}>Last Message Sent At</th>
//             <th onClick={() => handleSort("addedBy")} style={{ cursor: "pointer" }}>
//               Added By {sortKey === "addedBy" ? (sortDir === 1 ? "▲" : "▼") : ""}
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {/* Loading / Empty states */}
//           {data === null && (
//             <tr className="loading-row">
//               <td colSpan="6">Generating records... please wait</td>
//             </tr>
//           )}
//           {data && visibleRows.length === 0 && (
//             <tr>
//               <td colSpan="6">No results</td>
//             </tr>
//           )}

//           {/* Data rows */}
//           {visibleRows.map((row) => (
//             <tr key={row.id} className="row">
//               <td>
//                 <input type="checkbox" />
//               </td>
//               <td>
//                 <div className="name-cell">
//                   <div className="avatar">
//                     {/* ✅ Your own image */}
//                     <img
//                       src={MyProfile}
//                       alt="My Profile"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "50%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                   <div className="customer-info">
//                     <span className="name">{row.name}</span>
//                     <span className="sub">{row.phone}</span>
//                   </div>
//                 </div>
//               </td>
//               <td>{row.score}</td>
//               <td>{row.email}</td>
//               <td>{new Date(row.lastMessageAt).toLocaleString()}</td>
//               <td>{row.addedBy}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="footer">
//         Showing {visibleCount} of {totalAvailable}{" "}
//         {query ? "(filtered)" : "(total)"}
//       </div>
//     </div>
//   );
// };

// export default CustomerTable;


