import React, { useState, useEffect } from 'react';
import './App.css';

import ListEdit from './components/ListEdit';
import ListView from './components/ListView';

import { read, write } from './fileread';

function App() {
  const [ appState, setAppState ] = useState(0);
  const [ toDoList, setToDoList ] = useState([]);

  const updateList = (newListArray) => {
    setToDoList(newListArray);
    write(newListArray);
  }

  useEffect( () => {
    read((result) => {
      setToDoList(result);
    });
    
  }, []);

  return (
    <div className="body">
      <header>
        <div className="wrapper">
          <h1>FTD</h1>
        </div>
      </header>
      <main>
        <div className="wrapper">
          { 
            appState === 0
              ? <ListView list = {toDoList} confirmChanges={(newList) => { updateList(newList) }} changeView={() => setAppState(1)} />
              : <ListEdit list = {toDoList} confirmChanges={(newList) => { setAppState(0); updateList(newList); }} cancelChanges={() => setAppState(0)} />
          }
        </div>
      </main>
    </div>
  );
}

export default App;
