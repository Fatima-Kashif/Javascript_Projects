let rock=document.querySelector('#rock_but');
let paper=document.querySelector('#paper_but');
let scissors=document.querySelector('#scissor_but');
let message=document.querySelector('#message')
let player=document.querySelector('#player_score')
let comp=document.querySelector('#comp_score')
// let player_score=0
// let comp_score=0
let player_score = Number(localStorage.getItem('pscore')) || 0;
let comp_score = Number(localStorage.getItem('cscore')) || 0;
const options=['rock','paper','scissors']
let comp_choice;
// options.length is 3.
// Math.random() generates a number between 0 and 1 (e.g., 0.742).
// Math.random() * 3 gives a number between 0 and 2.999.
// Math.floor() rounds it down to 0, 1, or 2.
// So it selects the value at index 0, 1, or 2.
rock.addEventListener('click',function(){
    comp_choice=options[Math.floor(Math.random()*options.length)]
    if (comp_choice=='paper'){
        message.innerHTML=`You lose. Computer's choice was Paper`
        comp_score++
        localStorage.setItem('cscore',comp_score)
    }
    else if (comp_choice=='scissors'){
        message.innerHTML=`You won. Computer's choice was Scissors`
        player_score++
        localStorage.setItem('pscore',player_score)
    }
   else{
    message.innerHTML=`It's a tie. Computer's choice was also Rock`
   }
   display_score();
})
paper.addEventListener('click',function(){
    comp_choice=options[Math.floor(Math.random()*options.length)]
    if (comp_choice=='scissors'){
        message.innerHTML=`You lose. Computer's choice was Scissors`
        comp_score++
        localStorage.setItem('cscore',comp_score)
    }
    else if (comp_choice=='rock'){
        message.innerHTML=`You won. Computer's choice was Rock`
        player_score++
        localStorage.setItem('pscore',player_score)
    }
   else{
    message.innerHTML=`It's a tie. Computer's choice was also Paper`
   }
   display_score();
})
scissors.addEventListener('click',function(){
    comp_choice=options[Math.floor(Math.random()*options.length)]
    if (comp_choice=='rock'){
        message.innerHTML=`You lose. Computer's choice was Rock`
        comp_score++
        localStorage.setItem('cscore',comp_score)
    }
    else if (comp_choice=='paper'){
        message.innerHTML=`You won. Computer's choice was Paper`
        player_score++
        localStorage.setItem('pscore',player_score)
    }
   else{
    message.innerHTML=`It's a tie. Computer's choice was also Scissors`
   }
   display_score();
})



function display_score(){
    player.innerHTML=`You : ${localStorage.getItem('pscore')}`
    comp.innerHTML=`Computer : ${localStorage.getItem('cscore')}`
}

display_score();