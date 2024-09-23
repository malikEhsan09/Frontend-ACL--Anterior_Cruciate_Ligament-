// import React from "react";
// import notFound from "../../../../public/assets/not-found.svg";
// // import 404 from "../../../../public/assets/404.gif";
// import Image from "next/Image";

// const NotFound = () => {
//   return (
//     <div>
//       <Image src={notFound} alt="notfound" width={12} />
//     </div>
//   );
// };

// export default NotFound;

import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
