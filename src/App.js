import React, { useState, useEffect } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { IconContext } from "react-icons";
import { FaYoutube } from "react-icons/fa";

function App() {
  const [meals, setMeals] = useState([]);
  const [neww, setNeww] = useState(true);
  const newwHandler = () => setNeww(!neww);

  const mealEffectHandler = (meal) => setMeals([meal]);
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => {
        mealEffectHandler(res.data.meals[0]);
        // console.log(res.data.meals[0])
      });
  }, [neww]);

  return (
    <div className="App">
      <div className="main">
        <h1 className="head">Agnibesh's Random Recipe?</h1>
        <button className="loadmeal" onClick={newwHandler}>
          Load new Meal
        </button>
        {/* RECIPE */}
        <ul>
          {meals.map((meal) => {
            return (
              <li key={uuidv4()}>
                <IconContext.Provider
                  value={{
                    size: "2rem",
                    color: "red",
                    style: { margin: "0rem 1.5rem 0rem",paddingTop:"1rem" },
                  }}
                >
                  <h1>
                    {meal.strMeal}
                    <a href={meal.strYoutube}>
                      <FaYoutube />
                    </a>
                  </h1>
                </IconContext.Provider>
                <hr />
                {meal.strInstructions
                  .toString()
                  .split("\n")
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </li>
            );
          })}
        </ul>
      </div>
      <footer>
        <a href="https://www.agnibesh.dev">© Agnibesh Mukherjee 2020</a>
      </footer>
    </div>
  );
}

export default App;
