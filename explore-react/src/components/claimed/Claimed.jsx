import react, { useState, useEffect, useMemo } from "react";

const ClaimItem = ({ name, img, category }) => {
  const [times, setTimes] = useState(null);

  return (
    <div>
      <a>{name}</a> <br />
      <a>{img}</a> <br />
      <a>{category}</a> <br />
      <a>{category}</a> <br />
      <br />
    </div>
  );
};

const Claimed = ({ data }) => {
  return (
    <>
      {data.map((obj) => (
        <ClaimItem
          key={obj.id}
          name={obj.name}
          img={obj.image_url}
          category={obj.category}
          countdown={obj.countdown}
        />
      ))}
    </>
  );
};

export default Claimed;
