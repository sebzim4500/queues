import * as React from "react";

interface IJoinedUserListProps {
    users: string[];
    currentUser: string;
}

interface IJoinedUserListState {
}

export class JoinedUserList extends React.Component<IJoinedUserListProps, IJoinedUserListState> {
    public render() {
        return <span className="JoinedUserList">
            {this.props.users.map(user =>
                <JoinedUserView key = {user} user = {user} currentUser = {this.props.currentUser}/>)} </span>;
    }
}

interface IJoinedUserViewProps {
    user: string;
    currentUser: string;
}

interface IJoinedUserViewState {
}

export class JoinedUserView extends React.Component<IJoinedUserViewProps, IJoinedUserViewState> {
    public render() {
        let isCurrentUser = this.props.currentUser === this.props.user;
        return <span className={isCurrentUser ? "JoinedUserViewCurrent" : "JoinedUserView"}>
            {this.props.user}</span>;
    }
}
