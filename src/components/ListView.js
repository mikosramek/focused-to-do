import React from 'react';


function ListView(props) {


  const deepCopyObjectArray = (objectToCopy) => {
    const a = {};
    for(let key in objectToCopy){
      a[key] = objectToCopy[key];
    }
    return a;
  }
  const confirmChanges = (index) => {
    const a = props.list.map((e) => {return deepCopyObjectArray(e)});
    a[index].complete = !a[index].complete;
    props.confirmChanges(a);
  }
  
  let sortedList = [];

  if(props.list !== undefined){
    sortedList = props.list.sort((a, b) => {return (a.priority < b.priority ? -1 : 1)})
  }

  return(
    <div>
      <h2>Your next task:</h2>
      <ul>
        {
          sortedList.length > 0
            ? sortedList.map( (listItem, index) => {
                return <li key={index} className={`task ${listItem.complete ? 'completed' : ''}`} onClick={() => confirmChanges(index)}>{index+1}: {listItem.task}</li>
              })
            : <p>Edit your list!</p>
        }
      </ul>
      <button onClick={props.changeView}>Edit your list</button>
    </div>
  );
}

export default ListView;