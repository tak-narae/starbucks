import React from 'react';

const Store = () => {
  // const [sidoList, setSidoList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSidoList = async () => {
  //     try {
  //       const response = await fetch('https://www.starbucks.co.kr/store/store_drive.do', {
  //         method: 'POST',
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setSidoList(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSidoList();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div id="container">
      {/* <h1>Starbucks Store Sido List</h1>
      <ul>
        {sidoList.map((sido, index) => (
          <li key={index}>{sido}</li> // Display the items in a list
        ))}
      </ul> */}
    </div>
  );
};


export default Store;