function tbaUrl(dataUrl) {
    return (getSetting("baseurl") + dataUrl + "?X-TBA-Auth-Key=" + getSetting("apikey"));
}