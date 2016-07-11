import * as React from "react";

import { Queue } from "../Queue";
import { QueueView } from "./QueueView";

interface IQueueListProps {
    queues: Queue[];
    currentUser: string;
    handleJoinPressed: (queue: Queue) => void;
    handleDeletePressed: (queue: Queue) => void;
}

interface IQueueListState {
}

export class QueueList extends React.Component<IQueueListProps, IQueueListState> {
    public ender() {
        return <div className="QueueList"> {
            this.props.queues.map(queue => {
                return <QueueView key = {queue.id} queue = {queue} currentUser = {this.props.currentUser}
                handleJoinPressed = {this.props.handleJoinPressed}
                handleDeletePressed = {this.props.handleDeletePressed}/>;
            }).reverse()} </div>;
    }
}
