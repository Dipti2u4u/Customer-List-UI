// import { useEffect } from "react";

// export default function useInfiniteScroll(callback) {
//   useEffect(() => {
//     const handleScroll = () => {
//       const bottom =
//         window.innerHeight + window.scrollY >=
//         document.documentElement.scrollHeight - 100;

//       if (bottom) {
//         callback();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [callback]);
// }
import { useEffect } from "react";

export default function useInfiniteScroll(callback, ref = null, offset = 150) {
  useEffect(() => {
    const handleScroll = () => {
      let bottomReached = false;

      if (ref?.current) {
        const el = ref.current;
        bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - offset;
      } else {
        bottomReached =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - offset;
      }

      if (bottomReached) callback();
    };

    const target = ref?.current || window;
    target.addEventListener("scroll", handleScroll);

    return () => target.removeEventListener("scroll", handleScroll);
  }, [callback, ref, offset]);
}
