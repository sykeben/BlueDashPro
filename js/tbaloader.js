var subMatches = false;
var subLastMatchKey = "2016nytr_qm23";
var subNextMatchKey = "2016nytr_qm24";

function doOnLoad() {
    var streamUrl = getSetting("streamurl");
    if (streamUrl != null) {
        document.getElementById("streamFrame").src = streamUrl;
    }
    if (getSetting("streambroken")) {
        document.getElementById("streamFrame").src = "streamerror/broken.html";
    }
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
            element.innerHTML = qualData.ranking.rank.toString();
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
                for (var i=0; i<8; i++) {
                    document.getElementById("rankTeam"+(i+1).toString()).innerHTML = rankData[i].team_key.toString().replace("frc", "");
                    if (rankData[i].team_key.toString().replace("frc", "") == getSetting("teamkey").toString().replace("frc", "")) {
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
                
                var tempTeamNumber = 0; var tempStart = ""; var tempEnd = "";
                for (var i=0; i<3; i++) {
                    tempTeamNumber = data.alliances.red.team_keys[i].toString().replace("frc", "");
                    if (tempTeamNumber == getSetting("teamkey").toString().replace("frc", "")) {
                        tempStart = "<u><strong>"; tempEnd = "</strong></u>";
                    } else {
                        tempStart = ""; tempEnd = "";
                    }
                    document.getElementById("lastRed"+(i+1).toString()).innerHTML = tempStart + tempTeamNumber + tempEnd;
                }
                for (var i=0; i<3; i++) {
                    tempTeamNumber = data.alliances.blue.team_keys[i].toString().replace("frc", "");
                    if (tempTeamNumber == getSetting("teamkey").toString().replace("frc", "")) {
                        tempStart = "<u><strong>"; tempEnd = "</strong></u>";
                    } else {
                        tempStart = ""; tempEnd = "";
                    }
                    document.getElementById("lastBlue"+(i+1).toString()).innerHTML = tempStart + tempTeamNumber + tempEnd;
                }
                
                document.getElementById("lastMatchNumber").innerHTML = data.match_number.toString();
                
                if (data.winning_alliance == "red") {
                    $("#lastWinBlue").addClass("d-none");
                    $("#lastWinRed").removeClass("d-none");
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
                var tempTeamNumber = 0; var tempStart = ""; var tempEnd = "";
                for (var i=0; i<3; i++) {
                    tempTeamNumber = data.alliances.red.team_keys[i].toString().replace("frc", "");
                    if (tempTeamNumber == getSetting("teamkey").toString().replace("frc", "")) {
                        tempStart = "<u><strong>"; tempEnd = "</strong></u>";
                    } else {
                        tempStart = ""; tempEnd = "";
                    }
                    document.getElementById("nextRed"+(i+1).toString()).innerHTML = tempStart + tempTeamNumber + tempEnd;
                }
                for (var i=0; i<3; i++) {
                    tempTeamNumber = data.alliances.blue.team_keys[i].toString().replace("frc", "");
                    if (tempTeamNumber == getSetting("teamkey").toString().replace("frc", "")) {
                        tempStart = "<u><strong>"; tempEnd = "</strong></u>";
                    } else {
                        tempStart = ""; tempEnd = "";
                    }
                    document.getElementById("nextBlue"+(i+1).toString()).innerHTML = tempStart + tempTeamNumber + tempEnd;
                }
                
                document.getElementById("nextMatchNumber").innerHTML = data.match_number.toString();
            }
        })
    }
}

window.onload = doOnLoad;
window.setInterval(doInterval, 5000);
