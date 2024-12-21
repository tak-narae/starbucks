import React from 'react';

import { Link } from 'react-router-dom';

const PrdList = () => {
  return (
    <>
      <ul className="prd_list">
        <li><Link to="/">상품1</Link></li>
        <li><Link to="/">상품2</Link></li>
        <li><Link to="/">상품3</Link></li>
        <li><Link to="/">상품4</Link></li>
        <li><Link to="/">상품5</Link></li>
        <li><Link to="/">상품6</Link></li>
        <li><Link to="/">상품7</Link></li>
        <li><Link to="/">상품8</Link></li>
      </ul>
    </>
  );
};

export default PrdList;