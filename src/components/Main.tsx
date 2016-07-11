import * as React from "react";

import { Queue } from "../Queue";
import { Queues } from "../Queues";
import { QueueList } from "./QueueList";
import { TopMenu } from "./TopMenu";

interface IMainProps {
    name: string;
}

interface IMainState {
    queues: Queues;
    socket: WebSocket;
}

export class Main extends React.Component<IMainProps, IMainState> {
    constructor() {
        super();
        this.state = { queues : new Queues([]), socket : this.setUpSocket() };
    }

    public sendMessage(message: any) {
        console.log("sending: ", message);
        this.state.socket.send(JSON.stringify(message));
    }

    public setUpSocket(): WebSocket {
        let socket = new WebSocket("ws://" + window.location.hostname + ":8081");
        socket.onmessage = event => {
            console.log(event);
            console.log(event.data);
            let json = JSON.parse(event.data);
            this.setState(state => {
                if (json.command === "newQueue") {
                    state.queues.pushQueue(json.queue);
                } else if (json.command === "allQueues") {
                    state.queues = new Queues(json.queues);
                } else if (json.command === "toggleJoin") {
                    state.queues.toggleJoin(json.id, json.name);
                } else if (json.command === "deleteQueue") {
                    state.queues.deleteQueue(json.id);
                } else {
                    console.log("Invalid command: " + json.command);
                }
                return state;
            });
        };
        return socket;
    }

    public handleJoinPressed(queue: Queue) {
        this.sendMessage({command : "toggleJoin", name : this.props.name, queueId : queue.id});
    }

    public handleDeletePressed(queue: Queue) {
        this.sendMessage({command : "deleteQueue", name : this.props.name, queueId : queue.id});
    }

    public render() {
        console.log("rendering main with name: " + this.props.name);
        return <div className="Main">
            <TopMenu handleAddQueue = {message =>
                this.sendMessage({command : "newQueue", message, name : this.props.name})}/>
            <QueueList queues = {this.state.queues.queues} currentUser = {this.props.name}
                handleJoinPressed = {queue => this.handleJoinPressed(queue)}
                handleDeletePressed = {queue => this.handleDeletePressed(queue)}/>
            </div>;
    }
}
