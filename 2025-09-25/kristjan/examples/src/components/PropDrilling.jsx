import React from "react";
import { useState } from "react";

//Parent
const PropDrilling = () => {
  const [weather, setWeather] = useState(":sun_with_face:");
  return (
    <>
      <button onClick={() => setWeather(weather === "🌞" ? "🌧️" : "🌞")}>
        Toggle and check console
      </button>
      <Europe weather={weather} />
    </>
  );
};

//child of PropDrilling
const Europe = ({ weather }) => {
  console.log("Europe child prop =", weather);
  return <Estonia weather={weather} />;
};

//child of Europe
const Estonia = ({ weather }) => {
  console.log("Estonia child prop =", weather);
  return <Tallinn weather={weather} />;
};

//child of Estonia
const Tallinn = ({ weather }) => {
  console.log("Tallinn child prop =", weather);
  return <div>{weather}</div>;
};

export default PropDrilling;