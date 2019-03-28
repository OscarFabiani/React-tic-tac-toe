import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 'x',
      winner: '',
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
    }
    this.toggleTurn = this.toggleTurn.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.updateTracker = this.updateTracker.bind(this);
    this.reset = this.reset.bind(this);
  }
  toggleTurn() {
    if(this.state.turn === 'x') {
      this.setState({
        turn: 'o',
      })
    }
    else {
      this.setState({
        turn: 'x',
      })
    }
  }
  checkForWin() {
    let[a, b, c, d, e, f, g, h, i] = [
      this.state.a, this.state.b, this.state.c, this.state.d, this.state.e, this.state.f, this.state.g, this.state.h, this.state.i
    ];
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
  }
  updateTracker(id, turn) {
    this.setState({
      [id]: turn,
      didReset: false,
    })
  }
  reset() {
    this.setState({
      turn: 'x',
      winner: '',
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
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
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.updateTracker(this.props.id, this.props.turn);
    this.props.toggleTurn();
    this.setState({
      visible: true,
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('letter='+this.props.letter, 'winner='+this.props.winner);
    if((this.props.letter !== '') || this.props.winner !== '') {
      return false;
    }
    else {
      return true;
    }
  }
  componentDidUpdate() {
    this.props.checkForWin();
  }
  render() {
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
      <h2>{props.winner ? 'Winner:' : 'Next Player:'}</h2>
      <p>{props.winner ? props.winner : props.turn === 'x' ? 'X' : 'O'}</p>
      <button onClick={props.reset}>Reset</button>
    </div>
  )
}

ReactDOM.render(<GameBoard/>, document.getElementById('root'));


//Figure out how to update the tracker appropriately and place the winning logic.
//a b c
//d e f
//g h i
//Winning combinations: abc, def, ghi, abg, beh, cfi, aei.


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

//CONTINUE PROJECT LOGIC