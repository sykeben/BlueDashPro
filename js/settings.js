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
    
    if ($("#input-showsponsers:checked").prop("checked")) {
        setSetting("showsponsers", 1);
    } else {
        setSetting("showsponsers", 0);
    }
    
    var sponserpics = document.getElementsByName("input-sponserpics")[0].value.split("\n");
    setSetting("sponserpics", JSON.stringify(sponserpics));
    
    document.getElementById("save-status").innerHTML = "Saved.";
}

function doTryGetStreamCustomEvent(eventkeything, enablechange) {
    $.ajax({
        type: "GET",
        url: tbaUrl("/event/"+eventkeything),
        dataType: "json",
        success: function(data) {
            var webcasts = data.webcasts;
            var foundcast = false;
            var newcast = "";
            for (var i=0; i<webcasts.length; i++) {
                if (webcasts[i].type == "twitch") {
                    newcast = "https://player.twitch.tv/?channel=" + webcasts[i].channel.toLowerCase();
                    foundcast = true;
                    break;
                }
            }
            if (enablechange) {
                if (foundcast) {
                    document.getElementsByName("input-streamurl")[0].value = newcast;
                    document.getElementById("autofetch-status").innerHTML = "Successful.";
                } else {
                    document.getElementById("autofetch-status").innerHTML = "Failed.";
                }
            } else {
                if (foundcast) {
                    setSetting("streamurl", newcast);
                } else {
                    setSetting("streamurl", "[none]");
                }
            }
        }
    });
}

function doTryGetStream() {
    doTryGetStreamCustomEvent(document.getElementsByName("input-eventkey")[0].value, true);
}

window.onload = initSettings;