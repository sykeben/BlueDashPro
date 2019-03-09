// Don't touch the line below, it initializes the setting database:
var settingDB = [];

// TBA API key:
settingDB["apikey"] = "uwedWzxjzMoHNr1MGd7RvR2zBXodULH4cn0O8CGQomm2FrMZMfNYaYj9F7ExKEQx";

// TBA base URL:
settingDB["baseurl"] = "https://www.thebluealliance.com/api/v3";

// TBA team key (like "frc5980" for example):
settingDB["teamkey"] = "frc5980";

// Event key (like "2019wmi" for example):
settingDB["eventkey"] = "2019misjo";
// settingDB["eventkey"] = "2018miwmi";

// Stream URL (null for none):
settingDB["streamurl"] = "https://player.twitch.tv/?channel=FIRSTinMI03";

// Is the stream broken? (boolean):
settingDB["streambroken"] = false;

// Don't touch the function below, it retreives settings and passes them to where they're needed:
function getSetting(settingKey) {
    return settingDB[settingKey];
}
