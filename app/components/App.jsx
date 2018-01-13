import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { setValue, storeMainBudget, storeSavings } from 'app/actions';
import MainBudget from 'app/components/MainBudget';
import Charts from 'app/components/Charts';
import Savings from 'app/components/Savings';

class App extends Component {
    constructor(props) {
        super(props);

        this.initClient = this.initClient.bind(this);
    }

    componentDidMount() {
        this.handleClientLoad();
    }

    handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    handleClientLoad() {
        gapi.load('client:auth2', this.initClient);
    }

    initClient() {
        var CLIENT_ID = '908241493175-2epqfsql3spckmnfabr79hk07996nok3.apps.googleusercontent.com';
        var API_KEY = 'AIzaSyAiXobhB-NUBzHM9t4eRpBmyis4Mv4RTY0';

        var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

        var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

        var authorizeButton = document.getElementById('authorize-button');
        var signoutButton = document.getElementById('signout-button');

        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = this.handleAuthClick;
            signoutButton.onclick = this.handleSignoutClick;
        }.bind(this));
    }

    updateSigninStatus(isSignedIn) {
        var authorizeButton = document.getElementById('authorize-button');
        var signoutButton = document.getElementById('signout-button');

        if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            this.getBudget();
        } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
    }

    getBudget() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
            range: 'Main Budget!A1:AZ'
        }).then(function(response) {
            this.props.onStoreMainBudget(this.getFilledRows(response.body));

            gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
                range: 'Savings Goals!A1:W'
            }).then(function(response) {
                this.props.onStoreSavings(this.getFilledRows(response.body));
            }.bind(this), function(response) {
                console.log('Error: ' + response.result.error.message);
            });
        }.bind(this), function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }

    getFilledRows(rows) {
        return JSON.parse(rows).values.filter((row, index) => row[0] || index === 0);
    }

    render() {
        const Component = typeof window === 'undefined' ? 'div' : BrowserRouter;

        return (
            <div>
                <Component>
                    <MuiThemeProvider>
                        <div>
                            <div className="root-nav">
                                <div className="root-nav__title">Budget</div>
                                <div className="root-nav__actions">
                                    <Link className="root-nav__view" to="/">Main Budget</Link>
                                    <Link className="root-nav__view" to="/charts">Charts</Link>
                                    <Link className="root-nav__view" to="/savings">Savings</Link>
                                    <button id="authorize-button" style={{ display: 'none' }}>Authorize</button>
                                    <button id="signout-button" style={{ display: 'none' }}>Logout</button>
                                </div>
                            </div>
                            <Route exact path="/" component={MainBudget}/>
                            <Route exact path="/charts" component={Charts}/>
                            <Route exact path="/savings" component={Savings}/>
                        </div>
                    </MuiThemeProvider>
                </Component>
            </div>
        );
    }
};

const mapActionsToProps = {
    onSetValue: setValue,
    onStoreMainBudget: storeMainBudget,
    onStoreSavings: storeSavings
};

export default connect(null, mapActionsToProps)(App);
