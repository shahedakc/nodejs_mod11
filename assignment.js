const fs = require("fs")
//const prompt = require('prompt-sync')
const prompt = require('prompt');

function setFileName(name, callback) {
    getFileNames((files) => {
        fs.writeFile("./files.json", JSON.stringify([...files, name]), (err, response) => {
            callback()
        })
    })
}

function getFileNames(callback) {
    fs.readFile("./files.json", "utf-8", (err, response) => {
        callback(JSON.parse(response))
    })
}

function promptUser() {
    prompt.get(['file'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log(result);
        try {
            getFileNames((allFiles) => {
                console.log(allFiles)
                if (allFiles.includes(result.file)) {
                    console.log("The file exists");
                    promptUser();
                } else {
                    console.log('The file does not exist.');
                    fs.writeFile(result.file, 'You are Awesome!!!', function (err) {
                        if (err) throw err;
                        setFileName(result.file, ()=>{})
                    })
                }
            })
        } catch (err) {
            console.error(err);
        }
    });
}

prompt.start();

// run code.
promptUser();