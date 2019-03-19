function initSettings() {
    setSetting("apikey", "uwedWzxjzMoHNr1MGd7RvR2zBXodULH4cn0O8CGQomm2FrMZMfNYaYj9F7ExKEQx");
    setSetting("baseurl", "https://www.thebluealliance.com/api/v3");
}

function getSetting(settingKey) {
    return localStorage.getItem(settingKey.toString());
}

function setSetting(settingKey, data) {
    localStorage.setItem(settingKey.toString(), data);
}

function doSave() {
    setSetting("teamkey", document.getElementsByName("input-teamkey")[0].value);
    setSetting("eventkey", document.getElementsByName("input-eventkey")[0].value);
    if (document.getElementsByName("input-streamurl")[0].value.length < 1) {
        setSetting("streamurl", "[none]");
    } else {
        setSetting("streamurl", document.getElementsByName("input-streamurl")[0].value);
    }
    
    document.getElementById("save-status").innerHTML = "Saved.";
}

window.onload = initSettings;