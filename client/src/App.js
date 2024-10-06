import React, { Fragment } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Tabs from "./components/Tabs";
// import Input from "./components/Input";
// import List from "./components/List";
// import CharacterSprite from "./components/CharacterSprite";
// import UserProfilePage from "./components/UserProfilePage";


function App() {
  return (
    <Fragment>
      <div className="horizontal-scroll">
        <Tabs/>
      </div>
    </Fragment>
    // <Router>
    //   <Fragment>
    //     <div className="horizontal-scroll">
    //       <Routes>
    //         <Route path="/" element={
    //           <div className="container">
    //             <CharacterSprite />
    //             <Input />
    //             <List />
    //           </div>
    //         } />
    //         <Route path="/userProfile" element={<UserProfilePage />} /> {/* Use element prop */}
    //       </Routes>
    //     </div>
    //   </Fragment>
    // </Router>
  );
}

export default App;