import React, { useEffect, useState } from 'react';

const States = () => {
  const [countries, setCountries] = useState([]); // List of countries
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
  const [states, setStates] = useState([]); // List of states for the selected country
  const [selectedState, setSelectedState] = useState(""); // Selected State
  const [city, setCity] = useState([]); 
  const [selectCity,setSelectedCity] = useState("")

  useEffect(() => {
    // Fetch list of countries
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((val) => setCountries(val))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    // Fetch list of states for the selected country when selectedCountry changes
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((val) => setStates(val))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);
  useEffect(() => {
    // Fetch list of states for the selected country when selectedCountry changes
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((val) => setStates(val))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);
  useEffect(() => {
    // Fetch list of states for the selected country when selectedCountry changes
    if (selectedCountry ) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => res.json())
        .then((val) => setCity(val))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry,selectedState]);

  return (
    <div>
        <h2>Select A Location</h2>
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

      <select value={selectedState} onChange={(e)=> setSelectedState(e.target.value)}>
        <option >Select a state</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select value={selectCity} onChange={(e)=> setSelectedCity(e.target.value)}>
        <option>Select a City</option>
        {city.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

            <div>
        {selectCity && selectedCountry && selectedState ? (
            <h4>
            You have selected {selectCity}, {selectedState}, {selectedCountry}
            </h4>
        ) : null}
</div>

    </div>
  );
};

export default States;
