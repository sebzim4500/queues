import { Queue } from "../Queue";
import ws = require("ws");

import http = require('http');
import fs = require('fs');
import path = require('path');

const httpPort = 8080;

http.createServer(function (request, response) {
    console.log('http server requesting: ' + request.url);

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

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

let queues : Queue[] = [];

const wsPort = 8081;
let wss = new ws.Server({port : wsPort});
let clients : ws[] = [];

let currentId = 0;

function newQueue(message : string, name : string) {
    let newQueue = new Queue(message, currentId++, [name]);
    queues.push(newQueue);
    let toSend = JSON.stringify({ command : "newQueue", queue : newQueue});
    for(let client of clients) {
        client.send(toSend);
    }
}

function toggleJoin(user : string, queueId : number) {
    for(let queue of queues) {
        if (queue.id == queueId) {
            let index = queue.users.indexOf(user);
            console.log(index);
            if (index == -1) {
                queue.users.push(user);
            } else {
                queue.users.splice(index,1);
            }
            let toSend = JSON.stringify({command : "updateQueue", queue : queue});
            for(let client of clients) {
                client.send(toSend);
            }
            return;
        }
    }
    console.log("Could not find queue with id: " + queueId);
}

function deleteQueue(queueId : number) {
    let index = -1;
    for(let i = 0; i<queues.length; i++) {
        if (queues[i].id == queueId) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        console.log("Trying to delete nonexistent queue: " + queueId);
    } else {
        queues.splice(index, 1);
        let toSend = JSON.stringify({command : "deleteQueue", index : index});
        for(let client of clients) {
            client.send(toSend);
        }
        return;
    }
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
    client.send(JSON.stringify({command: "allQueues", queues: queues}));
    clients.push(client);
});

console.log("backend");