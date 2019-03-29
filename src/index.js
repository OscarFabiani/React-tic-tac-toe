import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class GameBoard extends React.Component {
  state = {
    turn: 'x',
    winner: '',
    a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '',
  }
  toggleTurn = () => {
    this.state.turn === 'x'
      ? this.setState({
          turn: 'o',
        })
      : this.setState({
          turn: 'x',
        })
  }
  checkForWin = () => {
    let[a, b, c, d, e, f, g, h, i] = [
      this.state.a, this.state.b, this.state.c, this.state.d, this.state.e,
      this.state.f, this.state.g, this.state.h, this.state.i
    ];
    let winningCombos = [[a, b, c], [a, d, g], [a, e, i], [c, f, i], [c, e, g], [d, e, f], [g, h, i], [b, e, h]];
    if (winningCombos.some(array => array.every(value => (value === array[0] && value !== '')))) {
      this.setState({
        winner: this.state.turn === 'x' ? 'O' : 'X',
      })
    }
  }
  updateTracker = (id) => {
    this.setState({
      [id]: this.state.turn,
    })
  }
  reset = () => {
    this.setState({
      turn: 'x',
      winner: '',
      a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '',
    })
  }
  render() {
    let spaces = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map(v =>
      <Space 
        key={v}
        id={v}
        turn={this.state.turn}
        winner={this.state.winner}
        letter={this.state[v]}
        updateTracker={this.updateTracker}
        toggleTurn={this.toggleTurn}
        checkForWin={this.checkForWin}/>);
    return (
      <div className='wrapper'>
        <div className='game-board'>
        {spaces}
        </div>
        <Display
          turn={this.state.turn}
          winner={this.state.winner}
          reset={this.reset}/>
      </div>
    )
  }
}

class Space extends React.Component {
  handleClick = () => {
    this.props.updateTracker(this.props.id);
    this.props.toggleTurn();
  }
  shouldComponentUpdate(nextProps) {
    //This also checks if the game has been reset by using nextProps
    if((this.props.letter !== '' && nextProps.letter !== '') || (this.props.winner !== '' && nextProps.winner !== '')) {
      return false;
    }
    else {
      return true;
    }
  }
  render() {
    this.props.checkForWin();
    if(this.props.letter !== '') {
      return (
        <div className='space'>{this.props.turn === 'x' ? 'O' : 'X'}</div>
      )
    }
    else {
      return <div className='space' onClick={this.handleClick}></div>;
    }
  }
}

const Display = (props) => {
  return (
    <div>
      <h2>{props.winner ? 'Winner:' : 'Next Player:'}{props.winner ? props.winner : props.turn === 'x' ? 'X' : 'O'}</h2>
      <button onClick={props.reset}>Reset Game</button>
    </div>
  )
}

ReactDOM.render(<GameBoard/>, document.getElementById('root'));


//Figure out how to update the tracker appropriately and place the winning logic.
//a b c
//d e f
//g h i
//Winning combinations: abc, def, ghi, abg, beh, cfi, aei.


//Space components before implementing map
/*
  <Space id={'a'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'b'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'c'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'d'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'e'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'f'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'g'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'h'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
  <Space id={'i'} turn={this.state.turn} winner={this.state.winner} updateTracker={this.updateTracker} toggleTurn={this.toggleTurn} checkForWin={this.checkForWin}/>
*/

//This is the original logic for winning the game before introducing an equals function.
/*
if(
  (a !== '' && ((a === b && a === c) || (a === d && a === g) || (a === e && a === i)))
    || (c !== '' && ((c === f && c === i) || (c === e && c === g)))
      || (d !== '' && (d === e && d === f))
        || (g !== '' && (g === h && g === i))
          || (b !== '' && (b === e && b === h))) {
            this.setState({
              winner: this.state.turn === 'x' ? 'O' : 'X',
            })
          }

if (areEqual(a, b, c) || areEqual(a, d, g) || areEqual(a, e, i)
        || areEqual(c, f, i) || areEqual(c, e, g) || areEqual(d, e, f)
        || areEqual(g, h, i) || areEqual(b, e, h)) {
      this.setState({
        winner: this.state.turn === 'x' ? 'O' : 'X',
      })
    }
const areEqual = (...args) => args.every(v => (v === args[0] && v !== ''));
if (wins.some(v => areEqual(...v))) {
*/

//COMPARE WITH TUTORIAL