function loadSetup() {
	initSettings();
    
    if (getSetting("teamkey") != null) document.getElementsByName("input-teamkey")[0].value = getSetting("teamkey").toString();
    if (getSetting("eventkey") != null) document.getElementsByName("input-eventkey")[0].value = getSetting("eventkey").toString();
    if (getSetting("streamurl") != null) {
        if (getSetting("streamurl") != "[none]") document.getElementsByName("input-streamurl")[0].value = getSetting("streamurl").toString();
    }
    if (getSetting("showsponsers") == 1) $("#input-showsponsers").prop("checked", true);
    $("#input-sponserpics").val(null);
    var oldsponserpics = JSON.parse(getSetting("sponserpics"));
    for (var i=0; i<oldsponserpics.length; i++) {
        var leader = "";
        if (i > 0) leader = "\n";
        document.getElementsByName("input-sponserpics")[0].value += leader + oldsponserpics[i];
    }
    
    document.getElementById("value-apikey").innerHTML = "<i>Hidden.</i>";
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
    if (getSetting("sponserpics") != JSON.stringify(document.getElementsByName("input-sponserpics")[0].value.split("\n"))) modded = true;
    
    if (modded) {
        document.getElementById("mod-status").innerHTML = "Modified, ";
        document.getElementById("save-status").innerHTML = "Not saved.";
    }
}

function loadDefaultPics() {
    var defaultpics = [];
    defaultpics[0] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/1.png";
    defaultpics[1] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/2.png";
    defaultpics[2] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/3.png";
    defaultpics[3] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/4.png";
    defaultpics[4] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/5.png";
    defaultpics[5] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/6.png";
    defaultpics[6] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/7.png";
    defaultpics[7] = "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/8.png";
    
    $("#input-sponserpics").val(null);
    for (var i=0; i<defaultpics.length; i++) {
        var leader = "";
        if (i > 0) leader = "\n";
        document.getElementsByName("input-sponserpics")[0].value += leader + defaultpics[i];
    }
}

window.onload = loadSetup;
window.setInterval(checkMod, "1000");