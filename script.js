import { keys } from "./keys.js";

const allKeys = [];
const audioMap = {};

document.addEventListener("DOMContentLoaded", () => {
    const pianoKeysContainer = document.querySelector(".piano-keys");
    const keysCheckbox = document.querySelector(".keys-checkbox input");
    keys.forEach((key) => {
        const li = document.createElement("li");
        li.className = `key ${key.isBlack ? "black" : "white"}`;
        const displayKey = key.mappedKey || key.key;
        li.dataset.key = displayKey;
        li.innerHTML = `
       <div>${key.note}</div>
       <span>${key.key}</span>
       `;
        li.addEventListener("click", () => playTune(displayKey));
        pianoKeysContainer.appendChild(li);
        allKeys.push(displayKey);
    });
    preLoadAudio();
    keysCheckbox.addEventListener("click", showHideKeys);
    document.addEventListener("keydown", pressedKey);
});

const preLoadAudio = () => {
    allKeys.forEach((key) => {
        audioMap[key] = new Audio(`./pianoKeys/${key}.mp3`);
    });
};

const pressedKey = (e) => {
    const selectedKey = keys.find((keyObject) => keyObject.key === e.key);
    const displayKey = selectedKey.mappedKey || e.key;
    if (allKeys.includes(displayKey)) playTune(displayKey);
};

const playTune = (key) => {
    const volumeInput = document.querySelector(".volume-slider input");

    const audio = audioMap[key];
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = volumeInput.value;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};
const showHideKeys = () => {
    document.querySelectorAll(".key").forEach((key) => {
        key.classList.toggle("hide");
    });
};
