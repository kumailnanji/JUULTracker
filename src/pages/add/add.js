import React, { useState } from "react";
import { Link } from "react-router-dom";
import pods from "../data.js";
import "./add.css";

import juulTracker from "../../img/JuulTracker.svg";

function Add({ history, podHistory, setPodHistory }) {
  const [chosenFlavour, setChosenFlavour] = useState(null);
  const [chosenPercentage, setChosenPercentage] = useState(null);
  const isValid = chosenFlavour && chosenPercentage;

  // Handle submit button using `setPodHistory` (passed down from App.js)
  const handleSubmit = () => {
    if(!isValid) return;

    const newEntry = {
      flavour: chosenFlavour,
      percentage: chosenPercentage,
      date: new Date()
    };

    // Passes in new entry from submit to setPodHistory function and appends to podHistory
    setPodHistory([newEntry, ...podHistory]);

    // Pushes site to the main page
    history.push("/");
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/">
          <img src={juulTracker} className="juulLogo" alt="juulTracker" />
        </Link>
      </div>

      <div className="addNew pageFade">
        <h1>NEW POD USAGE</h1>
        <div className="pods">
          {pods.map(pod => (
            <img
              src={pod.img}
              className={chosenFlavour === pod.flavour ? "cap chosen" : "cap"}
              onClick={() => setChosenFlavour(pod.flavour)}
              alt="Juul Cap"
            />
          ))}
        </div>

        <div className="percentage">
          <button onClick={() => setChosenPercentage("1.5%")}>1.5%</button>
          <button onClick={() => setChosenPercentage("3%")}>3%</button>
          <button onClick={() => setChosenPercentage("5%")}>5%</button>
        </div>

        <pre>
          {chosenFlavour} {chosenPercentage}
        </pre>

        <button
          className="submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Add;
