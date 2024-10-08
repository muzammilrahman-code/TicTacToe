let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); 
let winnerMsg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");
let msgHead = document.querySelector(".head");
// let playerTurn1 = document.querySelector(".turn1");
// let playerTurn2 = document.querySelector(".turn2");

let turnx = true;
let count = 0;

const winPattern = [               // 2d array
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    
    turnx = true;
    count = 0;
    enableBtn();
    msgHead.classList.add("hide");
    boxes.forEach(box => box.classList.remove("winning-box"));  
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnx === true){                 // player X
            box.innerText = "X";
            box.style.color = "green";
            // playerTurn1.style.display = "none";
            // playerTurn2.classList.remove("turn2");
            turnx = false;
        
           
        }
        else{
            box.innerText = "O";              // player O
            // playerTurn2.classList.add("turn2");
            // playerTurn2.style.display = "none";
            box.style.color = "#b0413c";
            turnx = true;
            
        }
        box.disabled = true;
        count ++;
                    
                
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameOver();
        }
            });
        });


const gameOver = () => {
    winnerMsg.innerText = "Game Was Draw";
    msgHead.classList.remove("hide");
    disableBtn();
}



const disableBtn = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBtn = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner,pattern) => {
     if (winner === "X") {
        winnerMsg.innerText = "Congratulations, Player 1 wins!";
    } else if (winner === "O") {
        winnerMsg.innerText = "Congratulations, Player 2 wins!";
    }
    msgHead.classList.remove("hide");
    disableBtn();
    highlightWinningPattern(pattern);
}
const highlightWinningPattern = (pattern) => {                                   
    pattern.forEach(index => boxes[index].classList.add("winning-box"));
}

const checkWinner = () => {
    for (let pattern of winPattern){
        // console.log(pattern[0],pattern[1],pattern[2]);
        
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
         

       if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("Winner", pos1Val);
               showWinner(pos1Val,pattern); // Display the winner as "X" or "O"
               return true; // Winner found
                
            }
       }
    }
    return false;
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
