import * as React from "react";
import { TopMenu } from "./TopMenu";
import { QueueList } from "./QueueList";
import { Queue } from "../Queue";
import { Queues } from "../Queues";

interface MainProps {
    name : string
}

interface MainState {
    queues : Queues;
    socket : WebSocket
}

export class Main extends React.Component<MainProps, MainState> {
    constructor() {
        super();
        this.state = { queues : new Queues([]), socket : this.setUpSocket() };
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
                this.state.queues.pushQueue(json.queue);
                this.setState(this.state);
            } else if (json.command == "allQueues") {
                this.state.queues = new Queues(json.queues);
                this.setState(this.state);
            } else if (json.command == "toggleJoin") {
                this.state.queues.toggleJoin(json.id, json.name);
                this.setState(this.state);
            } else if (json.command == "deleteQueue") {
                this.state.queues.deleteQueue(json.id);
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
            <QueueList queues = {this.state.queues.queues} currentUser = {this.props.name}
                handleJoinPressed = {queue => this.handleJoinPressed(queue)}
                handleDeletePressed = {queue => this.handleDeletePressed(queue)}/>
            </div>;
    }
}