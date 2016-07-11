import * as React from "react";
import { AddQueueButton } from "./AddQueueButton";

interface TopMenuProps {
    handleAddQueue : (message : string) => void
}

interface TopMenuState {
    hasAddButtonBeenPressed : boolean
}

export class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    constructor() {
        super();
        this.state = {hasAddButtonBeenPressed : false};
    }

    render() {
        if (this.state.hasAddButtonBeenPressed) {
            return <div className="TopMenu">
                <input className="TopMenuTextbox" type="textarea" id = "NewMessage" onKeyUp={(event) => {if (event.keyCode == 13) {this.enterPressed()}}}/>
                </div>
        } else {
            return <div className="TopMenu"> <AddQueueButton handleAddQueuePressed={() => this.addQueueButtonPressed()} /> </div>;
        }
    }

    addQueueButtonPressed() {
        this.setState({hasAddButtonBeenPressed : true});
    }

    enterPressed() {
        var message = (document.getElementById("NewMessage") as HTMLInputElement).value;
        this.setState({hasAddButtonBeenPressed : false});
        if (message != "") {
            this.props.handleAddQueue(message);
        }
    }
}