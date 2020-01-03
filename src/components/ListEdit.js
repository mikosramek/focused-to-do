import React, { useState, useEffect } from 'react';


function ListEdit(props) {
  const [ tempList, setTempList ] = useState([]);

  const [ newTask, setNewTask ] = useState('');
  const [ newPriority, setNewPriority ] = useState(0);

  const deepCopyObjectArray = (objectToCopy) => {
    const a = {};
    for(let key in objectToCopy){
      a[key] = objectToCopy[key];
    }
    return a;
  }
  
  const confirmChanges = () => {
    props.confirmChanges(tempList);
  }
  const cancelChanges = () => {
    props.cancelChanges();
  }
  const updateTempList = (value, index, property) => {
    const a = tempList.map((e) => {return deepCopyObjectArray(e)});
    a[index][property] = value;
    setTempList(a);
  }

  const addNewListItem = () => {
    const a = [...tempList];
    a.push({task: newTask, priority: newPriority});
    setTempList(a);
    setNewTask('');
    setNewPriority(newPriority+1);
  }
  const removeListItem = (index) => {
    const a = [...tempList];
    a.splice(index, 1);
    setTempList(a);
  }

  const toggleItemAsComplete = (index) => {
    const a = tempList.map((e) => {return deepCopyObjectArray(e)});
    a[index].complete = !a[index].complete;
    setTempList(a);
  }

  const completeAllTasks = () => {
    const a = tempList.map((e) => {return deepCopyObjectArray(e)});
    setTempList(a.map((item) => { item.complete = true; return item; }));
  }
  const uncompleteAllTasks = () => {
    const a = tempList.map((e) => {return deepCopyObjectArray(e)});
    setTempList(a.map((item) => { item.complete = false; return item; }));
  }
  const removeCompleteTasks = () => {
    const a = tempList.map((e) => {return deepCopyObjectArray(e)});
    setTempList(
      a.filter((task) => { return !task.complete })
    )
  }

  useEffect( () => {
    setTempList(props.list.map((e) => {return deepCopyObjectArray(e)}));
  }, [props.list]);

  const clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  return(
    <div>
      <h2>Edit Your List:</h2>
      <ul className="editList">
        {
          tempList.map( (listItem, index) => {
            return (
              <li key={index}>
                <input type="number" value={clamp(listItem.priority, 0, 99)} onChange={(e) => updateTempList(e.target.value, index, "priority")} />
                <input type="text" value={listItem.task} onChange={(e) => updateTempList(e.target.value, index, "task")} />
                <input type="checkbox" name="completed" checked={listItem.complete} onChange={() => toggleItemAsComplete(index)} />
                <button onClick={() => removeListItem(index)}>Remove Task</button>
              </li>
            )
          })
        }
        <li className="newTask">
          <h3>New Task:</h3>
          <input type="number" value={newPriority} onChange={(e) => {setNewPriority(clamp(e.target.value, 0, 99))}} max={99} />
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => {setNewTask(e.target.value)}} 
            placeholder="new task" 
            onKeyDown={(e) => {if(e.key === 'Enter')addNewListItem()}} />
          <button onClick={addNewListItem}>Add Task</button>
        </li>
      </ul>
      <button onClick={confirmChanges} className="saveButton">Save Changes</button>
      <button onClick={cancelChanges}>Discard Changes</button>
      <button onClick={completeAllTasks}>Complete all Tasks</button>
      <button onClick={uncompleteAllTasks}>Uncomplete all Tasks</button>
      <button onClick={removeCompleteTasks}>Clear Complete Tasks</button>
    </div>
  );
}

export default ListEdit;