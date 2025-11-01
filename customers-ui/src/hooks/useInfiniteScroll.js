import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback, ref = null, offset = 150) {
  const isFetching = useRef(false); // prevent multiple triggers

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching.current) return;

      let bottomReached = false;

      if (ref?.current) {
        const el = ref.current;
        bottomReached =
          el.scrollTop + el.clientHeight >= el.scrollHeight - offset;
      } else {
        bottomReached =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - offset;
      }

      if (bottomReached) {
        isFetching.current = true;
        callback();

        // small delay to prevent multiple triggers in one scroll
        setTimeout(() => {
          isFetching.current = false;
        }, 300);
      }
    };

    const target = ref?.current || window;
    target.addEventListener("scroll", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [callback, ref, offset]);
}



// import { useEffect } from "react";

// export default function useInfiniteScroll(callback, ref = null, offset = 150) {
//   useEffect(() => {
//     const handleScroll = () => {
//       let bottomReached = false;

//       if (ref?.current) {
//         const el = ref.current;
//         bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - offset;
//       } else {
//         bottomReached =
//           window.innerHeight + window.scrollY >=
//           document.documentElement.scrollHeight - offset;
//       }

//       if (bottomReached) callback();
//     };

//     const target = ref?.current || window;
//     target.addEventListener("scroll", handleScroll);

//     return () => target.removeEventListener("scroll", handleScroll);
//   }, [callback, ref, offset]);
// }
