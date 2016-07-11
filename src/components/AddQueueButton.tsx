import * as React from "react";

interface IAddQueueButtonProps {
    handleAddQueuePressed: () => void;
}

interface IAddQueueButtonState {
}

export class AddQueueButton extends React.Component<IAddQueueButtonProps, IAddQueueButtonState> {
    public render() {
        return <div className="AddQueueButton" onClick={ () => this.props.handleAddQueuePressed() }> New Queue </div>;
    }
}
