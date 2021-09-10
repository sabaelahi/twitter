import React, {useState} from 'react';
import './style.css';

const Counter = () =>{
    const [counter , setCounter] = useState(0);
    const inc = () =>{
        setCounter((currentCounter) => {
            return currentCounter+1;
        })
    }
    const dec = () =>{
        setCounter((currentCounter) => {
            return currentCounter-1;
        })
    }
    return (
        <div>
            <h1> math - increment - descrement </h1>
            <div className={"d-inline"}>
                <button onClick={inc}>+</button>
                <p>{counter}</p>
                <button onClick={dec}>-</button>
            </div>
        </div>
    );
}

export default Counter;