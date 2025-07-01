let tempvalue=document.getElementById("textbox");
const toCelcius=document.getElementById("toCelcius");
const toFahrenheit=document.getElementById("toFahrenheit");
const message=document.getElementById("msg");
let conversion;
function convert(){
 event.preventDefault();
 tempval=Number(tempvalue.value);
if (toFahrenheit.checked){
   conversion=(9/5)*tempval+32;
    message.textContent=`${conversion.toFixed(2)} °F`
}
else if (toCelcius.checked){
    conversion=(5/9)*(tempval-32);
    message.textContent=`${conversion.toFixed(2)} °C`
}
else{
    message.textContent="you haven't select any unit";
}
}