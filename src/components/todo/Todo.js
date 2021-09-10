import React, {useState} from 'react';
import TodoList from "./TodoList";
import './style.css';
const Todo = () =>{
    const [data , setData] =  useState(["go to work" , "go to school" , "go to car"]);
    const [task , setAddTask] = useState("")
    const submitTask =()=>{
        if(!task) return
        setData((currentDta)=>{
        return [...currentDta , task];
        })
        setAddTask("");
    }
    const changeTask =(e)=>{
        setAddTask(e.target.value);
    }
    return(
        <div  className={"container"}>
            <h1>project Todo List</h1>
            <input onChange={changeTask} value={task}/>
            <button onClick={submitTask}>ok</button>
            <TodoList data={data}/>
        </div>
    )
}
export default Todo;