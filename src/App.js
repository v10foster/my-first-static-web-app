import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(10).fill(null),
            turn: 1,
            winner: null,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        let current = (this.state.turn == 1) ? 'X' : 'O';

        if (squares[i] == null && this.winner == null) {
            squares[i] = current;
            this.state.turn = !this.state.turn;

            this.checkForWin(squares);

            // assigning data causes re-render, so check for win before
            this.setState({ squares: squares });
        }
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    checkForWin(sq) {
        // if any row is 3 of the same
        // if any column is 3 of the same
        // if either of the diagonals is 3 of the same
        // that color wins

        // Can make this faster with recursive backtracking, but will just BF for 3 row case
        this.winner = this.checkWinner(sq, 0, 1, 2);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 3, 4, 5);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 6, 7, 8);

        if (this.winner == null)
            this.winner = this.checkWinner(sq, 0, 3, 6);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 1, 4, 7);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 2, 5, 8);

        if (this.winner == null)
            this.winner = this.checkWinner(sq, 0, 3, 6);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 1, 4, 7);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 2, 5, 8);

        if (this.winner == null)
            this.winner = this.checkWinner(sq, 0, 4, 8);
        if (this.winner == null)
            this.winner = this.checkWinner(sq, 2, 4, 6);

    }

    checkWinner(sq, a, b, c) {
        if (sq[a] == sq[b] && sq[b] == sq[c]) {
            if (sq[a] != null) {
                return sq[a];
            }
        }
        return null;
    }

    render() {
        let current = (this.state.turn == 1) ? 'X' : 'O';
        var status = 'Next player: ' + current;
        if (this.winner != null) {
            status = 'winner: ' + this.winner;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default App;

