import React, { useState } from 'react';
import './Game.css';
import { calculateWinner } from './utils';

function Square({ value, onClick }) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

function Board({ squares, onPlay, xIsNext }) {
    const nextValue = xIsNext ? "X" : "O";
    const winner = calculateWinner(squares);
    const status = winner
        ? `Vencedor: ${winner}`
        : `Próximo jogador: ${nextValue}`;

    function handleClick(i) {
        if (squares[i] || winner) return;
        
        const nextSquares = squares.slice();
        nextSquares[i] = nextValue;
        onPlay(nextSquares);
    }

    const renderBoardRow = (start) => (
        <div className="board-row">
            {[0, 1, 2].map(j => {
                const i = start + j;
                return (
                    <Square 
                        key={i} 
                        value={squares[i]} 
                        onClick={() => handleClick(i)} 
                    />
                );
            })}
        </div>
    );

    return (
        <>
            <div className="status">{status}</div>
            {renderBoardRow(0)}
            {renderBoardRow(3)}
            {renderBoardRow(6)}
        </>
    );
}

function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentMove(move);
    }

    const moves = history.map((_, move) => {
        const description = move ? `Ir para jogada #${move}` : "Início do jogo";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={currentSquares}
                    onPlay={handlePlay}
                    xIsNext={xIsNext}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default App;