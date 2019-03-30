import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  };
  //Why are these working without binding or method = () syntax?
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const squaresArray = this.state.squares.map((_, i) => this.renderSquare(i));
    return (
      <div>
        <h3>{winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</h3>
        <div className='game-board'>
          {squaresArray}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//Try to refactor
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];
  let winner = null;
  lines.forEach(line => squares[line[0]] && (line.every(v => squares[line[0]] === squares[v])) ? winner = squares[line[0]]: null);
  return winner;
}

//example calculateWinner logic(currently better than my best)
/*
for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
*/



//CONTINUE TO REFACTOR AND COMPARE