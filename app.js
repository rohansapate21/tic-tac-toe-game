let boxes= document.querySelectorAll(".box");
let reset_btn= document.querySelector("#reset_btn"); 
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerO, playerX

//2D array
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame=() => {
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        
        if (turnO){
            //playerO
            box.innerText = "O";
            box.setAttribute("data-value", "O");
            turnO=false;
        }
        else{ //playerX
            box.innerText="X";
            box.setAttribute("data-value", "X");
            turnO=true
        }
        box.disabled = true;
        checkWinner();
    });
}); 

const enableBoxes=()=> {
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; 
        box.removeAttribute("data-value");
    }
}

const disableBoxes =() => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner=(winner) => {
    let winnerName = winner === "X" ? document.getElementById("playerX").value || "Player X" 
                                    : document.getElementById("playerO").value || "Player O";
    msg.innerText = `Congratulations, ${winnerName} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=() => {
    for (let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !="" && pos2Val !="" && pos3Val !="") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner",pos1Val);
                showWinner(pos1Val);
            } 
        };
    };
    let filled = 0;
    boxes.forEach(box => {
        if (box.innerText !== "") filled++;
    });
    if (filled === 9) {
        msg.innerText = "Match Draw!";
        msgContainer.classList.remove("hide");
    }

};
newGameBtn.addEventListener("click",resetGame);
reset_btn.addEventListener("click",resetGame);
