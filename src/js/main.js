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

	var wordCount = {};

	var oldWord = wordArray[0];

	wordCount[oldWord] = 0;


	for ( let word of wordArray) {
		if (word === oldWord) {
			wordCount[word] += 1;
		} else {
			wordCount[word] = 1;
			oldWord = word;
		}


	}

	console.log(wordCount)
}
