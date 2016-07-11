import * as React from "react";

interface EnterNameProps {
    handleNameSubmit : (name : string) => void
}

interface EnterNameState {
}

export class EnterName extends React.Component<EnterNameProps, EnterNameState> {
    render() {
        return <div className="EnterName"> Enter name: <input type="textbox" id="name" onKeyUp={event => {
            if (event.keyCode == 13) {
                this.props.handleNameSubmit((document.getElementById("name") as HTMLInputElement).value);
            }
        }}/> </div>;
    }
}