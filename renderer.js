const { ipcRenderer } = require("electron");
const { download } = require("./wrapper.js");

const startBtn = document.getElementById("start");
const urlInput = document.getElementById("url");
const formatInput = document.getElementById("format");
const nameInput = document.getElementById("name");
const dirBtn = document.getElementById("pickDir");
const toast = document.getElementById("toast");
const feedback = document.getElementById("feedback");

let directory = null;

function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 3000);
}


dirBtn.addEventListener("click", async () =>{
    directory = await ipcRenderer.invoke("choose-directory");
    if (directory) {
        outputDir = directory;
        feedback.textContent = `Save directory set to: ${directory}`;
        feedback.classList.add("text-green-600");
    }
});

startBtn.onclick = async () => {
    const url = urlInput.value;
    const format = formatInput.value;
    const title = nameInput.value;
    const outputDir = directory;
    if (!directory) {
        showToast("Choose a directory before downloading");
        return;
    }

    if (!url) {
        showToast("Enter a URL before downloading");
        return;
    }

    if (!format) {
        showToast("Select a format before downloading");
        return;
    }

    try {
        await download(url, outputDir, title, format)
        showToast(`Downloading`)
    }   catch (err) {
        showToast('Download failed')
    }

    
    
}