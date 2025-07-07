import countryList from "./code.js"
const selects=document.querySelectorAll('.currency')
for (const dropdown of selects){
    for (let code in countryList) {
       const option=document.createElement('option')
       option.innerText=code
       option.value=code 
       dropdown.append(option)
       if (dropdown.name=='from_currency' && code=='USD'){
        option.selected='selected'
       }
       if (dropdown.name=='to_currency' && code=='PKR'){
        option.selected='selected'
       }
}
dropdown.addEventListener('change',(evt)=>{
    updateFlag(evt.target)}
)
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flag = element.previousElementSibling;
    flag.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
};

const convert_act=document.querySelector('#get_rate')
const amount=document.querySelector('#amount')
const conversion=document.querySelector('#rate')
convert_act.addEventListener('click',async (evt)=>{
    evt.preventDefault()
    let to=document.querySelector('#to_currency').value
    let from=document.querySelector('#from_currency').value
    if (amount.value==='' || amount.value < 1){
        amount.value=1
    }
    const URL=`https://v6.exchangerate-api.com/v6/919d790b675e0137d9cc7245/latest/${from}`
    let response=await fetch(URL)
    let data=await response.json()
    let to_curr=data.conversion_rates[to]
    conversion.innerText=`${amount.value} ${from} = ${(amount.value*to_curr).toFixed(2)} ${to}`


})