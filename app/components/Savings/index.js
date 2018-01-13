import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setValue } from 'app/actions';

class Savings extends Component {
    componentWillMount() {
        this.getSavings();
    }

    getSavings() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
            range: 'Savings Goals!A1:W'
        }).then(function(response) {
            this.props.onSetValue('savings', this.getFilledRows(response.body));
        }.bind(this), function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }

    getFilledRows(rows) {
        return JSON.parse(rows).values.filter((row, index) => row[0] || index === 0);
    }

    render() {
        return (
            <div className="savings">
                
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    state => state.app,
    app => ({ ...app })
);

const mapActionsToProps = {
    onSetValue: setValue
};

export default connect(mapStateToProps, mapActionsToProps)(Savings);
