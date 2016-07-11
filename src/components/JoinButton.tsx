import * as React from "react";

interface IJoinButtonProps {
    handleJoinPressed: () => void;
    isJoined: boolean;
}

interface IJoinButtonState {
}

export class JoinButton extends React.Component<IJoinButtonProps, IJoinButtonState> {
    public render() {
        return <span className="JoinButton" onClick={ () => this.props.handleJoinPressed() }>
            {this.props.isJoined ? "Leave" : "Join"}</span>;
    }
}
