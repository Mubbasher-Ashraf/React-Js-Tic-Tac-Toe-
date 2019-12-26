import React, { Component } from 'react'
import Board from './Board';
import '../App.css';

export default class Game extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             xIsNext: true,
             stepNumber: 0,
             history: [
                {
                    squares: Array(9).fill(null)
                }
             ]
        }
    }
    
    handleClick (i) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        const winner = Winner(squares);
        // console.log(squares[i]);
        if(winner){
            console.log('Winner')
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !(this.state.xIsNext),
            stepNumber: history.length
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Winner(current.squares);
        const moves = history.map((step, move)=>{
            const desc = move ? "Go To # "+move : "Start the Game";
            return (
                <li key = {move}>
                    <button onClick={()=> this.jumpTo(move)}>
                        { desc }
                    </button>
                </li>
            )
        })

        let status;
        if(winner){
            status = 'Winner is ' + winner;
        }else{
            status = 'Next Player is : '+ ( this.state.xIsNext? 'X': '0');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick= { (i) => this.handleClick(i) } 
                        squares = { current.squares } 
                    />
                </div>
                <div className="game-info">
                    <ul>{ status }</ul>
                    <ul>{ moves }</ul>
                </div>
            </div>
        )
    }
}

function Winner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let index = 0; index < lines.length; index++) {
        const [a,b,c] = lines[index];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
