import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserAgentApplication } from "msal";
import { User } from "node_modules/msal/lib-commonjs/User";

export interface IUserInfoState {
    currentUser?: User;
}

export class Home extends React.Component<RouteComponentProps<{}>, IUserInfoState> {
    constructor() {
        super();

        this.state = {};

        this.msalApp = new UserAgentApplication("08275f8c-4635-40d0-a038-26f6623d511e", "https://login.microsoftonline.com/common", undefined, {
            redirectUri: "http://localhost:5000"
        });
    }

    private msalApp: UserAgentApplication;

    public render() {
        var content = this.state.currentUser ? this.renderUserInfo() : this.renderAnonymous();
        return content;
    }


    private renderAnonymous(): JSX.Element {
        return <div>
            <h1>Log in to view user information</h1>
            
            <button className="btn btn-primary" onClick={ this.login.bind(this) }>Log in</button>
        </div>;
    }

    private renderUserInfo(): JSX.Element {
        return <div>
            <h1>{ this.state.currentUser.name }</h1>
            <ul className="list-group">
                <li className="list-group-item">{ this.state.currentUser.displayableId }</li>
                <li className="list-group-item">{ this.state.currentUser.identityProvider }</li>
                <li className="list-group-item">{ this.state.currentUser.userIdentifier }</li>
            </ul>
            <button className="btn btn-info" onClick={ this.logout.bind(this) }>Log out</button>
        </div>;
    }

    private login(): Promise<any> {
        return this.msalApp
            .loginPopup(["user.read"])
            .then(idToken => {
                var usr = this.msalApp.getUser();
                console.log("Current user", usr);
                this.setState({ currentUser: usr });
            })
            .catch(err => {
                console.warn(err);
            })
            ;
    }

    private logout(): void {
        this.msalApp.logout();
    }
}
