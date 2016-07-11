import * as React from "react";

interface AddQueueButtonProps {
    handleAddQueuePressed : () => void
}

interface AddQueueButtonState {
}

export class AddQueueButton extends React.Component<AddQueueButtonProps, AddQueueButtonState> {
    render() {
        return <div className="AddQueueButton" onClick={ () => this.props.handleAddQueuePressed() }> New Queue </div>;
    }
}