const p = document.querySelector("#num")
const res = document.querySelector("#res")
const read = document.querySelector("#read")
const header = document.querySelector("#heder")
const search = document.querySelector("#search")
const wrapper = document.querySelector("#wrapper")

let input = null
let i = -1, sounds, sura

search.onkeyup = async (event) => {
    if(event.keyCode == 13 && +search.value == search.value && +search.value >= 1 && +search.value <= 114) {
        let data = await fetch(`https://api.quran.sutanlab.id/surah/${search.value}`)
        sura = await data.json()

        // get all audios
        sounds = sura.data.verses.map(el => {return new Audio(el.audio.primary)})

        header.textContent = `Surah: ${sura.data.name.transliteration.en}`
        p.textContent = sura.data.verses.length + " ayat"


        for(let i of sura.data.verses) {
            const { li, audio } = makeLi()
            li.textContent = i.text.arab

            let source = document.createElement("source")
            source.src = i.audio.primary

            audio.append(source)
            res.append(li)
           
            
            li.addEventListener("click",  function (){
                stopAudio()
                wrapper.innerHTML = null
                appendDiv(audio)
                audio.play()
            })
        }
        input = search.value
        search.value = null
        stopAudio()
    }

}


read.addEventListener("click", async function (){
    if(input) {
        playAll()
    }
})


function makeLi() {
    let li = document.createElement("li")
    let audio = document.createElement("audio")
    return { li, audio }
}

function appendDiv( tag ) {
    wrapper.append(tag)
}

function playSound() {
    stop()
	
	for(let el of sura.data.verses){
		wrapper.innerHTML=null

		let audio = document.createElement('audio')
		audio.controls = false
    	let source = document.createElement('source')
    	source.src = el.audio.primary
        
    	audio.append(source)
    	wrapper.append(audio)
	}
 	playAll()
}

function playAll() {
    i++;
    if (i >= wrapper.length){
        i=-1;
    	return;
    }
    sounds[i].addEventListener('ended', playAll);
    sounds[i].play();
    wrapper.innerHTML=null
}

function stopAudio() {
    if(i != -1) {
        sounds[i].pause()
        sounds[i].currentTime = 0
        i = -1
    }
}