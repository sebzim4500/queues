import * as React from "react";

import { AddQueueButton } from "./AddQueueButton";

interface ITopMenuProps {
    handleAddQueue: (message: string) => void;
}

interface ITopMenuState {
    hasAddButtonBeenPressed: boolean;
}

export class TopMenu extends React.Component<ITopMenuProps, ITopMenuState> {
    constructor() {
        super();
        this.state = {hasAddButtonBeenPressed : false};
    }

    public render() {
        if (this.state.hasAddButtonBeenPressed) {
            return <div className="TopMenu">
                <input className="TopMenuTextbox" type="textarea" id = "NewMessage"
                    onKeyUp={(event) => {if (event.keyCode === 13) {this.enterPressed();}}}/>
                </div>;
        } else {
            return <div className="TopMenu">
                <AddQueueButton handleAddQueuePressed={() => this.addQueueButtonPressed()} /> </div>;
        }
    }

    public addQueueButtonPressed() {
        this.setState(state => {
            state.hasAddButtonBeenPressed = true;
            return state;
        });
    }

    public enterPressed() {
        let message = (document.getElementById("NewMessage") as HTMLInputElement).value;
        this.setState(state => {
            state.hasAddButtonBeenPressed = false;
            return state;
        });
        if (message !== "") {
            this.props.handleAddQueue(message);
        }
    }
}
