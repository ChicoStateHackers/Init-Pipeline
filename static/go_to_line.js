
let codes = document.querySelectorAll('code');
let cycles = document.querySelectorAll('div.num');
let scrollWrapper = document.querySelector('div.cycle_wrapper');
let current;

for(let i = 0;i<codes.length;i++){
    codes[i].addEventListener('click', () => {
        cycles[i].scrollIntoView(true);

        if(codes[i].className.indexOf(' highlight') === -1){
            if(!!current){
                current.className = current.className.replace(' highlight', '');
            }
            current = codes[i];
            codes[i].className += ' highlight';
        }
    });
}

