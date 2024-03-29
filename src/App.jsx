import React, {Component} from 'react';
import './App.css';

const winning=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]; // these are the winning combinations on board

class App extends Component {

  constructor(props){
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      gameOver: false,
      arrX: [],
      arrO: [],
      markersLocation: ['', '', '', '', '', '', '', '', ''],
      emptySlots: [1,2,3,4,5,6,7,8,9],
      selectedGrid: null,
      turnCount: 0,
      marker: null,
      player: 1,
      boardVisible: false,
      alert: ''
    }
    return initialState;
  }

  init = (e) => {
    this.setState({ 
      marker: e.target.id,
      boardVisible: true,
      alert:  "Let the game begin! "+ this.state.player +"'s Turn" // Message to show when game is initialized
    })
  }

  reset = () => {
    this.setState(this.getInitialState()) 
  }
  
  playerTurn = (e) => {
    const id = +e.target.id
    const arrX = this.state.arrX
    const arrO = this.state.arrO
    const emptySlots = this.state.emptySlots
    const markersLocation = this.state.markersLocation

    if (emptySlots.indexOf(id)==-1){ // check if user has selected a spot already taken (If indexOf returns -1, the item is not in the list)
      this.setState({ 
        alert: "Spot Already Taken. Select another spot."
      }) 
      this.checkMaxMoves();     
    } else {
      emptySlots.splice(emptySlots.indexOf(id),1) // remove id from array respresenting clicked position
      markersLocation[id-1] = this.state.marker // impute array with marker at id of clicked position
      if (this.state.marker =="X") {
        arrX.push(id); // each time a player selects a square, the array containing all square ids selected by the player gets updated
        this.setState({ 
          arrX: arrX,
          alert: "Player "+ (this.state.player==1 ? 2 : 1) +"'s Turn"
        }) 
        this.checkWinning(arrX);
      } else {
        arrO.push(id);
        this.setState({ 
          arrO: arrO,
          alert: "Player "+ (this.state.player==1 ? 2 : 1) +"'s Turn"
        }) 
        this.checkWinning(arrO);    
      }
      if(this.state.gameOver != true){
        this.setState({ 
          emptySlots: emptySlots, // array representing ids of empty squares on board
          selectedGrid: id, // id of selected square on board
          turnCount: this.state.turnCount + 1, // keep track of the number of clicks (each time a player clicks on a square on the board, the counter increases by 1)
          marker: this.state.marker=="X" ? "O" : "X", // switch marker
          player: this.state.player==1 ? 2 : 1, // switch player
          markersLocation: markersLocation // array representing marker type and positions on board
        })
      } 

    }

  }

  checkMaxMoves = () => {
    if (this.state.turnCount>8 && this.state.gameOver==false) {
      this.setState({ 
        alert: "It's a Draw!",
        gameOver: true
      })     
    }
  }

  checkWinning = (arr) => {
    var match;
      winning.forEach((winningCombo) => {
        match=0;
        //console.log(arr)
        arr.forEach((idCollected) => {
          if (winningCombo.indexOf(idCollected)!=-1){   match++;  } // check how many elements in a array of selected moves match any of the winning combinations
        });
      if(match==3) {  
        this.setState({ 
          alert: "Game Over, Player "+ this.state.player +" Wins!",
          gameOver: true
        })        
      }      
    }); 
  } 

  render () {

    const board = []
    if(this.state.boardVisible==true){
      this.state.markersLocation.map((marker,i)=>{
        board.push(<div className="square" id={i+1} onClick={this.playerTurn}>{marker}</div>)
      })
      var chooseMarker = <div></div> // hides marker selection once the game starts
    } else {
      var chooseMarker = 
        <div>
          <h3>Choose your marker<br/><br/>
            <a className='choice btn' id='X' onClick={this.init}>X</a>
            <a className='choice btn' id='O' onClick={this.init}>O</a>
          </h3>
        </div>
    }

    if(this.state.gameOver==true){
      var reset = <div><a className='reset btn' onClick={this.reset}>Reset</a></div> // show reset button once the game ends
    } else {
      var reset = <div></div>
    }
 
    return (
      <div className="App">
        <div className='container'>
          <h1>Tic Tac Toe Game</h1>
          {chooseMarker}
          <h4>{this.state.alert}</h4>
          {reset}
          <div className='gameBoard'>
            {board} 
          </div>
        </div>
      </div>
    )

  }

}

export default App;
