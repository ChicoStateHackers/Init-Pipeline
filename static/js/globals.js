var scripts = document.querySelectorAll('script');
const FILE_PATH = scripts[scripts.length-1].src;

// class name to be appended to elements. Signifies change in element style.
const HIGHLIGHT_STRING = ' highlight';
const ANIM_HIGHLIGHT_ALL = ' animation_white';
const ANIM_HIGHLIGHT_CURRENT = ' animation_red';
const ANIM_OPACITY = ' opacity_animation';

// amount of stages or columns displayed per cycle
const stageAmt = 5;

// element selector strings
const CYCLE_STAGE_SELECTOR = 'div.cycle';
const CYCLE_IMAGE_SELECTOR = 'img.circuit_image';
const CODE_SELECTOR = 'code';
const CYCLE_OBJECT_SELECTOR = 'div.cycle_object';
const PLAY_BUTTON_SELECTOR = 'button.stepper_button.play';
const STEP_FORWARD_BUTTON_SELECTOR = 'button.stepper_button.step_forward';
const STEP_BACKWARD_BUTTON_SELECTOR = 'button.stepper_button.step_backward';

// current selections
var CURRENTLY_SELECTED_CYCLE;
var CURRENTLY_SELECTED_CODE;
var CURRENTLY_SELECTED_BTN_WRAPPER;

// element arrays
var CYCLE_STAGES = [];
var CYCLE_IMAGES = [];
var CODES = [];
var CYCLES = [];
var ANIMATION_CODES = [];
var CYCLE_STAGES = [];

var PLAYING = false;
var interval = null;
const ANIMATION_TIME_DELAY = 1000;
var START_OF_ANIMATION;

// error message for incorrect selector handling
// this is created incase the home.html is updated and
// needed class names are changed or updated
var SELECTOR_ERROR_MESSAGE = function(obj){
    let varName = Object.keys(obj)[0];
    console.error(`Could not select an elment by: \n\t ${varName} = '${obj[varName]}'\n\tChoose a valid selector string for ${varName} in ${FILE_PATH}`);
}

var appendHighlight = function(elem){
    if(
        !!elem && 
        elem.className !== undefined && 
        elem.className.indexOf(HIGHLIGHT_STRING) === -1
    ){
        elem.className += HIGHLIGHT_STRING;
    }
}
var appendOtherClassName = function(elem, cName){
    if(
        !!elem && 
        elem.className !== undefined && 
        elem.className.indexOf(cName) === -1
    ){
        elem.className += cName;
    }
}
var clearHighlight = function(elem){
    if(
        !!elem && 
        !!elem.className && 
        elem.className.indexOf(HIGHLIGHT_STRING) !== -1
    ){
        elem.className = elem.className.replace(HIGHLIGHT_STRING, '');
    }
}
var clearOtherClassName = function(elem, cName){
    if(
        !!elem && 
        !!elem.className && 
        elem.className.indexOf(cName) !== -1
    ){
        elem.className = elem.className.replace(cName, '');
    }
}

var defineELsForCycleHover = function(){
    populateImageHighlightArrays();
    for(let i = 0;i<stageAmt;i++){
        for(let myB of CYCLE_STAGES[i]){
            myB.onmouseover = function() {
                appendHighlight(CYCLE_IMAGES[i]);
                appendHighlight(myB);
            };
    
            myB.onmouseout = function() {
                clearHighlight(CYCLE_IMAGES[i]);
                clearHighlight(myB);
            };
        }
    }
}
var clearELsForCycleHover = function(){
    for(let i = 0;i<stageAmt;i++){
        for(let myB of CYCLE_STAGES[i]){
            myB.onmouseover = null;
    
            myB.onmouseout = null;
        }
    }
}
var populateImageHighlightArrays = function(){
    CYCLE_STAGES = [];
    CYCLE_IMAGES = [];
    let cStageHold;
    let cImageHold;
    for(let i = 1;i<=stageAmt;i++){
        // selector error handling
        if((cStageHold = document.querySelectorAll(`${CYCLE_STAGE_SELECTOR}.b${i}`)).length === 0) 
            SELECTOR_ERROR_MESSAGE({CYCLE_STAGE_SELECTOR: `${CYCLE_STAGE_SELECTOR}.b${i}`});
        if((cImageHold = document.querySelector(`${CYCLE_IMAGE_SELECTOR}.b${i}`)) === null) 
            SELECTOR_ERROR_MESSAGE({CYCLE_IMAGE_SELECTOR: `${CYCLE_IMAGE_SELECTOR}.b${i}`});

        CYCLE_STAGES.push(cStageHold);
        CYCLE_IMAGES.push(cImageHold);
    }
}


var defineELsForCodeSelect = function(playFn, fStepFn, bStepFn){
    CODES = [];
    CYCLES = [];
    // selector error handling
    if((CODES = document.querySelectorAll(CODE_SELECTOR)).length === 0) SELECTOR_ERROR_MESSAGE({CODE_SELECTOR});
    if((CYCLES = document.querySelectorAll(CYCLE_OBJECT_SELECTOR)).length === 0) SELECTOR_ERROR_MESSAGE({CYCLE_OBJECT_SELECTOR});
    
    for(let i = 0;i<CODES.length;i++){
        CODES[i].onclick = function() {
    
            CYCLES[i].scrollIntoView(true);
            // unhighlight the last selected cycle
            // highlight the selected cycle 
            // update CURRENTLY_SELECTED_CYCLE
            clearHighlight(CURRENTLY_SELECTED_CYCLE);
            appendHighlight(CYCLES[i]);
            CURRENTLY_SELECTED_CYCLE = CYCLES[i];
            
            // highlight selected code
            clearHighlight(CURRENTLY_SELECTED_CODE);
            appendHighlight(CODES[i]);
            CURRENTLY_SELECTED_CODE = CODES[i];
    
            // display animation buttons
            clearHighlight(CURRENTLY_SELECTED_BTN_WRAPPER);
            CURRENTLY_SELECTED_BTN_WRAPPER = CODES[i].querySelector('div.stepper_button_wrapper');
            appendHighlight(CURRENTLY_SELECTED_BTN_WRAPPER);

            defineELsForAnimationButtons(CODES[i], playFn, fStepFn, bStepFn);
        };
    }
}

var clearELsForCodeSelect = function(alsoClearBtns = true){
    for(let i = 0;i<CODES.length;i++){
        CODES[i].onclick = null;
        if(alsoClearBtns) clearELsForAnimationButtons(CODES[i]);
    }
}

var defineELsForAnimationButtons = function(parElem, playFn, fStepFn, bStepFn){
    let playBtn = parElem.querySelector(PLAY_BUTTON_SELECTOR);
    let fStepBtn = parElem.querySelector(STEP_FORWARD_BUTTON_SELECTOR);
    let bStepBtn = parElem.querySelector(STEP_BACKWARD_BUTTON_SELECTOR);
    playBtn.onclick = playFn;
    fStepBtn.onclick = fStepFn;
    bStepBtn.onclick = bStepFn;
}
var clearELsForAnimationButtons = function(parElem){
    let playBtn = parElem.querySelector(PLAY_BUTTON_SELECTOR);
    let fStepBtn = parElem.querySelector(STEP_FORWARD_BUTTON_SELECTOR);
    let bStepBtn = parElem.querySelector(STEP_BACKWARD_BUTTON_SELECTOR);
    playBtn.onclick = null;
    fStepBtn.onclick = null;
    bStepBtn.onclick = null;
}