const p = document.querySelector("#num")
const res = document.querySelector("#res")
const read = document.querySelector("#read")
const header = document.querySelector("#heder")
const search = document.querySelector("#search")
const wrapper = document.querySelector("#wrapper")

const api = "https://api.quran.sutanlab.id/surah/"

async function renderAyats(surahNumber) {
    const data = await fetch(api + surahNumber)
    const surah = await data.json()

    const surahName = surah.data.name.transliteration.en
    const ayatNumber = surah.data.numberOfVerses

    header.textContent = "Surah: " + surahName
    num.textContent = "ayat: " + ayatNumber

    for(let verse of surah.data.verses) {
        const li = document.createElement("li")
        li.textContent = verse.text.arab

        const audio = document.createElement("audio")
        audio.src = verse.audio.primary

        li.append(audio)
        res.append(li)

        li.onclick = () => {
            stopAllAudios()
            audio.play()
        }
    }
}


function stopAllAudios() {
    const audios = document.querySelectorAll("audio")
    for(let audio of audios) {
        audio.pause()
        audio.currentTime = 0
    }
}

search.onkeyup = (event) => {
    if(event.keyCode == 13 && typeof (+search.value) == 'number' && +search.value <= 114 && +search.value >= 1) {
        
        renderAyats(search.value)
    }
}