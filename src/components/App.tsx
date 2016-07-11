import * as React from "react";
import { EnterName } from "./EnterName";
import { Main } from "./Main";

interface AppProps {
}

interface AppState {
    name : string
}

export class App extends React.Component<AppProps, AppState> {
    constructor() {
        super();
        this.state = {name : null};
    }
    
    render() {
        if (!this.state.name) {
            return <EnterName handleNameSubmit = {name => {
                document.title = "Queue List: " + name;
                this.setState({name : name});
            }}/>;
        } else {
            return <Main name={this.state.name}/>
        }
    }
}