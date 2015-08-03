var doc = document.documentElement;

doc.ondragover = function () {
  this.className = 'hover'
  console.log("durr")
  return false
}

doc.ondragend = function () {
  this.className = ''
  console.log("durr1")
  return false
}

doc.ondrop = function (event) {
  event.preventDefault && event.preventDefault()
  this.className = ''

  // now do something with: 
  var files = event.dataTransfer.files;

  formData = new FormData();

  for (var i = 0; i < files.length; i++) {
    formData.append('userPicture', files[i]);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('all done: ' + xhr.status);
    } else {
      console.log('Something went terribly wrong...');
    }
  };
  
  xhr.send(formData);




  console.log(formData)

  return false;
}

