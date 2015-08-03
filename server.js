var formidable = require('formidable')
var http = require('http')
var util = require('util')
var fs = require('fs-extra')
var static = require('node-static')

// Start a static server in root;
var file = new(static.Server)();

http.createServer(function(req, res) {

  file.serve(req, res);

  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // Grab incoming file.
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      console.log("-----------------")
      console.log(fields)
      console.log("-----------------")
      // Use read  data to parse the file into binary data.
      fs.readFile(files.userPicture.path, function (err, data) {
        // Write the binary data to file
        fs.writeFile("uploads/" + files.userPicture.name, data, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('File saved!');
          }
        });
      });

      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }
}).listen(3030);