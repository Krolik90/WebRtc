/*
 ps-webrtc-mediastream.js
 Author: Lisa Larson-Kelley (http://learnfromlisa.com)
 WebRTC Fundamentals -- Pluralsight.com
 Version 1.0.0
 --
 Example of MediaStream API: getUserMedia
*/

var ctx;
var canvas;
var video;
var dataURI;

navigator.getWebcam = ( navigator.getUserMedia ||
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

