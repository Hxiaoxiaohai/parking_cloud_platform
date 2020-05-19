//switch profile
var profile = "dev";

//check profile
var url = "";
if (profile == "local") {
    url = "http://127.0.0.1:8080";
} else if (profile == "dev") {
    url = "http://192.168.1.30:8080";
} else if (profile == "pro") {
    url = "https://www.xyzparking.com";
}