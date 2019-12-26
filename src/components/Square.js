import React from 'react'
import '../App.css';

export default function Square(props) {
    // console.log("square : ",props.value)
    return (
    
        <button className="square" onClick= {props.onClick}> {props.value} </button>
    );
}