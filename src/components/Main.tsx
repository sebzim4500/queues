import * as React from "react";
import { TopMenu } from "./TopMenu";
import { QueueList } from "./QueueList";
import { Queue } from "../Queue";

interface MainProps {
    name : string
}

interface MainState {
    queues : Queue[],
    socket : WebSocket
}

export class Main extends React.Component<MainProps, MainState> {
    constructor() {
        super();
        this.state = { queues : [], socket : this.setUpSocket() };
    }
    
    sendMessage(message : any) {
        console.log("sending: ", message);
        this.state.socket.send(JSON.stringify(message));
    }
    
    setUpSocket() : WebSocket {
        let socket = new WebSocket("ws://" + window.location.hostname + ":8081");
        socket.onmessage = event => {
            console.log(event);
            console.log(event.data);
            let json = JSON.parse(event.data);
            if (json.command == "newQueue") {
                this.state.queues.push(json.queue);
                this.setState(this.state);
            } else if (json.command == "allQueues") {
                this.state.queues = json.queues;
                this.setState(this.state);
            } else if (json.command == "updateQueue") {
                for (let i=0; i<this.state.queues.length; i++) {
                    if (this.state.queues[i].id == json.queue.id) {
                        this.state.queues[i] = json.queue;
                        this.setState(this.state);
                        return;
                    }
                    console.log("Could not find queue:", json.queue);
                }
            } else if (json.command == "deleteQueue") {
                this.state.queues.splice(json.index, 1);
                this.setState(this.state);
            } else {
                console.log("Invalid command: " + json.command);
            }
        };
        return socket;
    }
    
    handleJoinPressed(queue : Queue) {
        this.sendMessage({command : "toggleJoin", name : this.props.name, queueId : queue.id});
    }
    
    handleDeletePressed(queue : Queue) {
        this.sendMessage({command : "deleteQueue", name : this.props.name, queueId : queue.id});
    }

    render() {
        console.log("rendering main with name: " +this.props.name);
        return <div className="Main">
            <TopMenu handleAddQueue = {message => this.sendMessage({command : "newQueue", message, name : this.props.name})}/>
            <QueueList queues = {this.state.queues} currentUser = {this.props.name}
                handleJoinPressed = {queue => this.handleJoinPressed(queue)}
                handleDeletePressed = {queue => this.handleDeletePressed(queue)}/>
            </div>;
    }
}