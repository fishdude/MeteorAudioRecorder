if(Meteor.isClient){

  var audio_context;
  var recorder;

  function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');
    
    input.connect(audio_context.destination);
    __log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log('Recorder initialised.');
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var div = document.createElement('div');
      
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      var btn = document.createElement('INPUT')
      
      btn.setAttribute("type","button");
      btn.setAttribute("value","Save");
      btn.setAttribute("class","btn btn-primary btn-mini");

      au.controls = true;
      au.src = url;
      hf.href = url;

      hf.download = new Date().toISOString() + '.wav';
      //hf.innerHTML = hf.download;
      div.appendChild(au);
      
      div.appendChild(hf);
      div.appendChild(btn);

      
      //recordingOptions.appendChild(btn);
      recordingslist.appendChild(div);
      
    });
  }


  window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });
  };



  Template.recorder.events = {
    'click #record': function(){
      recorder && recorder.record();
      record.disabled = true;
      record.nextElementSibling.disabled = false;
      __log('Recording...');
    },
    'click #stop': function(){
      recorder && recorder.stop();
      stop.disabled = true;
      record.disabled = false;
      __log('Stopped recording.');
    
    
      createDownloadLink();
    
      recorder.clear();
    }
  }

}

  