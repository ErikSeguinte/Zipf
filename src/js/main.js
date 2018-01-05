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
  var fs = require('fs');
  var contents = fs.readFileSync(filename, 'utf8');
console.log(contents);
}
