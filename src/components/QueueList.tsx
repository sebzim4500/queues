import * as React from "react";
import { QueueView } from "./QueueView";
import { Queue } from "../Queue";

interface QueueListProps {
    queues : Queue[],
    currentUser : string,
    handleJoinPressed : (queue : Queue) => void,
    handleDeletePressed : (queue : Queue) => void
}

interface QueueListState {
}

export class QueueList extends React.Component<QueueListProps, QueueListState> {
    render() {
        return <div className="QueueList"> {
            this.props.queues.map(queue =>
            { return <QueueView key = {queue.id} queue = {queue} currentUser = {this.props.currentUser}
                handleJoinPressed = {this.props.handleJoinPressed}
                handleDeletePressed = {this.props.handleDeletePressed}/>}).reverse()} </div>;
    }
}