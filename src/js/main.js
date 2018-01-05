const ipc = require('electron').ipcRenderer

const selectDirBtn = document.getElementById('loadFileBtn')

selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function (event, path) {
  //document.getElementById('selected-file').innerHTML = `You selected: ${path}`
  processFile(path[0])
})


function processFile(filename){
  {
  let fs = require('fs');
  let contents = fs.readFileSync(filename, 'utf8');
  contents = contents.toLowerCase();
  let pun = contents.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+\"]/g, '');
  pun = pun.replace(/[\n]/g,' ');

  var wordArray = pun.split(' ');

  }

  wordArray.sort();

  wordCount = {};




}
