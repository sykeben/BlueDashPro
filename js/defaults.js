var defaults = [];
defaults["teamkey"] = "frc5980";
defaults["eventkey"] = "2019miwmi";
defaults["streamurl"] = "[auto]";
defaults["showsponsers"] = 1;
defaults["sponserpics"] = [
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/1.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/2.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/3.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/4.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/5.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/6.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/7.png",
    "https://github.com/sykeben/BlueDashPro/raw/master/img/sponsers/8.png"
];

function loadDefaults(loadsetup) {
    initSettings();
    setSetting("teamkey", defaults["teamkey"]);
    setSetting("eventkey", defaults["eventkey"]);
    setSetting("showsponsers", defaults["showsponsers"]);
    setSetting("sponserpics", JSON.stringify(defaults["sponserpics"]));
    if (loadsetup) loadSetup();
    if (defaults["streamurl"] == "[auto]") {
        doTryGetStreamCustomEvent(defaults["eventkey"], false);
    } else {
        setSetting("streamurl", defaults["showsponsers"]);
    }
    doSave();
    if (loadsetup) loadSetup();
    doSave();
}