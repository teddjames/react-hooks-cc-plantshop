import React, { useState } from "react";

function PlantCard({ name, image, price }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleToggleStock = () => {
    setIsInStock((prev) => !prev);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p> {/* <- Unformatted */}
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
