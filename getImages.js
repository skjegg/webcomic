
var baseUrl = "http://inverloch.seraph-inn.com/pages/";
var current = 746;
var stop = 764;
var suffix = ".jpg";

var destination = "images/";

var http = require('http');
var fs = require('fs');

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb);
      });
    });
  };

var more = true;
while(more){
    download(baseUrl+current+suffix, destination+current+suffix);

    current++;
    if(current>stop){
        more = false;
    }
}