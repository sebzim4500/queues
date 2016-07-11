import * as React from "react";

interface JoinedUserListProps {
    users : string[],
    currentUser : string
}

interface JoinedUserListState {
}

export class JoinedUserList extends React.Component<JoinedUserListProps, JoinedUserListState> {
    render() {
        return <span className="JoinedUserList"> {this.props.users.map(user => <JoinedUserView key = {user} user = {user} currentUser = {this.props.currentUser}/>)} </span>;
    }
}

interface JoinedUserViewProps {
    user : string,
    currentUser : string
}

interface JoinedUserViewState {
}

export class JoinedUserView extends React.Component<JoinedUserViewProps, JoinedUserViewState> {
    render() {
        return <span className={this.props.currentUser == this.props.user ? "JoinedUserViewCurrent" : "JoinedUserView"}> {this.props.user}</span>;
    }
}
