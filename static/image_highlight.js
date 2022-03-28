const stageAmt = 5;
const HIGHLIGHT_STRING = ' highlight';
let cStages = [];
let cImages = [];
for(let i = 1;i<=stageAmt;i++){
    cStages.push(document.querySelectorAll(`div.cycle.b${i}`));
    cImages.push(document.querySelector(`img.circuit_image.b${i}`));
}

for(let i = 0;i<stageAmt;i++){
    for(let myB of cStages[i]){
        myB.addEventListener('mouseover', () => {
            if(cImages[i].className.indexOf(HIGHLIGHT_STRING) === -1){
                cImages[i].className += HIGHLIGHT_STRING;
            }
            if(myB.className.indexOf(HIGHLIGHT_STRING) === -1){
                myB.className += HIGHLIGHT_STRING;
            }
        });
        myB.addEventListener('mouseout', () => {
            if(cImages[i].className.indexOf(HIGHLIGHT_STRING) !== -1){
                cImages[i].className = cImages[i].className.replace(HIGHLIGHT_STRING, '');
            }
            if(myB.className.indexOf(HIGHLIGHT_STRING) !== -1){
                myB.className = myB.className.replace(HIGHLIGHT_STRING, '');
            }
        });
    }
}
