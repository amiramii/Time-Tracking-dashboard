const activities=["Work","Play","Study","Exercise","Social","Self Care"];
const timePeriod=document.querySelector('.time-period');
async function getData(timeFrame) {
    const response = await fetch('./data.json');
    if (response.ok){
        const data = await response.json();
        updateUI(timeFrame,data);
    }else{
        throw new Error(`Something went wrong :${response.status}`);
        
    }
}
function updateUI(timeFrame,data){
    let previous="";
    if(timeFrame==="daily"){
        previous="Yesterday"
    }else if(timeFrame==="weekly"){
        previous="Last Week"
    }else{
        previous="Last Year"
    }
    const cards=document.querySelectorAll('.card');
    cards.forEach((card,index)=>{
        for (let i = 0; i < activities.length; i++) {
            if(data[i].title === activities[index]){
                card.querySelector('.previous-hours').innerText=`${previous}-${data[i].timeframes[timeFrame].previous}hrs`;
                card.querySelector('.hours').innerText=`${data[i].timeframes[timeFrame].current}hrs`;
            }
        }
    })
}
function setActiveSpan(timeFrame){
    const span=document.querySelectorAll('.time-period span');
    span.forEach(e=>{
        if(e.innerText.toLowerCase() === timeFrame){
            e.classList.add('active');
        }else{
            e.classList.remove('active');
        }
    })

}
//initialize the page with daily
getData("daily");
setActiveSpan("daily");
timePeriod.addEventListener('click', (e)=>{
   const timeFrame= e.target.innerText.toLowerCase();
   getData(timeFrame);
   setActiveSpan(timeFrame);
    
})