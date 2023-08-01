const nums = document.querySelectorAll(".num")
const ops = document.querySelectorAll(".op")
const display = document.querySelector(".display p")
var numbers = []
var operations = []
var x = 0
var neg = false;
var shift = false;
var push = false;
for(let i = 0; i<10; i++){
    let p =i
    nums[i].addEventListener("click", ()=>{
        x = x*10+p
        if(neg){x*=-1;neg=false}
        ops[6].innerText="C"
        update()
    })
}

for(let j=0; j<8; j++){
    let p=j
    ops[j].addEventListener("click", ()=>{
        if(p==7){
            if(display.innerText=="" || display.innerText=="0"){
                neg = !neg
                if(neg){display.innerText="-"}
                else{display.innerText=""}
            }
            else{
                x*=-1
                update()
            }
        }
        else if(p==4){
            //if empty or longths mismatched- invalid
            numbers.push(Number(x))
            if(numbers.length!=(operations.length+1)){
                numbers = []
                operations = []
                display.innerText = "ERROR"
                x = 0;
            }
            else{
                result = numbers.length==0 ? 0 : numbers[0]
                for(let i = 1; i<numbers.length; i++){
                    if(operations[i-1]==0){
                        result +=numbers[i]
                    }
                    else if(operations[i-1]==1){
                        result -=numbers[i]
                    }
                    else if(operations[i-1]==2){
                        result *=numbers[i]
                    }
                    else if(operations[i-1]==3){
                        result = result/numbers[i]
                    }
                }
                x = result
                update()
                x=0
                numbers=[]
                operations=[]
            }
            //else loop

        }
        else if(p==5){
            x = Math.floor(Number(display.innerText)/10);
            display.innerText = x;
        }
        else if(p==6){
            //if its c, the input = 0, inner text = AC
            if(ops[6].innerText=="C"){
                x = 0;
                update()
                ops[6].innerText="AC"
            }
            else{
                numbers = []
                operations = []
            }
            //Should switch back to C whenever a number is pressed
            //if AC clear all
        }
        else {
            //its a code, add in the array things, clear display and x
            operations.push(p)
            numbers.push(x)
            x = 0
            update()
        }
    })
}

function update(){
    display.innerText = x
}
var numberKeys =["0", "1", "2", "3", "4", "5", "6","7", "8","9"]
var opKeys = ["+","-","*","/","Enter","Backspace"]
document.addEventListener("keyup", function(event) {
    //EVENT FOR each NUMBER- functions?
    if(event.key in numberKeys){
        nums[Number(event.key)].style.backgroundColor = "blueviolet";
        x = x*10+Number(event.key)
        if(neg){x*=-1;neg=false}
        ops[6].innerText="C"
        update()
        //alert(`${event.key} pressed!`);
    }
    else if (event.key == 'Enter') {
        ops[4].style.backgroundColor = "rgb(9, 54, 9)"
        //if empty or longths mismatched- invalid
        numbers.push(Number(x))
        if(numbers.length!=(operations.length+1)){
            numbers = []
            operations = []
            display.innerText = "ERROR"
            x = 0;
        }
        else{
            result = numbers.length==0 ? 0 : numbers[0]
            for(let i = 1; i<numbers.length; i++){
                if(operations[i-1]==0){
                    result +=numbers[i]
                }
                else if(operations[i-1]==1){
                    result -=numbers[i]
                }
                else if(operations[i-1]==2){
                    result *=numbers[i]
                }
                else if(operations[i-1]==3){
                    result = result/numbers[i]
                }
            }
            x = result
            update()
            x=0
            numbers=[]
            operations=[]
        }
    }
    //delete
    else if(event.key == "Backspace"){
        ops[5].style.backgroundColor = "rgb(9, 54, 9)"
        x = Math.floor(Number(display.innerText)/10);
        display.innerText = x;
    }
    //operations
    else {
        //if shift true, 8 and = shwitch || if shift false and /,-
        if(event.key=="+"){
            //shift = false;
            ops[0].style.backgroundColor = "rgb(9, 54, 9)"
            numbers.push(x)
            x=0; display.innerText="";
            operations.push(0)
        }
        else if(event.key=="-"){
            ops[1].style.backgroundColor = "rgb(9, 54, 9)"
            numbers.push(x)
            x=0; display.innerText="";
            operations.push(1)
        }
        else if(event.key=="/"){
            ops[3].style.backgroundColor = "rgb(9, 54, 9)"
            numbers.push(x)
            x=0; display.innerText="";
            operations.push(3)
        }
        else if(event.key=="*"){
            ops[2].style.backgroundColor = "rgb(9, 54, 9)"
            numbers.push(x)
            x=0; display.innerText="";
            operations.push(2)
        }
        else if(event.key=="Shift"){
            shift = true;
        }
        else{
            push = false;
        }
        
        if(push){
            operations.push(p)
            numbers.push(x)
            x = 0
            update()
        }
    }
});

document.addEventListener("keydown", function(event) {
    if(event.key in numberKeys){
        nums[Number(event.key)].style.backgroundColor = "rgb(104, 34, 170)";
    }
    for(let i = 0; i<6; i++){
        if(event.key==opKeys[i]){
            console.log(event.key)
            ops[opKeys.indexOf(event.key)].style.backgroundColor = "rgb(17, 87, 17)"    
        }
    }
})

