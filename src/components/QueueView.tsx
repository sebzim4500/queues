import * as React from "react";
import { Queue } from "../Queue";
import { JoinedUserList } from "./JoinedUserList";
import { JoinButton } from "./JoinButton";

interface QueueViewProps {
    queue : Queue,
    currentUser : string,
    handleJoinPressed : (queue : Queue) => void,
    handleDeletePressed : (queue : Queue) => void
}

interface QueueViewState {
}

export class QueueView extends React.Component<QueueViewProps, QueueViewState> {
    render() {
        return <div className="QueueView">
            <div className="QueueViewMessage" onClick={() => this.props.handleDeletePressed(this.props.queue)}> {this.props.queue.message}</div>
            <JoinButton isJoined = {this.props.queue.users.indexOf(this.props.currentUser) != -1} handleJoinPressed = {() => this.props.handleJoinPressed(this.props.queue)}/>
            <JoinedUserList currentUser={this.props.currentUser} users={this.props.queue.users}/>
            </div>
    }
}

