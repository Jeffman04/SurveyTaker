import React from "react";
import Survey from "./pages/mainpage";
import SurveyDetails from "./pages/surveydetails";
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Survey}/>
        <Route path="/surveydetails" Component={SurveyDetails}/>
      </Routes>     
    </Router>
  );
}

export default App;
