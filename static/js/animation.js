defineELsForCycleHover();
defineELsForCodeSelect(onPlay, onFStep, onBStep);

function onPlay(){
    if(PLAYING){
        PLAYING = false;
        resetAfterAnimation();
        defineELsForCodeSelect(onPlay, onFStep, onBStep);
        clearInterval(interval);
        interval = null;
    }else{
        PLAYING = true;
        clearELsForCodeSelect(false);
        clearELsForCycleHover();
        if(interval !== null) clearInterval(interval);

        CYCLE_STAGES = document.querySelectorAll(`${CYCLE_STAGE_SELECTOR}, div.num`);
        for(let stage of CYCLE_STAGES){
            appendOtherClassName(stage, ANIM_OPACITY);
        }


        let count = 0;
        for(START_OF_ANIMATION = 0;!!CYCLES[START_OF_ANIMATION] && CYCLES[START_OF_ANIMATION] !== CURRENTLY_SELECTED_CYCLE;START_OF_ANIMATION++);

        ANIMATION_CODES = [];
        for(let i = 1, j = START_OF_ANIMATION;i<=5;i++, j++){
            ANIMATION_CODES.push(CYCLES[j].querySelector(`${CYCLE_STAGE_SELECTOR}.b${i}`));
            appendOtherClassName(
                ANIMATION_CODES[ANIMATION_CODES.length - 1], 
                i === 1 ? ANIM_HIGHLIGHT_CURRENT : ANIM_HIGHLIGHT_ALL
            );
        }
        
        appendHighlight(CYCLE_IMAGES[0]);

        interval = setInterval(() => {
            clearHighlight(CURRENTLY_SELECTED_CYCLE);
            appendHighlight(CYCLES[START_OF_ANIMATION]);
            CURRENTLY_SELECTED_CYCLE = CYCLES[START_OF_ANIMATION];

            clearOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_CURRENT);
            appendOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_ALL);

            clearHighlight(CYCLE_IMAGES[count]);
            
            count++;
            
            clearOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_ALL);
            appendOtherClassName(ANIMATION_CODES[count], ANIM_HIGHLIGHT_CURRENT);
            
            appendHighlight(CYCLE_IMAGES[count]);

            START_OF_ANIMATION++;
            clearHighlight(CURRENTLY_SELECTED_CYCLE);
            appendHighlight(CYCLES[START_OF_ANIMATION]);
            CURRENTLY_SELECTED_CYCLE = CYCLES[START_OF_ANIMATION];


            if(count === 5){
                clearInterval(interval);
                interval = null;
                setTimeout(resetAfterAnimation, ANIMATION_TIME_DELAY);
            }
        }, ANIMATION_TIME_DELAY);
    }
}


function onFStep(){

}
function onBStep(){

}

function resetAfterAnimation(){
    defineELsForCodeSelect(onPlay, onFStep, onBStep);
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
    defineELsForCycleHover();

    PLAYING = false;
}