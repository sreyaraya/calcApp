//click number pad when
//number clicking functionality
//wrapping
//pull, clean
//padding, div change, negatives
//all event listeners
const nums = document.querySelectorAll(".num")
const ops = document.querySelectorAll(".op")
const display = document.querySelector(".display p")
let numbers = [1, 2, 3]
let operations = ["a"]
let x = 0
let neg = false;
for(let i = 0; i<10; i++){
    let p =i
    nums[i].addEventListener("click", ()=>{
        x = x*10+p
        if(neg){x*=-1;neg=false}
        ops[6].innerText="C"
        update()
    })
}


//ops[1].addEventListener("click",()=>{console.log(ops[1].innerHTML)})
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
            
            /*neg = !neg
            //adjust equal protocol
            //display
            if(neg){
                console.log("negative")
                display.innerText = display.innerText=="" ? "-" : `-${x}`
            }
            else{
                console.log("positive")
                display.innerText=x
            }
            x = -1x*/
        }
        else if(p==4){
            //if empty or longths mismatched- invalid
            numbers.push(Number(x))
            if(numbers.length!=(operations.length+1)){
                numbers = []
                operations = []
                display.innerText = "ERROR"
                x = 0;
                console.log("Here")
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
                console.log(result)
                x = result
                update()
                x=0
            }
            //else loop

        }
        else if(p==5){
            x = Math.floor(Number(display.innerText)/10);
            console.log(x)
            display.innerText = x;
        }
        else if(p==6){
            //if its c, the input = 0, inner text = AC
            if(ops[6].innerText=="C"){
                x = 0;
                update()
                console.log("here")
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
//
function update(){
    display.innerText = x
}

//check for in a row; on green pop up (if valid else invalid reset); on switch back to displaying nums
//arr of nums and ops- ops number code, add respectively, calculate() on equal
//delete, C functionality