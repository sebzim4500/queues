import { EnterName } from "./EnterName";
import { Main } from "./Main";
import * as React from "react";

interface IAppProps {
}

interface IAppState {
    name: string;
}

export class App extends React.Component<IAppProps, IAppState> {
    constructor() {
        super();
        this.state = {name : null};
    }

    public render() {
        if (!this.state.name) {
            return <EnterName handleNameSubmit = {name => {
                document.title = "Queue List: " + name;
                this.setState({name : name});
            }}/>;
        } else {
            return <Main name={this.state.name}/>;
        }
    }
}
