import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IUserInfoState {

}

export class Home extends React.Component<RouteComponentProps<{}>, IUserInfoState> {
    public render() {
        var content = this.renderAnonymous();

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
            
            <button className="btn btn-info" onClick={ this.logout.bind(this) }>Log out</button>
        </div>;
    }

    private login(): Promise<any> {

        return Promise.resolve();
    }

    private logout(): void {

    }
}
