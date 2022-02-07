const search = document.querySelector("#search")
const read = document.querySelector("#read")
const header = document.querySelector("#heder")
const p = document.querySelector("#num")
const res = document.querySelector("#res")


search.onkeyup = async (event) => {
    if(event.keyCode == 13 && +search.value == search.value && +search.value >= 1 && +search.value <= 114) {
        let data = await fetch(`https://api.quran.sutanlab.id/surah/${search.value}`)
        let sura = await data.json()

       
        header.textContent = `Sura: ${sura.data.name.transliteration.en}`
        p.textContent = sura.data.verses.length + " ayat"

        for(let i of sura.data.verses) {
            const li = makeLi()
            li.textContent = i.text.arab
            res.append(li)

            li.addEventListener("click", () => {
                const audio = new Audio(i.audio.primary)
                audio.play()
            })
        }

        search.value = null
    }

}



function makeLi() {
    return document.createElement("li")
}