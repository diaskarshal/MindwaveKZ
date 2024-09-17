/* BEGIN SCRIPT FOR RECORDING SCREEN */
let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");

let arrMindwaves = [];
let recordingData = false;

function log(msg) {
  logElement.innerHTML += msg + "\n";
}

function startRecording(stream) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
    
  let stopped = new Promise((resolve, reject) => {        
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });
 
	
  let recorded = stream.getVideoTracks()[0].onended = function(){    
    return recorder.stop()    
  }

  console.log('Start recording...');
  arrMindwaves = []; // clean array of qualities and attentions
  recordingData = true;
  
  return Promise.all([stopped, recorded]).then(() => data);
}
function stopStream(stream) {
  stream.getTracks().forEach((track) => track.stop());
}
function convertSeconds(totalSeconds) {
  var seconds = Math.floor(totalSeconds % 60);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);										
  if(hours<10) hours='0'+hours
  if(minutes<10) minutes='0'+minutes
  if(seconds<10) seconds='0'+seconds					
  return `${hours}:${minutes}:${seconds},00`;
}
startButton.addEventListener(
  "click",
  function () {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        preview.srcObject = stream;
        downloadButton.href = stream;
        preview.captureStream =
          preview.captureStream || preview.mozCaptureStream;
        return new Promise((resolve) => (preview.onplaying = resolve));
      })
      .then(() => startRecording(preview.captureStream()))
      .then((recordedChunks) => {        
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        
        var subjectID=document.querySelector("#subjectID").value;        
        var now = new Date();        
        var fileName=`Subject${subjectID}_${now.getDate()}_${now.getMonth()+1}_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`        
        downloadButton.download = `${fileName}.webm`;
        document.querySelector('#fileName').innerHTML=`Имя файла: ${fileName}.webm`;
        
        console.log('Recording is finished.');
        console.log(arrMindwaves);
        recordingData = false;

        let srtTxt = "";
        for(let i=2; i<arrMindwaves.length; i++){          
          srtTxt += `${i-1}\n${convertSeconds(i-2)} --> ${convertSeconds(i-1)}\nКачество сигнала: ${arrMindwaves[i].quality}% Внимание: ${arrMindwaves[i].attention}%\n\n`                               
        }        

        var blob = new Blob([srtTxt], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.srt`);
          

        log(
          "Успешно записано " +
            recordedBlob.size +
            " байт в формате " +
            recordedBlob.type            
        );
      })
      .catch(log);
  },
  false
);
stopButton.addEventListener(
  "click",
  function () {
    stopStream(preview.srcObject);
  },
  false
);

/* END SCRIPT FOR RECORDING SCREEN */

/* BEGIN SCRIPT FOR WEB BLUETOOTH */
var deviceName = 'MLT-BT05'
var bleService = '0000ffe0-0000-1000-8000-00805f9b34fb'
var bleCharacteristic = '0000ffe1-0000-1000-8000-00805f9b34fb'
var bluetoothDeviceDetected
var gattCharacteristic

function connectBLE() {            
  if(document.querySelector('#statusOfConnection').innerHTML == 'Подключить') {    
    if(bluetoothDeviceDetected){
      start();
    }else{
      read();   
    }                 
  } else {
    stop();
  }
}

function isWebBluetoothEnabled() {
  if (!navigator.bluetooth) {
    alert('Web Bluetooth API is not available in this browser!')
    return false
  }

  return true
}

function getDeviceInfo() {
  let options = {
    optionalServices: [bleService],
    filters: [
      { "name": deviceName }
    ]
  }

  console.log('Requesting any Bluetooth Device...')
  return navigator.bluetooth.requestDevice(options).then(device => {
    bluetoothDeviceDetected = device
  }).catch(error => {
    console.log('Argh! ' + error)
  })
}

function read() {
  return (bluetoothDeviceDetected ? Promise.resolve() : getDeviceInfo())
  .then(connectGATT)
  .then(_ => {          
    return gattCharacteristic.readValue()
  })
  .catch(error => {
    console.log('Waiting to start reading: ' + error)
  })
}


function connectGATT() {
  if (bluetoothDeviceDetected.gatt.connected && gattCharacteristic) {
    return Promise.resolve()
  }

  return bluetoothDeviceDetected.gatt.connect()
  .then(server => {
    console.log('Getting GATT Service...')
    return server.getPrimaryService(bleService)
  })
  .then(service => {
    console.log('Getting GATT Characteristic...')
    return service.getCharacteristic(bleCharacteristic)
  })
  .then(characteristic => {
    gattCharacteristic = characteristic
    gattCharacteristic.addEventListener('characteristicvaluechanged', handleChangedValue)
    start();       
  })
}

let arr=[];
let quality = 0;
let attention = "---";

function handleChangedValue(event) {                
  let v = event.target.value;
  if(v.getUint8(0)==170) arr=[];

  for(i=0; i<v.byteLength; i++) {          
    arr.push(v.getUint8(i))
  }
  
  if(arr.length==36){                       
    generatedChecksum = 0x00;           
    for(let i=3; i<35; i++) generatedChecksum += arr[i];          
    if((~generatedChecksum & 0xFF) == arr[35]){
      quality = Math.round(100-(arr[arr.indexOf(2)+1]/2));
      attention = arr[arr.lastIndexOf(4)+1];          
      if(quality != 100) attention = "---";
      console.log("Quality:",quality,"Attention:",attention);
      document.querySelector('#quality').innerHTML = quality + " %";
      document.querySelector('#attention').innerHTML = attention + " %";
      if(recordingData) arrMindwaves.push({quality:quality,attention:attention});
    }                              
  }                
}

function start() {
  gattCharacteristic.startNotifications()
  .then(_ => {
    console.log('Start reading...')   
    document.querySelector('#statusOfConnection').innerHTML = 'Отключить'; 
    document.querySelector('#statDevice').innerHTML="Устройство подключено";
  })
  .catch(error => {
    console.log('[ERROR] Start: ' + error)
  })
}

function stop() {
  gattCharacteristic.stopNotifications()
  .then(_ => {
    console.log('Stop reading...')    
    document.querySelector('#statusOfConnection').innerHTML = 'Подключить'; 
    document.querySelector('#statDevice').innerHTML="Устройство не подключено";
  })
  .catch(error => {
    console.log('[ERROR] Stop: ' + error)
  })
}
/* END SCRIPT FOR WEB BLUETOOTH */

