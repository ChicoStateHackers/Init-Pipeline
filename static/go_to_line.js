
let codes = document.querySelectorAll('code');
let cycles = document.querySelectorAll('div.cycle_object');
let scrollWrapper = document.querySelector('div.cycle_wrapper');
let current;
let currentBtnWrapper;
let currentCycle;

for(let i = 0;i<codes.length;i++){
    codes[i].addEventListener('click', () => {
        

        cycles[i].scrollIntoView(true);

        // highlight cycle
        if(cycles[i].className.indexOf(HIGHLIGHT_STRING) === -1){
            if(!!currentCycle){
                currentCycle.className = currentCycle.className.replace(HIGHLIGHT_STRING, '');
            }
            currentCycle = cycles[i];
            cycles[i].className += HIGHLIGHT_STRING;
        }

        // highlight selected code, display animation buttons
        if(codes[i].className.indexOf(HIGHLIGHT_STRING) === -1){
            if(!!current){
                current.className = current.className.replace(HIGHLIGHT_STRING, '');
            }
            if(!!currentBtnWrapper){
                currentBtnWrapper.className = currentBtnWrapper.className.replace(HIGHLIGHT_STRING, '');
            }
            current = codes[i];
            codes[i].className += HIGHLIGHT_STRING;
            currentBtnWrapper = codes[i].querySelector('div.stepper_button_wrapper');;
            currentBtnWrapper.className += HIGHLIGHT_STRING;
        }
    });
}

