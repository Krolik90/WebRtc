
var ctx;
var canvas;
var video;
var dataURI;
var serverUrl = 'https://twfphotouploader.azurewebsites.net/api/HttpTrigger1';

navigator.getWebcam = ( navigator.getUserMedia ||
                        navigator.mediaDevices.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

navigator.getWebcam(
    //constraints 
    { video: true, audio: false}, 

    //successCallback
    gotWebcam,

    //errorCallback
	function(err) {
      console.log("Oops! Something's not right." + err);
    });

function gotWebcam(stream) {
    //  var data = [];
    //  data.push(stream);
    //  localVideo.src = window.URL.createObjectURL(new Blob(data, {type: "application/zip"}));
     localVideo.srcObject = stream;
     this.video = localVideo;

     //Display some of the attributes of the MediaStream and MediaStreamTrack
     //First, reach into the MediaStream object to access info about the MediaStreamTrack
     var video_track = stream.getVideoTracks()[0];
     //Show this info in a div
     var output = document.getElementById('output');
     //Print ID of the MediaStream object
     output.innerHTML = "stream id = " + stream.id + "<BR>";
     //Print info about the MediaStreamTrack
     output.innerHTML += "track readyState = " + video_track.readyState + "<BR>";
     output.innerHTML += "track id = " + video_track.id + "<BR>";
     output.innerHTML += "kind = " + video_track.kind + "<BR>";
     var promise = document.querySelector('video').play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
    createCanvas();
    //setCanvasSize(this.video.videoWidth, this.video.videoHeight);
};

// function playVideo() {
//  this.video.play();
// }
function setCanvasSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
}

function createCanvas() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
}

function captureImage() {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.dataURI = this.canvas.toDataURL('image/jpeg');
    var screenshot = document.querySelector('#screenshot');
    screenshot.src = dataURI;
}

function postJpeg() {
    var blobdata = createBlob(this.dataURI);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('success');
        }
    }
    xhttp.open('POST', this.serverUrl, true);
    xhttp.send(blobdata);
}

function createBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
  
    var uInt8Array = new Uint8Array(rawLength);
  
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }

