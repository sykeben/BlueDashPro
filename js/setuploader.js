function loadsetup() {
    unlockedSettings = document.getElementById("unlockedSettings");
    lockedSettings = document.getElementById("lockedSettings");
    
    unlockedSettings.innerHTML = "";
    lockedSettings.innerHTML = "";
    
    unlockedSettings.innerHTML += "<p>None found.</p>";
    
    lockedSettings.innerHTML += "<p>These are in /js/settings.js</p>";
    lockedSettings.innerHTML += "<ul>";
    lockedSettings.innerHTML += "<li><strong>API Key:</strong> " + getSetting("apikey") + "</li>";
    lockedSettings.innerHTML += "<li><strong>Base URL:</strong> <a class=\"text-body\" href=\"" + getSetting("baseurl") + "\">" + getSetting("baseurl") + "</a></li>";
    lockedSettings.innerHTML += "<li><strong>Team Key:</strong> " + getSetting("teamkey") + "</li>";
    lockedSettings.innerHTML += "<li><strong>Event Key:</strong> " + getSetting("eventkey") + "</li>";
    lockedSettings.innerHTML += "<li><strong>Stream URL:</strong> <a class=\"text-body\" href=\"" + getSetting("streamurl") + "\">" + getSetting("streamurl") + "</a></li>";
    lockedSettings.innerHTML += "<li><strong>Stream Broken?</strong> " + getSetting("streambroken").toString() + "</li>";
}

window.onload = loadsetup;