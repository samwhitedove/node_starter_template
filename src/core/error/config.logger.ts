import fs from 'fs';

const filePath = './src/log.txt';

export function ILogError(content: String) {
    const info = `${new Date().toUTCString()}: ${content}`;
    fs.appendFile(filePath, info, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            throw "Error while writting to file"
        } else {
            console.log('Successfully wrote to file.');
        }
    });
}