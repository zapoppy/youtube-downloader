const { exec } = require("child_process");
const path = require("path");

function ytdlpPath() {
    if (process.platform === "win32") {
        return path.join(__dirname, "resources", "win", "yt-dlp.exe");
    }
    return path.join(__dirname, "resources", "linux", "yt-dlp");
}


function download(url, outputDir, title, format) {
    const ytDlp = ytdlpPath();
    const cmd = `"${ytDlp}" -t "${format}" "${url}" -P "${outputDir}" -o "${title}"`

    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error("yt-dlp failed:", err);
            console.error(stderr);
            return;
        } else {
            console.log("yt-dlp output:", stdout);
            console.log("Download finished");
        }
    });
}


module.exports = { download };
