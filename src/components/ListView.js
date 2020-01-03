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
    sortedList = props.list.filter((a) => { return !a.complete }).sort((a, b) => {return (parseInt(a.priority) > parseInt(b.priority) ? -1 : 1)});
  }
  return(
    <div className="listView">
      <h2>{sortedList.length} tasks left</h2>
      {
        sortedList.length > 0
          ? 
            <div className="currentTask">
              <p> 
                <span className="priority" style={{background: `hsl(${99 - parseInt(sortedList[0].priority)}, 100%, 60%)`, color: `black`}}>{sortedList[0].priority}</span>
                { sortedList[0].task } 
              </p>
              <div className="currentTaskButtons">
                <button onClick={() => confirmChanges(props.list.indexOf(sortedList[0]))}>complete</button>
                <button>skip</button>
              </div>
            </div>
          : 
            <div className="currentTask">
              <p>there's nothing to do</p>
            </div>
      }
      <button onClick={props.changeView} className="editButton">Edit your list</button>
    </div>
  );
}

// sortedList.map( (listItem, index) => {
//   return <li key={index} className={`task ${listItem.complete ? 'completed' : ''}`} onClick={() => confirmChanges(index)}>{index+1}: {listItem.task}</li>
// })

export default ListView;