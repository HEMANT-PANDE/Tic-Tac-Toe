let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGamebtn = document.querySelector("#new-btn");
let msgConteiner = document.querySelector(".msg-conteiner");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0; //playeX, playerO

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgConteiner.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //palyerO
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "x";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkwinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw`;
  msgConteiner.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgConteiner.classList.remove("hide");
  disableBoxes();
};

const checkwinner = () => {
  for (pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
