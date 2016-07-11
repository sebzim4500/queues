import * as React from "react";
import * as ReactDOM from "react-dom";

interface IEnterNameProps {
    handleNameSubmit: (name: string) => void;
}

interface IEnterNameState {
}

export class EnterName extends React.Component<IEnterNameProps, IEnterNameState> {
    public render() {
        return <div className="EnterName"> Enter name: <input type="textbox" id="name" onKeyUp={event => {
            if (event.keyCode === 13) {
                let node = ReactDOM.findDOMNode(this).querySelector("#name");
                this.props.handleNameSubmit((node as HTMLInputElement).value);
            }
        }}/> </div>;
    }
}
