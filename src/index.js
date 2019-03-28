import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 'x',
      winner: '',
      tracker: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
      }
    }
    this.switchTurn = this.switchTurn.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
  }
  switchTurn() {
    console.log(true, this.state.turn);
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
    let tracker = this.state.tracker;
    if(tracker.a != '' && tracker.a === tracker.b && tracker.a === tracker.c) {
      console.log(true);
    }
  }
  render() {
    return (
      <div className='game-board'>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
        <Space turn={this.state.turn} tracker ={this.state.tracker} switchTurn={this.switchTurn} checkForWin={this.checkForWin}/>
      </div>
    )
  }
}

class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  //Maybe add a method that update the tracker somewhere.
  handleClick() {
    this.props.checkForWin();
    this.props.switchTurn();
    this.setState({
      showMe: true,
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.showMe) {
      return false;
    }
    else {
      return true;
    }
  }
  render() {
    let showMe = this.state.showMe;
    if(showMe) {
      return (
        <div className='space'>{this.props.turn === 'x' ? <X/> : <O/>}</div>
      )
    }
    else {
      return <div className='space' onClick={this.handleClick}></div>;
    }
  }
}

const X = (props) => {
  return <span>X</span>;
}

const O = (props) => {
  return <span>O</span>;
}

ReactDOM.render(<GameBoard/>, document.getElementById('root'));

//Figure out how to update the tracker approprietly and place the winning logic.
//1 2 3
//4 5 6
//7 8 9
//Winning combinations: 123, 456, 789, 147, 258, 369, 159.



//CONTINUE PROJECT LOGIC