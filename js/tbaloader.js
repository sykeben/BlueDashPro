var subMatches = false;
var subLastMatchKey = "2016nytr_qm23";
var subNextMatchKey = "2016nytr_qm24";

function doOnLoad() {
    var streamUrl = getSetting("stream");
    // if (streamUrl != null) {
    //    $("#streamFrame").src = streamUrl;
    //}
    doInterval();
}

function doInterval() {
    loadEventData();
}

function formatTimeShow(h_24, m) {
    var h = h_24 % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ":" + m + (h_24 < 12 ? ' AM' : ' PM');
}

function loadEventData() {
    $.ajax({
        type: "GET",
        url: tbaUrl("/team/"+getSetting("teamkey")+"/event/"+getSetting("eventkey")+"/status"),
        dataType: "json",
        success: function(data) {
            loadTeamRank(data);
            loadTopRanks();
            loadLastMatch(data);
            loadNextMatch(data);
        }
    });
}

function loadTeamRank(data) {
    var element = document.getElementById("teamRanking");
    if (data != null) {
        var qualData = data.qual;
        if (qualData != null) {
            element.innerHTML = qualData.ranking.toString();
        } else {
            element.innerHTML = "?";
        }
    }
}

function loadTopRanks() {
    $.ajax({
        type: "GET",
        url: tbaUrl("/event/"+getSetting("eventkey")+"/rankings"),
        dataType: "json",
        success: function(data) {
            var rankData = data.rankings;
            if (data != null) {
                for (var i=0; (i<8) || (i<rankData.length); i++) {
                    document.getElementById("rankTeam"+(i+1).toString()).innerHTML = rankData[i].team_key.toString().replace("frc", "");
                    if (rankData[i].team_key.toString().replace("frc", "") == "5980") {
                        document.getElementById("rowTeam"+(i+1).toString()).style = "background-color: lightgreen;";
                    } else {
                        document.getElementById("rowTeam"+(i+1).toString()).style = "";
                    }
                }
            }
        }
    });
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
                
                var lastTime = new Date(data.time).toTimeString().split(" ")[0];
                document.getElementById("lastTime").innerHTML = formatTimeShow(parseInt(lastTime.split(":")[0]), lastTime.split(":")[1]);
                
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
                
                var nextTime = new Date(data.predicted_time).toTimeString().split(" ")[0];
                document.getElementById("nextTime").innerHTML = formatTimeShow(parseInt(nextTime.split(":")[0]), nextTime.split(":")[1]);
            }
        })
    }
}

window.onload = doOnLoad;
window.setInterval(doInterval, 5000);
