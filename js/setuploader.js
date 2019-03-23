function loadSetup() {
	initSettings();
    
    if (getSetting("teamkey") != null) document.getElementsByName("input-teamkey")[0].value = getSetting("teamkey").toString();
    if (getSetting("eventkey") != null) document.getElementsByName("input-eventkey")[0].value = getSetting("eventkey").toString();
    if (getSetting("streamurl") != "[none]" || getSetting("streamurl") != null) document.getElementsByName("input-streamurl")[0].value = getSetting("streamurl").toString();
    if (getSetting("showsponsers") == 1) $("#input-showsponsers").prop("checked", true);
    
    document.getElementById("value-apikey").innerHTML = getSetting("apikey");
    document.getElementById("value-baseurl").innerHTML = getSetting("baseurl");
}

function checkMod() {
    var modded = false;
    if (getSetting("teamkey") != document.getElementsByName("input-teamkey")[0].value) modded = true;
    if (getSetting("eventkey") != document.getElementsByName("input-eventkey")[0].value) modded = true;
    if (document.getElementsByName("input-streamurl")[0].value != "[none]" || document.getElementsByName("input-streamurl")[0].value != "") {
        if (getSetting("streamurl") != document.getElementsByName("input-streamurl")[0].value) modded = true;
    }
    if (getSetting("showsponsers") == 0) {
        if ($("#input-showsponsers").prop("checked")) modded = true;
    } else {
        if (!$("#input-showsponsers").prop("checked")) modded = true;
    }
    
    if (modded) {
        document.getElementById("mod-status").innerHTML = "Modified, ";
        document.getElementById("save-status").innerHTML = "not saved.";
    }
}

window.onload = loadSetup;
window.setInterval(checkMod, "1000");