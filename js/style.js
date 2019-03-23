function fixStream() {
    var baseheight = document.getElementById("infocol").offsetHeight;
    var currentfullheight = document.getElementById("vidcol").offsetHeight;
    var titleheight = document.getElementById("vidtitle").clientHeight;
    document.getElementById("streamFrame").height = baseheight - (2.25 * titleheight);
}

function showHideSponsers() {
    if (getSetting("showsponsers") == 1) {
        $("#sponrow").removeClass("hidden");
    } else {
        $("#sponrow").addClass("hidden");
    }
}