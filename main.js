let level =1;

let sec =0;
let min =0;
let timeInterval;
let operators = ['+','-','*','/','%'];
let fNumber;
let lNumber;
let selectedoperator;
let answerData=[];
let correctAnswer;
let insertedAnswer ;
let qNumber = 0;
//---------declare elemant----

const selectElement = document.getElementById('level-select');// detect value using id

const secElement = document.getElementById('sec');
const minElement = document.getElementById('min');

const fnumElement = document.getElementById('f-number');
const lnumlement = document.getElementById('l-number');
const opElement = document.getElementById('op');

const answerElement = document.getElementById('answer');
const qNumberElement = document.getElementById('qNumber');
const cElement = document.getElementById('c');
const wElement = document.getElementById('w');
const sElement = document.getElementById('s');
const btnstartElement = document.getElementById('btn-start');
const tBodyElement = document.getElementById('answer-body');

//--------------
selectElement.addEventListener("change", function(){
    level=parseInt(selectElement.value);
}); // event lisner is a some kind of funtion watch the catch value ("change "  funtion is triger)


//-----------------

const start=()=>{
    btnstartElement.disabled=true;
      manageTime();
}

const manageTime=()=>{

        qNumber++;
        if(qNumber>10){
            finalize();
            return;
        }else{

            qNumberElement.textContent = qNumber;

            min=0;
            sec=0;
         
            secElement.textContent='00';
            minElement.textContent='00';
    
            generateQuesion(level);
    
    //assign time olways clear
            clearInterval(timeInterval); //clear interval is a inbulld funtion  . kochara clik karath anthimata asing wen ainterval eka crear karanwa
            timeInterval = setInterval(() =>{
    
                sec++;
                if(sec<10){
                    //set time with 0
                    secElement.textContent='0'+sec;
                }else{
                    secElement.textContent=sec+'';
                }
    
                if (sec==60){
                    sec=0;
                    min++;
                    //set min
                    minElement.textContent='0'+min;
                }
    
                if(min==3){
                    min=0
                    //implement logic
                }
    
            // console.log(new Date().toISOString().split('T')[1]);
        },1000);
       
    }
        }


        

const generateQuesion = (selectedLevel) =>{

    let maxNumber =10

    if(selectedLevel==2){
        maxNumber =50;
    }else if (selectedLevel==3){
        maxNumber=100;
    }
    
    fNumber = Math.floor(Math.random() * maxNumber) + 1;
    lNumber = Math.floor(Math.random() * maxNumber) + 1;

    fnumElement.textContent=fNumber;
    lnumlement.textContent=lNumber;

    selectedoperator = operators[
          Math.floor(Math.random()*5)  //array eke 0 idan enne *5 dana eken eliyata enne 0-4 athara agayak +1 dammoth 0-5 athara agayak
    ];
    opElement.textContent= selectedoperator;
}

const submitData=()=>{ 
 insertedAnswer = parseInt(answerElement.value);
    if (fNumber && lNumber && selectedoperator && insertedAnswer ){
        switch(selectedoperator){
            case '+':correctAnswer=fNumber+lNumber;break;
            case '-':correctAnswer=fNumber-lNumber;break;
            case '*':correctAnswer=fNumber*lNumber;break;
            case '/':correctAnswer=fNumber/lNumber;break;
            case '%':correctAnswer=fNumber%lNumber;break;
            default: alert('something went wrong!');return;
        }
     if(insertedAnswer == correctAnswer){
            let obj={
                'qNumber' : 1,
                'time' : min+':'+sec,
                'correctAnswer' : correctAnswer,
                'userAnswer' : insertedAnswer,
                'operator' : selectedoperator,
                'firstNumber' :fNumber,
                'lastNumber' :lNumber,
                'isCorrect': true,
                'isSkipped' : false
            }   
            answerData.push(obj);   
     }
    
    else{
        let obj={
            'qNumber' : 1,
            'time' : min+':'+sec,
            'correctAnswer' : correctAnswer,
            'userAnswer' : insertedAnswer,
            'operator' : selectedoperator,
            'firstNumber' :fNumber,
            'lastNumber' :lNumber,
            'isCorrect': false,
            'isSkipped' : false
        }   
        answerData.push(obj);
    }
    answerElement.value='';
    manageTime();
    setStatisticsForLables();
    
}else{
     alert('try agin');
}

}

const skipQizz=()=>{

    if(qNumber>10){
        finalize();
        return;
    }else{
        let obj={
            'qNumber' : 1,
            'time' : min+':'+sec,
            'correctAnswer' : '**',
            'userAnswer' : '**',
            'operator' : selectedoperator,
            'firstNumber' :fNumber,
            'lastNumber' :lNumber,
            'isCorrect': false,      
            'isSkipped' : true
        }   
        answerData.push(obj);
        answerElement.value='';
        setStatisticsForLables();
        manageTime();
    }

   
}
//-----------

const setStatisticsForLables=()=>{
 
    let c=0;
    let w=0;
    let s=0;

    for(let x=0; x<answerData.length; x++){
        let temp = answerData[x];
        if(temp.isCorrect){
            c++;
        }else{
            w++;
        }
        if(temp.isSkipped){
            s++;
        }
    }
    cElement.textContent = c;
    wElement.textContent=w;
    sElement.textContent=s;
}

const reset=()=>{

    btnstartElement.disabled=false;
    qNumber=0;
    qNumberElement.textContent=qNumber;
    answerData=[];
    setStatisticsForLables();
    clearInterval(timeInterval);
    minElement.textContent='00';
    secElement.textContent='00';

    fnumElement.textContent='?';
    lnumlement.textContent='?';
    opElement.textContent='oparator';

    while(tBodyElement.firstChild){
        tBodyElement.removeChild(tBodyElement.firstChild)
    }
}

const finalize=()=>{

answerData.forEach(data=>{
    const row =document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent=data.firstNumber;
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent=data.lastNumber;
    row.appendChild(cell2);

 

    const cell3 = document.createElement("td");
    cell3.textContent=data.operator;
    row.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.textContent=data.correctAnswer;
    row.appendChild(cell4);

    const cell5 = document.createElement("td");
    cell5.textContent=data.userAnswer;
    row.appendChild(cell5);

    const cell6 = document.createElement("td");
    cell6.textContent=data.isCorrect;
    row.appendChild(cell6);

    const cell7 = document.createElement("td");
    cell7.textContent=data.isSkipped;
    row.appendChild(cell7);

    const cell8 = document.createElement("td");
    cell8.textContent=data.time;
    row.appendChild(cell8);

   tBodyElement.appendChild(row);
});

}