import React, {useState,useEffect} from 'react';
import './App.css';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function App() {
  const [meals, setMeals] = useState([]);
  const [neww,setNeww] = useState(true);
  const newwHandler = () => setNeww(!neww);

  const mealEffectHandler = (meal) => setMeals([meal]);
  useEffect(()=>{
    axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(res => {
        mealEffectHandler(res.data.meals[0]);
        // console.log(res.data.meals[0])
      })
  },[neww])

  return (
    <div className="App">
      <div className="main">
        <h1 className="head">Agnibesh's Random Recipe?</h1>
        <button className="loadmeal" onClick={newwHandler}>Load new Meal</button>
        <ul>
          {meals.map((meal)=>{
            let para = meal.strInstructions.split("↵");
            let finpara = para[0].split("↵↵");
            return(
              <li key={uuidv4()}>
            <h1>{meal.strMeal}</h1><a href={meal.strYoutube}>yt</a>
            <hr/>
            <p>{para}</p>
          </li>
            )
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
