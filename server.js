var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra');

 
http.createServer(function(req, res) {
  console.log(req.files)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    console.log('/upload')
    // parse a file upload 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      // console.log(files)
      // console.log(typeof files)
      console.log(files)

      fs.readFile(files.userPicture.path, function (err, data) {
        fs.writeFile(files.userPicture.name, data, function (err) {
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
 
  // show a file upload form 
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="userPicture" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(3030);