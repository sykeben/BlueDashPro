var subMatches = false;
var subLastMatchKey = "2019migib_qm23";
var subNextMatchKey = "2019migib_qm30";

function doOnLoad() {
    var streamUrl = getSetting("stream");
    if (streamUrl != null) {
        $("#streamFrame").src = streamUrl;
    }
    doInterval();
}

function doInterval() {
    loadEventData();
}

function loadEventData() {
    $.ajax({
        type: "GET",
        url: tbaUrl("/team/"+getSetting("teamkey")+"/event/"+getSetting("eventkey")+"/status"),
        dataType: "json",
        success: function(data) {
            loadRank(data);
            loadLastMatch(data);
            loadNextMatch(data);
        }
    });
}

function loadRank(data) {
    var element = document.getElementById("ranking");
    var qualData = data.qual;
    if (qualData != null) {
        element.innerHTML = qualData.ranking.toString();
    } else {
        element.innerHTML = "?";
    }
}

function loadLastMatch(data) {
    if (subMatches) {
        var lastMatchKey = subLastMatchKey;
    } else {
        var lastMatchKey = data.last_match_key;
    }
    if (lastMatchKey != null) {
        $.ajax({
            type: "GET",
            url: tbaUrl("/match/"+lastMatchKey+"/simple"),
            dataType: "json",
            success: function(data) {
                document.getElementById("lastRedScore").innerHTML = data.alliances.red.score.toString();
                document.getElementById("lastBlueScore").innerHTML = data.alliances.blue.score.toString();
                
                document.getElementById("lastRed1").innerHTML = data.alliances.red.team_keys[0].toString().replace("frc", "");
                document.getElementById("lastRed2").innerHTML = data.alliances.red.team_keys[1].toString().replace("frc", "");
                document.getElementById("lastRed3").innerHTML = data.alliances.red.team_keys[2].toString().replace("frc", "");
                
                document.getElementById("lastBlue1").innerHTML = data.alliances.blue.team_keys[0].toString().replace("frc", "");
                document.getElementById("lastBlue2").innerHTML = data.alliances.blue.team_keys[1].toString().replace("frc", "");
                document.getElementById("lastBlue3").innerHTML = data.alliances.blue.team_keys[2].toString().replace("frc", "");
                
                document.getElementById("lastMatchNumber").innerHTML = data.match_number.toString();
                document.getElementById("lastTime").innerHTML = new Date(data.time).toTimeString().split(" ")[0];
                
                if (data.winning_alliance == "red") {
                    $("#lastWinBlue").addClass("d-none");
                    $("#lastWinRed").removeClass("d-none");
                    document.getElementById("lastWinBlue").addClass("d-none");
                } else if (data.winning_alliance == "blue") {
                    $("#lastWinBlue").removeClass("d-none");
                    $("#lastWinRed").addClass("d-none");
                }
            }
        });
    }
}

function loadNextMatch(data) {
    if (subMatches) {
        var nextMatchKey = subNextMatchKey;
    } else {
        var nextMatchKey = data.next_match_key;
    }
    if (nextMatchKey != null) {
        $.ajax({
            type: "GET",
            url: tbaUrl("/match/"+nextMatchKey+"/simple"),
            dataType: "json",
            success: function(data) {
                document.getElementById("nextRed1").innerHTML = data.alliances.red.team_keys[0].toString().replace("frc", "");
                document.getElementById("nextRed2").innerHTML = data.alliances.red.team_keys[1].toString().replace("frc", "");
                document.getElementById("nextRed3").innerHTML = data.alliances.red.team_keys[2].toString().replace("frc", "");
                
                document.getElementById("nextBlue1").innerHTML = data.alliances.blue.team_keys[0].toString().replace("frc", "");
                document.getElementById("nextBlue2").innerHTML = data.alliances.blue.team_keys[1].toString().replace("frc", "");
                document.getElementById("nextBlue3").innerHTML = data.alliances.blue.team_keys[2].toString().replace("frc", "");
                
                document.getElementById("nextMatchNumber").innerHTML = data.match_number.toString();
                document.getElementById("nextTime").innerHTML = new Date(data.predicted_time).toTimeString().split(" ")[0];
            }
        })
    }
}

window.onload = doOnLoad;
window.setInterval(doInterval, 5000);