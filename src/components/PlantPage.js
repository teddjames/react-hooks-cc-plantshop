import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlants(data);
        } else {
          console.error("Expected array but got:", data);
          setPlants([]); // fallback
        }
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants((prev) => [...prev, newPlant]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleStock = (name) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.name === name ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
