import { Queue } from "../Queue";
import { Queues } from "../Queues";
import ws = require("ws");

import http = require('http');
import fs = require('fs');
import path = require('path');

const httpPort = 8080;

http.createServer(function (request, response) {
    console.log('http server requesting: ' + request.url);

    var filePath = 'dist/client' + request.url;
    if (filePath == 'dist/client/')
        filePath = 'dist/client/index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '':
            filePath = './index.html';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            console.log(error); //TODO handle this properly
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(httpPort);
console.log('http server listening on port ' + httpPort);

let queues : Queues = new Queues([]);

const wsPort = 8081;
let wss = new ws.Server({port : wsPort});
let clients : ws[] = [];

let currentId = 0;

function sendToAll(message : any) {
    let toSend = JSON.stringify(message);
    for(let client of clients) {
        client.send(toSend);
    }
}

function newQueue(message : string, name : string) {
    let newQueue = new Queue(message, currentId++, [name]);
    queues.pushQueue(newQueue);
    sendToAll({ command : "newQueue", queue : newQueue });
}

function toggleJoin(user : string, queueId : number) {
    queues.toggleJoin(queueId, user);
    sendToAll({ command : "toggleJoin", id : queueId, name : user });
}

function deleteQueue(queueId : number) {
    queues.deleteQueue(queueId);
    sendToAll({ command : "deleteQueue", id : queueId });
}

wss.on("connection", (client) => {
    console.log("received connection over websockets");
    client.on('message', data => {
        console.log("received over websockets: " + data);
        let json = JSON.parse(data);
        if (json.command == "newQueue") {
            newQueue(json.message, json.name);
        } else if (json.command == "toggleJoin") {
            toggleJoin(json.name, json.queueId);
        } else if (json.command == "deleteQueue") {
            deleteQueue(json.queueId);
        } else {
            console.log("invalid command: " + json.command);
        }
    });
    client.on('close', () => {
        let index = clients.indexOf(client);
        console.log("removing: " + index);
        clients.splice(index, 1); 
    });
    client.send(JSON.stringify({command: "allQueues", queues: queues.queues}));
    clients.push(client);
});

console.log("backend");