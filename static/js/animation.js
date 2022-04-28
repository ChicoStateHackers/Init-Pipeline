
// set up event listeners for hovering and 
// code select. see globals.js
defineELsForCycleHover();
defineELsForCodeSelect(onPlay, onFStep, onBStep);

// when a play button is pressed this function is called
// the parameter e is the onclick event.
function onPlay(e){
    
    // get clicked element
    let elem = e.path[0];
    // detect if clicked element is the play/pause text, 
    // if not, the parent element of the text was pressed so handle accordingly
    if(elem.children.length === 2) elem = PLAYING ? elem.children[1] : elem.children[0];

    // if animation is currently playing
    if(PLAYING){
        PLAYING = false;
        // set the pause text to the play text
        elem.style.display = 'none';
        elem.previousElementSibling.style.display = 'block';

        // reset animation
        resetAfterAnimation();

        // allow code select again
        defineELsForCodeSelect(onPlay, onFStep, onBStep);

        // clearing the interval erases the loop of animation
        clearInterval(interval);
        interval = null;

    // if animation is not currently playing
    }else{
        PLAYING = true;
        // set the play text to the pause text
        elem.style.display = 'none';
        elem.nextElementSibling.style.display = 'block';

        // disallow code selecting and hover while animation is
        // running by removing event listeners
        clearELsForCodeSelect(false);
        clearELsForCycleHover();

        // clear any previous interval
        if(interval !== null) clearInterval(interval);

        // select the cycles and apply opacity to them
        CYCLE_STAGES = document.querySelectorAll(`${CYCLE_STAGE_SELECTOR}, div.num`);
        for(let stage of CYCLE_STAGES){
            appendOtherClassName(stage, ANIM_OPACITY);
        }

        // find the index of the first cycle in the animation
        // store this in START_OF_ANIMATION
        let count = 0;
        for(START_OF_ANIMATION = 0;!!CYCLES[START_OF_ANIMATION] && CYCLES[START_OF_ANIMATION] !== CURRENTLY_SELECTED_CYCLE;START_OF_ANIMATION++);

        // for each stage in the animation, apply a class name to 
        // counteract the opacity and to add custom styles
        // keep track of how many stages there are in the current animation
        // also store the stages in ANIMATION_CODES for later use in animation
        ANIMATION_CODES = [];
        let amount_of_stages = 0;
        for(let i = 1, j = START_OF_ANIMATION;i<=stageAmt && !!CYCLES[j];i++, j++){
            ANIMATION_CODES.push(CYCLES[j].querySelector(`${CYCLE_STAGE_SELECTOR}.b${i}`));
            appendOtherClassName(
                ANIMATION_CODES[ANIMATION_CODES.length - 1], 
                i === 1 ? ANIM_HIGHLIGHT_CURRENT : ANIM_HIGHLIGHT_ALL
            );
            amount_of_stages++;
        }

        // highlight the first stage in the animation
        appendHighlight(CYCLE_IMAGES[0]);

        // set the interval to execute every ANIMATION_TIME_DELAY milliseconds
        interval = setInterval(() => {

            // move the currently focused cycle highlight to the next cycle in the animation
            clearHighlight(CURRENTLY_SELECTED_CYCLE);
            appendHighlight(CYCLES[START_OF_ANIMATION]);
            CURRENTLY_SELECTED_CYCLE = CYCLES[START_OF_ANIMATION];

            // move the currently focused stage highlight to the next stage in the animation
            clearOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_CURRENT);
            appendOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_ALL);

            // clear the highlight on the currently highlighted image
            clearHighlight(CYCLE_IMAGES[count]);
            
            count++;
            
            // add the focused stage highlight to the next stage in the animation
            clearOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_ALL);
            appendOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_CURRENT);
            
            // highlight the next image to be highlighted
            appendHighlight(CYCLE_IMAGES[count]);

            START_OF_ANIMATION++;

            // store the next cycle into the CURRENTLY_SELECTED_CYCLE for use 
            // in the next iteration of this interval
            clearHighlight(CURRENTLY_SELECTED_CYCLE);
            appendHighlight(CYCLES[START_OF_ANIMATION]);
            CURRENTLY_SELECTED_CYCLE = CYCLES[START_OF_ANIMATION];

            // when we reach the end of the animation clear the interval and
            // properly reset the animation
            if(count === amount_of_stages){
                clearInterval(interval);
                elem.style.display = 'block';
                elem.nextElementSibling.style.display = 'none';
                interval = null;
                resetAfterAnimation();
            }

        }, ANIMATION_TIME_DELAY);
    }
}


function onFStep(){

}
function onBStep(){

}

// this function helps reset the animation
function resetAfterAnimation(){

    // allow code selection
    defineELsForCodeSelect(onPlay, onFStep, onBStep);

    // clear highlights
    clearHighlight(CURRENTLY_SELECTED_CYCLE);
    appendHighlight(CYCLES[START_OF_ANIMATION-5]);
    CURRENTLY_SELECTED_CYCLE = CYCLES[START_OF_ANIMATION-5];
    for(let anim of ANIMATION_CODES){
        clearOtherClassName(anim, ANIM_HIGHLIGHT_ALL);
        clearOtherClassName(anim, ANIM_HIGHLIGHT_CURRENT);
    }
    for(let stage of CYCLE_STAGES){
        clearOtherClassName(stage, ANIM_OPACITY);
    }
    for(let img of CYCLE_IMAGES){
        clearHighlight(img);
    }

    // allow hovering
    defineELsForCycleHover();

    PLAYING = false;
}