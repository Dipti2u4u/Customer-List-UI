import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { generateData } from "./utils/generateData";
import useDebounced from "./hooks/useDebounced";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import CustomerTable from "./components/CustomerTable";
import { CheckCheck } from "lucide-react"; // ✅ for double tick icon
import "./styles/styles.css";

const TOTAL = 1000; // ✅ Reduced for now
const PAGE_SIZE = 30;

const App = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 250);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const containerRef = useRef(null);

  // Generate 1000 records
  useEffect(() => {
    const arr = generateData(TOTAL);
    setData(arr);
  }, []);

  // Filtering + Sorting
  const filteredSortedIndices = useMemo(() => {
    if (!data) return null;
    const q = debouncedQuery.trim().toLowerCase();

    let indices = Array.from({ length: data.length }, (_, i) => i);
    if (q) {
      indices = indices.filter((i) => {
        const item = data[i];
        return (
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.phone.includes(q)
        );
      });
    }

    if (sortKey) {
      indices.sort((a, b) => {
        const A = data[a][sortKey];
        const B = data[b][sortKey];
        if (A === B) return 0;
        if (typeof A === "number" && typeof B === "number")
          return (A - B) * sortDir;
        return String(A).localeCompare(String(B)) * sortDir;
      });
    }

    return indices;
  }, [data, debouncedQuery, sortKey, sortDir]);

  const totalAvailable = filteredSortedIndices ? filteredSortedIndices.length : 0;
  const visibleCount = Math.min(loadedCount, totalAvailable);

  const visibleRows = useMemo(() => {
    if (!data || !filteredSortedIndices) return [];
    return filteredSortedIndices.slice(0, visibleCount).map((i) => data[i]);
  }, [data, filteredSortedIndices, visibleCount]);

  // Sort handler
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => -d);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  // ✅ Infinite Scroll
  const loadMore = useCallback(() => {
    setLoadedCount((prev) => {
      if (prev >= totalAvailable) return prev;
      return Math.min(prev + PAGE_SIZE, totalAvailable);
    });
  }, [totalAvailable]);

  useInfiniteScroll(loadMore, containerRef);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight && loadedCount < totalAvailable) {
      loadMore();
    }
  }, [visibleRows, totalAvailable, loadedCount, loadMore]);

  return (
    <div className="app" ref={containerRef}>
      {/* ✅ Top Section */}
      <header className="topbar">
        <div className="title-section">
          <CheckCheck size={22} color="#25D366" style={{ marginRight: "8px" }} />
          <h1>All Customers</h1>
        </div>

        <div className="controls">
          <SearchBar query={query} setQuery={setQuery} />
          <Filters />
        </div>
      </header>

      {/* ✅ Table */}
      <CustomerTable
        data={data}
        visibleRows={visibleRows}
        sortKey={sortKey}
        sortDir={sortDir}
        handleSort={handleSort}
        visibleCount={visibleCount}
        totalAvailable={totalAvailable}
        query={query}
      />
    </div>
  );
};

export default App;



// import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
// import { generateData } from "./utils/generateData";
// import useDebounced from "./hooks/useDebounced";
// import useInfiniteScroll from "./hooks/useInfiniteScroll";
// import SearchBar from "./components/SearchBar";
// import Filters from "./components/Filters";
// import CustomerTable from "./components/CustomerTable";
// import "./styles/styles.css";

// // ✅ Reduced total records for smoother testing
// const TOTAL = 1000;
// const PAGE_SIZE = 30;

// const App = () => {
//   const [data, setData] = useState(null);
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounced(query, 250);
//   const [sortKey, setSortKey] = useState(null);
//   const [sortDir, setSortDir] = useState(1);
//   const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
//   const containerRef = useRef(null);

//   // ✅ Generate 1000 records locally
//   useEffect(() => {
//     const arr = generateData(TOTAL);
//     setData(arr);
//   }, []);

//   // ✅ Filtering + Sorting logic
//   const filteredSortedIndices = useMemo(() => {
//     if (!data) return null;
//     const q = debouncedQuery.trim().toLowerCase();

//     let indices = Array.from({ length: data.length }, (_, i) => i);
//     if (q) {
//       indices = indices.filter((i) => {
//         const item = data[i];
//         return (
//           item.name.toLowerCase().includes(q) ||
//           item.email.toLowerCase().includes(q) ||
//           item.phone.includes(q)
//         );
//       });
//     }

//     if (sortKey) {
//       indices.sort((a, b) => {
//         const A = data[a][sortKey];
//         const B = data[b][sortKey];
//         if (A === B) return 0;
//         if (typeof A === "number" && typeof B === "number")
//           return (A - B) * sortDir;
//         return String(A).localeCompare(String(B)) * sortDir;
//       });
//     }

//     return indices;
//   }, [data, debouncedQuery, sortKey, sortDir]);

//   const totalAvailable = filteredSortedIndices ? filteredSortedIndices.length : 0;
//   const visibleCount = Math.min(loadedCount, totalAvailable);

//   const visibleRows = useMemo(() => {
//     if (!data || !filteredSortedIndices) return [];
//     return filteredSortedIndices.slice(0, visibleCount).map((i) => data[i]);
//   }, [data, filteredSortedIndices, visibleCount]);

//   // ✅ Sorting handler
//   const handleSort = (key) => {
//     if (sortKey === key) setSortDir((d) => -d);
//     else {
//       setSortKey(key);
//       setSortDir(1);
//     }
//   };

//   // ✅ Infinite Scroll with custom hook
//   const loadMore = useCallback(() => {
//     setLoadedCount((prev) => {
//       if (prev >= totalAvailable) return prev;
//       return Math.min(prev + PAGE_SIZE, totalAvailable);
//     });
//   }, [totalAvailable]);

//   useInfiniteScroll(loadMore, containerRef);

//   // ✅ Ensure content fills viewport if data doesn’t overflow
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     if (el.scrollHeight <= el.clientHeight && loadedCount < totalAvailable) {
//       loadMore();
//     }
//   }, [visibleRows, totalAvailable, loadedCount, loadMore]);

//   return (
//     <div className="app" ref={containerRef}>
//       <header className="topbar">
//         <h1>Customers — {TOTAL}</h1>
//         <div className="controls">
//           <SearchBar query={query} setQuery={setQuery} />
//           <Filters />
//         </div>
//       </header>

//       <CustomerTable
//         data={data}
//         visibleRows={visibleRows}
//         sortKey={sortKey}
//         sortDir={sortDir}
//         handleSort={handleSort}
//         visibleCount={visibleCount}
//         totalAvailable={totalAvailable}
//         query={query}
//       />
//     </div>
//   );
// };

// export default App;
