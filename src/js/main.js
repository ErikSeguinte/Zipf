"use strict";
const ipc = require('electron').ipcRenderer

const selectDirBtn = document.getElementById('loadFileBtn')

selectDirBtn.addEventListener('click', function (event) {
	ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function (event, path) {
	//document.getElementById('selected-file').innerHTML = `You selected: ${path}`
	var words = processFile(path[0])

	writeHTML(words);
})


function processFile(filename) {
	{
		let fs = require('fs');
		let contents = fs.readFileSync(filename, 'utf8');
		contents = contents.toLowerCase();
		let cleaned = contents.replace(/[\u201C\u201D]/g, '"')
		cleaned = cleaned.replace(/\.\.\./g,' '); 
		cleaned = cleaned.replace(/[—-]/g,' '); 
		cleaned = cleaned.replace(/'s\b/g, ' ');
		cleaned = cleaned.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+\"\t…]/g, '');
		cleaned = cleaned.replace(/[\n\r]/g, ' ');

		var wordArray = cleaned.split(' ');

	}

	wordArray.sort();
	var uniqueArray = []

	var wordCount = {};


	var oldWord = wordArray[0];
	oldWord = oldWord.trim();

	wordCount[oldWord] = 0;
	uniqueArray.push(oldWord)



	for (let word of wordArray) {
		word = word.trim()
		if (word === "") {
			continue;
		} else if (word === oldWord) {
			wordCount[word] += 1;
		} else {
			wordCount[word] = 1;
			oldWord = word;
			uniqueArray.push(word);
		}


	}

	uniqueArray.sort((a, b) => {
		return wordCount[b] - wordCount[a];
	})

	console.log(uniqueArray)

	return [uniqueArray, wordCount]
}

function writeHTML(words) {
	var unique = words[0]
	var count = words[1]

	var section = document.getElementById('words');
	section.innerHTML = "";

	let i = 0
	for (let word of unique) {
		i++;
		let newHTML = i + ": " + word + ': ' + count[word] + '<br>';

		section.insertAdjacentHTML('beforeend', newHTML);
	}

}
