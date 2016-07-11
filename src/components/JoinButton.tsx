import * as React from "react";

interface JoinButtonProps {
    handleJoinPressed : () => void,
    isJoined : boolean
}

interface JoinButtonState {
}

export class JoinButton extends React.Component<JoinButtonProps, JoinButtonState> {
    render() {
        return <span className="JoinButton" onClick={ () => this.props.handleJoinPressed() }> {this.props.isJoined?"Leave":"Join"}</span>;
    }
}