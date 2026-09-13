const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr=document.querySelector(".from select");

const toCurr=document.querySelector(".to select");


for (let select of  dropdown){
    for (let currCode in countryList) {
   let newOption = document.createElement("option");
   newOption.innerText = currCode;
   newOption.value =currCode;

   if(select.name ==="from"&& currCode ==="USD"){
    newOption.selected = "selected";
   } else if(select.name ==="to" && currCode ==="INR") {
    newOption.selected = "selected";
   }

   select.append(newOption);
}

select.addEventListener("change", (evt)=>{
    updateFlage(evt.target);
});
}

const updateExchangeRate = async () =>{
     let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    // console.log(amtval);
    if(amtval ===""|| amtval<1){
        amtval=1;
        amount.value ="1";
    }

    const fromVal = fromCurr.value.toLowerCase();
    const toVal = toCurr.value.toLowerCase();
    // console.log(fromCurr.value,toCurr.value);
    const URL = BASE_URL.replace("inr", fromVal);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromVal][toVal];

    let finalAmount = amtval *rate;
    console.log(data);

    const msgs = document.querySelector(".msg");
    msgs.innerText = `${amtval} ${fromCurr.value} =${finalAmount} ${toCurr.value}`;
}


const updateFlage =(element)=>{
    let currCode =element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
}


btn.addEventListener("click" ,async (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
   
});

window.addEventListener("load" ,(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});


//Exchange Cuntry 
const ExchangeCountry = document.querySelector("#Exchange");

ExchangeCountry.addEventListener("click", ()=>{
        // 1. Swap the dropdown values using a temporary variable
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // 2. Update the flags for both dropdowns
    updateFlage(fromCurr);
    updateFlage(toCurr);

    updateExchangeRate();
})


// Live Currency Label Update
const amountInput = document.querySelector(".amount input");
const msgDisplay = document.querySelector(".msg");

amountInput.addEventListener("input", () => {
    let amtval = amountInput.value;
    
    // Fallback if the user clears the input field
    if (amtval === "" || amtval < 1) {
        msgDisplay.innerText = `Enter an amount in ${fromCurr.value}`;
        return;
    }

    // Show the live value with its currency code
    msgDisplay.innerText = `${amtval} ${fromCurr.value} = ...`;
    
    // OPTIONAL: If you want the actual converted calculation to happen LIVE as they type,
    // uncomment the line below:
    // updateExchangeRate();
});
