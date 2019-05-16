import "../node_modules/babel-polyfill/"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';



class Game extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    move: 0,
    xIsNext: true,
  };

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.move + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      move: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo = (move) => {
    this.setState({
      //This would update the jump buttons by updating the history to forget the steps following the jumped-to step.
      //history: this.state.history.slice(0, step + 1),
      move: move,
      xIsNext: (move % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.move];
    const winner = calculateWinner(current.squares);

    let jumpButtonRendersKey = 0;
    const jumpButtonRenders = history.map((_, i) => {
      return (
          <JumpButton
            key={jumpButtonRendersKey++}
            move={i}
            jumpTo={this.jumpTo}/>
      );
    });

    return (
      <div className="game">
        <h1 className="main-title">React Tic Tac Toe</h1>
        <div className="orientation-wrapper">
          <div className="board-and-score">
            <Board
              squares={current.squares}
              handleClick={this.handleClick}
            />
            <h3 className="next-player">{winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</h3>
          </div>
          <ul className="history-list">
            {jumpButtonRenders}
          </ul>
        </div>
      </div>
    );
  }
}

const Board = ({squares, handleClick}) => {
  let squareRendersKey = 0;
  const squareRenders = Array(9).fill(null).map((_, i) =>
    <Square
      key={squareRendersKey++}
      position={i}
      value={squares[i]}
      handleClick={handleClick}
    />
  );
  return (
      <div className='game-board'>
        {squareRenders}
      </div>
  );
}


const Square = ({position, value, handleClick}) => {
  //This (creating a function in a functional/stateless component)seems to be a bad practice
  //though it also seems to allow me to forgo the use of binding in the Board component's render.
  //The reason this is bad practice is because this component will recreate the handler on every
  //re-render. Maybe I can use useCallback which “returns a memoized version of the callback that
  //only changes if one of the inputs has changed. This is useful when passing callbacks to
  //optimized child components that rely on reference equality to prevent unnecessary renders.”
  //This 'hook' seems to be included in create-react-app of of now(03/30/19), but doesn't seem to
  //be working.
  const onClick = () => {
    handleClick(position);
  }
  let className = "square square" + (position + 1);
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

const JumpButton = ({move, jumpTo}) => {
  const desc = move ? 'Go to Move #' + move : 'Go to Game Start';
  const handleClick = () => {
    jumpTo(move);
  }
  return (
    <li className="history-item">
      <button className="jump-button" onClick={handleClick}>{desc}</button>
    </li>
  )
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





//This is the Square and Board components utilizing an arrow function in the rendering of Square components
//as opposed to binding the handleClick methods and adding a function to the Square component which passes an
//additional prop passed down from the Board component.
//I'm not yet sure which method is best in this situation.
/*
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
  //NO BINDING HERE
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

  render() {
    const winner = calculateWinner(this.state.squares);
    const squareRenders = this.state.squares.map((_, i) =>
      <Square
        key={i}
        place={i}
        value={this.state.squares[i]}
        //ARROW FUNCTION USED TO PASS 'i'
        onClick={() => this.handleClick(i)}
      />
    );
    return (
      <div>
        <h3>{winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</h3>
        <div className='game-board'>
          {squareRenders}
        </div>
      </div>
    );
  }
}
*/

//This logic was placed within the render method of the Board component and was removed in
//favor of being implemented as a method of the Board comonent.
/*
const squareRenders = this.state.squares.map((_, i) =>
      <Square
        key={i}
        position={i}
        value={this.state.squares[i]}
        onClick={this.handleClick}
      />
    );
*/





//CONTINUE TO REFACTOR AND COMPARE