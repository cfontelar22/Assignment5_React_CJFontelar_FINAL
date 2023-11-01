import React, { useState, useEffect } from "react";
import "../styles.css";
import ApiDetails from "./ApiDetails";
import "mvp.css";

function Jay() {
  const [apiEntry, setApiEntry] = useState(null);
  const [buttonColor, setButtonColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchButtonColor, setSearchButtonColor] = useState("");

  const clearData = () => {
    setApiEntry(null);
    setButtonColor("");
    setSearchTerm("");
    setFilteredCategories([]);
    setSearchButtonColor("");
  };

  const fetchRandomData = () => {
    setButtonColor("");
    setSearchButtonColor("");

    fetch("https://api.publicapis.org/random")
      .then((response) => response.json())
      .then((data) => {
        setApiEntry(data.entries[0]);
      });
  };

  const fetchByCategory = (category) => {
    setButtonColor("");
    setSearchButtonColor("");

    fetch(`https://api.publicapis.org/random?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setApiEntry(data.entries[0]);
      });
  };

  useEffect(() => {
    fetchRandomData();
  }, []);

  const apiCategories = [
    "Business",
    "Science & Math",
    "Health",
    "Music",
    "Weather",
    "Technology",
    "Food & Drink",
    "Animals",
    "Sports & Fitness",
    "Books",
    "Games",
    "Movies"
  ];

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = apiCategories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
      setSearchButtonColor("button-clicked");
    } else {
      setFilteredCategories([]);
      setSearchButtonColor("");
    }
  };

  const handleButtonClick = () => {
    setButtonColor((prevColor) => (prevColor === "teal" ? "red" : "teal"));
    fetchRandomData();
  };

  return (
    <div className="title">
      <h1>RANDOM API ENTRY</h1>
      <ApiDetails apiEntry={apiEntry} />

      <div className="button-container">
        <button
          className={`custom-button ${buttonColor}`}
          onClick={handleButtonClick}
        >
          Get Random API
        </button>
        <div>
          <input
            type="text"
            placeholder="Search Categories"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`custom-button search-button ${searchButtonColor}`}
            onClick={handleSearch}
          >
            Search Categories
          </button>
        </div>
        <div>
          {apiCategories.map((category) => (
            <button
              className={`custom-button ${
                filteredCategories.includes(category) ? "button-clicked" : ""
              }`}
              key={category}
              onClick={() => fetchByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="custom-button clear-button" onClick={clearData}>
          Clear Data
        </button>
      </div>
    </div>
  );
}

export default Jay;
