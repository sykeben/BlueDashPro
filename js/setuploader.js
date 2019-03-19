function loadSetup() {
    
    if (getSetting("teamkey") != null) document.getElementsByName("input-teamkey")[0].value = getSetting("teamkey").toString();
    if (getSetting("eventkey") != null) document.getElementsByName("input-eventkey")[0].value = getSetting("eventkey").toString();
    if (getSetting("streamurl") != "[none]" || getSetting != null) document.getElementsByName("input-streamurl")[0].value = getSetting("streamurl").toString();
    
    document.getElementById("value-apikey").innerHTML = getSetting("apikey");
    document.getElementById("value-baseurl").innerHTML = getSetting("baseurl");
}

window.onload = loadSetup;