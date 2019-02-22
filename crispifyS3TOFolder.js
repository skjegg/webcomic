var sourceBaseUrl = "https://s3.amazonaws.com/webcomic-src/";
var current = 746;
var stop = 764;
var suffix = ".jpg";
// Get token from https://developer.cimpress.io/apis/graphics/imagemind?version=v2&environment=Prod%20V2#/Crispify/post_v2_imagemind_crispify
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qbENNemxCTnpneE1ETkJSVFpHTURFd09ETkRSalJGTlRSR04wTXpPRUpETnpORlFrUTROUSJ9.eyJodHRwczovL2NsYWltcy5jaW1wcmVzcy5pby93YXMiOlsiYWRmc3xqbW9uc3RhZEBjaW1wcmVzcy5jb20iXSwiaHR0cHM6Ly9jbGFpbXMuY2ltcHJlc3MuaW8vY2ltcHJlc3NfaW50ZXJuYWwiOnRydWUsImh0dHBzOi8vY2xhaW1zLmNpbXByZXNzLmlvL3RlbmFudHMiOlsiY2ltcHJlc3MiXSwiaHR0cHM6Ly9jbGFpbXMuY2ltcHJlc3MuaW8vZW1haWwiOiJqbW9uc3RhZEBjaW1wcmVzcy5jb20iLCJodHRwczovL2NsYWltcy5jaW1wcmVzcy5pby9jYW5vbmljYWxfaWQiOiJqbW9uc3RhZEBjaW1wcmVzcy5jb20iLCJpc3MiOiJodHRwczovL2NpbXByZXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3YWFkfGlUMVc5Q1AybndwUWY4YkhWY1Y4WUlrWjFMYnp5dTVLc05tcjdPSUZLdkkiLCJhdWQiOlsiaHR0cHM6Ly9hcGkuY2ltcHJlc3MuaW8vIiwiaHR0cHM6Ly9jaW1wcmVzcy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTUwODQ2OTc1LCJleHAiOjE1NTA4NjEzNzUsImF6cCI6IkcxN0hkTmQwMWdBUGZpU1Y1dXBiV2RpRFVuQVU4aXM5Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.IBLXW0pBMpsKUVfj_5eSzO4-QZzYNSEYjXBqG45PyAUo3Kr4XEf-tIgXdkGIFrBHYcP5sTuts6KkRLUzUpYhcQorUtww9ndPbm90nvM_77sx9x26AgQ-agjzM58FhuVisIhskzwMXuzqOEki3wKQ6VL7Ee-i6YWBu26sGeDBfVz-_VALu81CsGTygp61wYBgZNCwOv1dHQYpTTthsgRUOcKg8LrmEHKxQcpzWDbP62K_-Tox9CToKOy7898BPq3wjZorpCiTCxTroc1KOM2msJ_3w88oTsdaCFg8SXBX6d7JUB4GV3NRiRYSQiCzj7vlk8UrKjV9Hygz3PG27GPF3Q";
var crispifyEndPoint = "https://imagemind.ipa.cimpress.io/v2/imagemind/crispify"
var crispedDestination = "crispyimages/";


var fs = require('fs');
var request = require('request')


var crispit = function (sourceurl, current) {
    request.post(crispifyEndPoint, 
    {
       json: { 
           "input": {
            "url": sourceurl,
            "classificationType": "lineart"
        } 
    }
    }, 
    (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
        debugger;
        console.log(body.output.url);
        download(body.output.url, crispedDestination+current+suffix);
    }).auth('','',true, token);

}

var download = function(url, dest){
    request.get(url).pipe(fs.createWriteStream(dest));
}

var more = true;
while (more) {
    crispit(sourceBaseUrl +current +suffix, current);
    current++;
    if (current > stop) {
        more = false;
    }
}
