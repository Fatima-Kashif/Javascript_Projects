let boxes=document.getElementsByClassName('box');
let reset=document.querySelector('#reset')
let message=document.querySelector('#message')
let newgame=document.querySelector('.hide')
let player1=true;
let player2=true;
let count=0
// // // *****Challenge#1******
// it is hard to recognize which box is clicked and make logic when one box is clicked
// then it is turn for second player to play so we have to switch
function click(e){ // by e we know on which box event was occured
    let box=e.target
    count++;
    if (player1==true){
        box.innerText='X';
        player1=false;
        player2=true;
        box.disabled=true;
        box.style.color='blue'
    }
    else{
        box.innerText='O'
        player2=false;
        player1=true;
        box.disabled=true;
    }
     if (count===9){
         message.innerHTML=`This game is draw. Click on Reset`
    }
checkwinner();

}
function disableboxes(){
    for (let box of boxes){
        box.disabled=true;
    }
}
function enableboxes(){
    for (let box of boxes){
        box.disabled=false;
    }
}
function checkwinner(){
//     for (let combo of winningcombo){
//         if(boxes[combo[0]].innerText==='X'&& boxes[combo[1]].innerText==='X'&& boxes[combo[2]].innerText==='X'){
//             console.log('Player 1 wins')
//   }  
//   else if (boxes[combo[0]].innerText==='O'&& boxes[combo[1]].innerText==='O'&& boxes[combo[2]].innerText==='O'){
// console.log('Player 2 wins')
//   }
  // another approach to check this
  for (let combo of winningcombo){
    // for this condition we have to give one more condition only check if the box is not empty because 3 empty box box will be equal and by this we are saving the each box from checking
    if(boxes[combo[0]].innerText!='' && boxes[combo[1]].innerText!=''&& boxes[combo[2]].innerText!='')
        if(boxes[combo[0]].innerText===boxes[combo[1]].innerText && boxes[combo[1]].innerText=== boxes[combo[2]].innerText){
            message.innerHTML=`Player ${boxes[combo[0]].innerText} is the winner`
            newgame.classList.add('style')
            newgame.classList.remove('hide')
            disableboxes()
  }  
    }
}
console.dir(boxes)

for(let box of boxes){ //so on each box event listener is applied 
    box.addEventListener('click',click)
    
}

const winningcombo=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function clear(){
    for (box of boxes){
        box.innerText=''
    }
newgame.classList.add('hide')
newgame.classList.remove('style')
message.innerHTML=""
enableboxes();
}
reset.addEventListener('click',clear)
newgame.addEventListener('click',clear)





