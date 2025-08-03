import React, { useEffect, useState } from "react";

const States = () => {
  const [countries, setCountries] = useState([]); // List of countries
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
  const [states, setStates] = useState([]); // List of states for the selected country
  const [selectedState, setSelectedState] = useState(""); // Selected state
  const [cities, setCities] = useState([]); // List of cities for the selected state
  const [selectedCity, setSelectedCity] = useState(""); // Selected city

  useEffect(() => {
    // Fetch list of countries
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((val) => setCountries(val))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    // Reset states and cities when selectedCountry changes
    setStates([]);
    setSelectedState("");
    setCities([]);
    setSelectedCity("");

    // Fetch list of states for the selected country
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((val) => setStates(val))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Reset cities when selectedState changes
    setCities([]);
    setSelectedCity("");

    // Fetch list of cities for the selected state
    if (selectedState && selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
      .then((res) => res.json())
      .then((val) => {
        console.log("Fetched cities:", val);
        setCities(val);
      })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [ selectedState]);

  return (
    <div>
      {/* Country Selector */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Selector */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Selector */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Selection */}
      {selectedCity && selectedState && selectedCountry && (
        <h4>
          You selected {selectedCity} , {selectedState}, {selectedCountry}
        </h4>
      )}
    </div>
  );
};

export default States;
