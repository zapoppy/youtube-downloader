const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

function ytdlpPath() {
    const platform = process.platform === "win32" ? "windows" : "linux";
    const filename = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
    
    // Try development path first
    const devPath = path.join(__dirname, "resources", "bin", platform, filename);
    if (fs.existsSync(devPath)) {
        return devPath;
    }
    
    // If not found, try production path
    const prodPath = path.join(process.resourcesPath, "bin", platform, filename);
    return prodPath;
}

function download(url, outputDir, title, format) {
    const ytDlp = ytdlpPath();
    console.log("Using yt-dlp at:", ytDlp); // Debug log
    
    const cmd = `"${ytDlp}" -t "${format}" "${url}" -P "${outputDir}" -o "${title}"`;
    
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