import React from 'react';
import Task from './Task'

const TodoList = ({data})=>{
    return(
        <div>
            {data.map(task => <Task task={task}/>)}
        </div>
    );
}

export default TodoList;