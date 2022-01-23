let runningTotal = 0;
let buffer = "0";
let previousOperator ;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value;
    }else{
        buffer += value;
    }
    rerender();
}

function handleMath(value){
    
    if (buffer === "0"){
        //do nothing
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer ;

    }else{
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer ="0";
}

//operations take place in flushOperation func

function flushOperation(intBuffer){
    if (previousOperator === "+"){
        runningTotal += intBuffer ;
    }else if (previousOperator === "-"){
        runningTotal -= intBuffer;
    }else if (previousOperator === "x"){
        runningTotal *= intBuffer ;
    }else if (previousOperator === "÷"){
        runningTotal /= intBuffer;
    }

}

//the values user gives works here

function handleSymbol (value){
    switch(value){
        case "C":
            buffer = "0";
            runningTotal =0;
            break; 
            
            //runningTotal is the final answer
            //C makes everything 0 so break
            //with final ans as 0
            
        case "=":
            if (previousOperator === null){
                return;
                //need 2 numbers to calculate
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case "🠔":
            if (buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
    
            // buffer is whr user inputs gets stored 
    
        case "+":
        case "-":
        case "x":
        case "÷":
            handleMath(value);
            break;
    
        //handleMath fn is above        
    }
         
}

function rerender(){
    screen.innerText = buffer;
}

function init(){
    document.querySelector(".calc-Buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

init();


