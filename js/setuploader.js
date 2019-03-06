function loadsetup() {
    unlockedSettings = document.getElementById("unlockedSettings");
    lockedSettings = document.getElementById("lockedSettings");
    
    unlockedSettings.innerHTML = "";
    lockedSettings.innerHTML = "";
    
    unlockedSettings.innerHTML += "<p>None found.</p>";
    
    lockedSettings.innerHTML += "<p>These are in /js/settings.js</p>";
    lockedSettings.innerHTML += "<ul>";
    lockedSettings.innerHTML += "<li><strong>API Key:</strong> " + getSetting("apikey") + "</li>";
    lockedSettings.innerHTML += "<li><strong>Base URL:</strong> " + getSetting("baseurl") + "</li>";
    lockedSettings.innerHTML += "<li><strong>Team Key:</strong> " + getSetting("teamkey") + "</li>";
}

window.onload = loadsetup;