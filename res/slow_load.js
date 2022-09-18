const loadAudio = [
    new Audio(url="res/sfx/os/loadelement1.ogg"),
    new Audio(url="res/sfx/os/loadelement2.ogg"),
    new Audio(url="res/sfx/os/loadelement3.ogg"),
    new Audio(url="res/sfx/os/loadelement4.ogg")
]
const not_allowed = ["AUDIO", "META", "TITLE", "LINK", "SOURCE", "SCRIPT", "BR"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
}

function playAudio(audio){
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play();
}

function slow_load(speed=10, not_allowed=[], callback) {
    
    function onFinish(node, initial_display){
        node.style.display = initial_display;
        counter++;
        ratio = counter / total * 100;
        
        randomAudio();
    
        if (ratio >= 100 && callback)
            callback()
    }
    
    const all = document.getElementsByTagName("*");
    let counter = 0;
    let total = 0;
    let i = 0;
    for (element in all) {

        const node = all[element];
        if((node.childElementCount == 0) && (not_allowed.indexOf(node.tagName) === -1) && node.style){
            i += getRandomInt(250 / speed, 500 / speed);
            total++;
            const initial_display = node.style.display;
            node.style.display = "none";
            setTimeout(() => { onFinish(node, initial_display);}, i);
        }
    }
}

function randomAudio(){
    const random_audio = getRandomInt(0, loadAudio.length - 1);
    playAudio(loadAudio[random_audio]);
}
