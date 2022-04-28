// this is for error handling
var scripts = document.querySelectorAll('script');
const FILE_PATH = scripts[scripts.length-1].src;

// class names to be appended to elements. Signifies change in element style.
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

// animation globals
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

// appends the HIGHLIGHT_STRING class name to elem.
// this does not duplicate the HIGHLIGHT_STRING in the 
// elems class name if called consecutively
var appendHighlight = function(elem){
    if(
        !!elem && 
        elem.className !== undefined && 
        elem.className.indexOf(HIGHLIGHT_STRING) === -1
    ){
        elem.className += HIGHLIGHT_STRING;
    }
}

// appends cName to elem's class name.
// this does not duplicate cName in the 
// elems class name if called consecutively
var appendOtherClassName = function(elem, cName){
    if(
        !!elem && 
        elem.className !== undefined && 
        elem.className.indexOf(cName) === -1
    ){
        elem.className += cName;
    }
}

// clears the HIGHLIGHT_STRING from elem's class name.
var clearHighlight = function(elem){
    if(
        !!elem && 
        !!elem.className && 
        elem.className.indexOf(HIGHLIGHT_STRING) !== -1
    ){
        elem.className = elem.className.replace(HIGHLIGHT_STRING, '');
    }
}

// clears cName from elem's class name.
var clearOtherClassName = function(elem, cName){
    if(
        !!elem && 
        !!elem.className && 
        elem.className.indexOf(cName) !== -1
    ){
        elem.className = elem.className.replace(cName, '');
    }
}

// defines event listeners for hovering over cycles.
// allows the user to interact with the cycles by 
// hovering over them
var defineELsForCycleHover = function(){
    populateImageHighlightArrays();
    for(let i = 0;i<stageAmt;i++){
        // for each code, myB, in each stage
        for(let myB of CYCLE_STAGES[i]){

            // highlight that code and its respective image
            // when the mouse is over the code
            myB.onmouseover = function() {
                appendHighlight(CYCLE_IMAGES[i]);
                appendHighlight(myB);
            };
            
            // unhighlight the code and its respective image
            // when the mouse is not over the code
            myB.onmouseout = function() {
                clearHighlight(CYCLE_IMAGES[i]);
                clearHighlight(myB);
            };
        }
    }
}

// clears event listeners for hovering over cycles.
// disallows the user to interact with the cycles
// by hovering over them
var clearELsForCycleHover = function(){
    for(let i = 0;i<stageAmt;i++){
        for(let myB of CYCLE_STAGES[i]){
            myB.onmouseover = null;
    
            myB.onmouseout = null;
        }
    }
}

// populates the CYCLE_STAGES and CYCLE_IMAGES arrays properly
var populateImageHighlightArrays = function(){
    CYCLE_STAGES = [];
    CYCLE_IMAGES = [];
    let cStageHold;
    let cImageHold;
    for(let i = 1;i<=stageAmt;i++){

        // for each stage, select the current stage element and 
        // the current image element and handle errors. 
        // errors may arrise if the home.html page is modified so that
        // the class names used to select elements are changed
        if((cStageHold = document.querySelectorAll(`${CYCLE_STAGE_SELECTOR}.b${i}`)).length === 0) 
            SELECTOR_ERROR_MESSAGE({CYCLE_STAGE_SELECTOR: `${CYCLE_STAGE_SELECTOR}.b${i}`});
        if((cImageHold = document.querySelector(`${CYCLE_IMAGE_SELECTOR}.b${i}`)) === null) 
            SELECTOR_ERROR_MESSAGE({CYCLE_IMAGE_SELECTOR: `${CYCLE_IMAGE_SELECTOR}.b${i}`});

        // push the selections to each array
        CYCLE_STAGES.push(cStageHold);
        CYCLE_IMAGES.push(cImageHold);
    }
}

// defines event listeners for clicking on codes.
// allows codes to be selected by clicking them. 
var defineELsForCodeSelect = function(playFn, fStepFn, bStepFn){
    CODES = [];
    CYCLES = [];
    // select codes and cycles
    if((CODES = document.querySelectorAll(CODE_SELECTOR)).length === 0) SELECTOR_ERROR_MESSAGE({CODE_SELECTOR});
    if((CYCLES = document.querySelectorAll(CYCLE_OBJECT_SELECTOR)).length === 0) SELECTOR_ERROR_MESSAGE({CYCLE_OBJECT_SELECTOR});
    
    // for each code, set an onclick event listener
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

// clears event listeners for clicking on codes.
// disallows codes to be selected by clicking them. 
var clearELsForCodeSelect = function(alsoClearBtns = true){
    for(let i = 0;i<CODES.length;i++){
        CODES[i].onclick = null;
        if(alsoClearBtns) clearELsForAnimationButtons(CODES[i]);
    }
}

// define event listeners for animation buttons
// allows the pause/play and others to be pressed
var defineELsForAnimationButtons = function(parElem, playFn, fStepFn, bStepFn){
    let playBtn = parElem.querySelector(PLAY_BUTTON_SELECTOR);
    let fStepBtn = parElem.querySelector(STEP_FORWARD_BUTTON_SELECTOR);
    let bStepBtn = parElem.querySelector(STEP_BACKWARD_BUTTON_SELECTOR);
    playBtn.onclick = playFn;
    fStepBtn.onclick = fStepFn;
    bStepBtn.onclick = bStepFn;
}

// clears event listeners for animation buttons
var clearELsForAnimationButtons = function(parElem){
    let playBtn = parElem.querySelector(PLAY_BUTTON_SELECTOR);
    let fStepBtn = parElem.querySelector(STEP_FORWARD_BUTTON_SELECTOR);
    let bStepBtn = parElem.querySelector(STEP_BACKWARD_BUTTON_SELECTOR);
    playBtn.onclick = null;
    fStepBtn.onclick = null;
    bStepBtn.onclick = null;
}