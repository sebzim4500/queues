import * as React from "react";

interface IEnterNameProps {
    handleNameSubmit: (name: string) => void;
}

interface IEnterNameState {
}

export class EnterName extends React.Component<IEnterNameProps, IEnterNameState> {
    public render() {
        return <div className="EnterName"> Enter name: <input type="textbox" id="name" onKeyUp={event => {
            if (event.keyCode === 13) {
                this.props.handleNameSubmit((document.getElementById("name") as HTMLInputElement).value);
            }
        }}/> </div>;
    }
}
