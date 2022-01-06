import React from "react";
import { SearchKits } from "./features/kitSearch/SearchKits";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Search for Kits</p>
      </header>
      <SearchKits />
    </div>
  );
}

export default App;
