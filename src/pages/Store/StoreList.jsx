// const StoreList = ({ stores }) => {
//   return (
//     <div>
//       <h2>추천 스타벅스 매장</h2>
//       <ul>
//         {stores.map((store) => (
//           <li key={store.place_id}>
//             <strong>{store.name}</strong>
//             <p>{store.vicinity}</p>
//             <p>⭐ {store.rating}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StoreList;

import React from "react";

const StoreList = ({ stores }) => {
  if (!stores || stores.length === 0) {
    return <p>매장이 없습니다.</p>;
  }

  return (
    <ul>
      {stores.map((store, index) => (
        <li key={index}>{store.name}</li>
      ))}
    </ul>
  );
};

export default StoreList;
