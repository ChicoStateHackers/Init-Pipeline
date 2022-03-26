let b1Img = document.querySelector('img.circuit_image.b1');
let b2Img = document.querySelector('img.circuit_image.b2');
let b3Img = document.querySelector('img.circuit_image.b3');
let b4Img = document.querySelector('img.circuit_image.b4');
let b5Img = document.querySelector('img.circuit_image.b5');
let b1 = document.querySelectorAll('div.cycle.b1');
let b2 = document.querySelectorAll('div.cycle.b2');
let b3 = document.querySelectorAll('div.cycle.b3');
let b4 = document.querySelectorAll('div.cycle.b4');
let b5 = document.querySelectorAll('div.cycle.b5');

for(let myB of b1){
    myB.addEventListener('mouseover', () => {
        if(b1Img.className.indexOf(' highlight') === -1){
            b1Img.className += ' highlight';
        }
    });
    myB.addEventListener('mouseout', () => {
        if(b1Img.className.indexOf(' highlight') !== -1){
            b1Img.className = b1Img.className.replace(' highlight', '');
        }
    });
}
for(let myB of b2){
    myB.addEventListener('mouseover', () => {
        if(b2Img.className.indexOf(' highlight') === -1){
            b2Img.className += ' highlight';
        }
    });
    myB.addEventListener('mouseout', () => {
        if(b2Img.className.indexOf(' highlight') !== -1){
            b2Img.className = b1Img.className.replace(' highlight', '');
        }
    });
}
for(let myB of b3){
    myB.addEventListener('mouseover', () => {
        if(b3Img.className.indexOf(' highlight') === -1){
            b3Img.className += ' highlight';
        }
    });
    myB.addEventListener('mouseout', () => {
        if(b3Img.className.indexOf(' highlight') !== -1){
            b3Img.className = b1Img.className.replace(' highlight', '');
        }
    });
}
for(let myB of b4){
    myB.addEventListener('mouseover', () => {
        if(b4Img.className.indexOf(' highlight') === -1){
            b4Img.className += ' highlight';
        }
    });
    myB.addEventListener('mouseout', () => {
        if(b4Img.className.indexOf(' highlight') !== -1){
            b4Img.className = b1Img.className.replace(' highlight', '');
        }
    });
}
for(let myB of b5){
    myB.addEventListener('mouseover', () => {
        if(b5Img.className.indexOf(' highlight') === -1){
            b5Img.className += ' highlight';
        }
    });
    myB.addEventListener('mouseout', () => {
        if(b5Img.className.indexOf(' highlight') !== -1){
            b5Img.className = b1Img.className.replace(' highlight', '');
        }
    });
}