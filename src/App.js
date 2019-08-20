import React, {Component} from 'react';
import './App.css';

$square = $(".square");
$row = $(".row");
$gameBoard=$("#gameBoard");
$reset=$(".reset");
$1=$("#1");
$2=$("#2");
$3=$("#3");
$4=$("#4");
$5=$("#5");
$6=$("#6");
$7=$("#7");
$8=$("#8");
$9=$("#9");

var player1, player2;
var arrX, arrO, emptySlots;
var xo, flip, gameOver; 
var turnCount=0;
var winning=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

class App extends Component {

  componentDidMount(){
    this.initiateGame()
    $reset.click (function(){
      this.initiateGame();
    });
  }

  componentDidUpdate(){
    this.initiateGame()
  }

  initiateGame () {
    gameOver=false;
    arrX=[];
    arrO=[];
    emptySlots=[1,2,3,4,5,6,7,8,9];
    turnCount=0;
    this.wipeBoard();
    $square.hide(); // hide tic tac toe board until player selects marker choice
    $("h4").hide(); // message bar
    $("h1").show(); // title 
    $("h3").show(); // marker selection bar
    $(".reset").hide(); // reset button

    $(".choice").click (function(){
      var choice=$(this);
      if (choice.hasClass("x")){
            player1="X";
            xo="X";
          } else {
            player1="O";
            xo="O";
          }
      flip=1; // player 1's turn
      $("h3").hide();
      $("h1").hide();
      $("h2").hide();    
      $square.show();  
      $("h4").html("<br/>Player 1's Turn<br/><br/>");
      $("h4").show();
      this.currentTurn()
    });  

  }  
  
  currentTurn () {
    $square.click (function(){
      var selected=$(this);
      var id=parseInt($(this).attr("id")); // identify grid number clicked on by player
      if (gameOver) {$("h4").html("<br/>Game Over - Please Click Reset.<br/>"); } 
      else if(emptySlots.indexOf(id)==-1){
        $("h4").html("<br/>Spot Already Taken. Select another spot.");
        this.checkMaxMoves();
      } else {
        selected.text(xo);
        emptySlots.splice(emptySlots.indexOf(id),1); // update the list of empty slots (available playing space left)
        if (xo =="X") {
          arrX.push(id);
          this.checkWinning(arrX);
        } else {
          arrO.push(id);
          this.checkWinning(arrO);      
        } 
        this.nextTurn();            
      }
    })
  }

  return (
    <div className="App">
      <div className="gameBoard">
        <h1>Tic Tac Toe Game</h1>
        <h3><hr>Choose your symbol<br/><br/><a className='x choice btn'>X</a>&nbspor&nbsp<a className='o choice btn'>O</a></h3>
        <div className='container'>
          <div className="square" id="1"></div>
          <div className="square" id="2"></div>
          <div className="square" id="3"></div>
          <div className="square" id="4"></div>
          <div className="square" id="5"></div>
          <div className="square" id="6"></div>
          <div className="square" id="7"></div>
          <div className="square" id="8"></div>
          <div className="square" id="9"></div>      
        </div>
        <h4></h4>
        <div><a className='reset btn'>Reset</a></div>
      </div>
    </div>
  );

}

export default App;
