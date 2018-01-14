import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { setValue, storeMainBudget } from 'app/actions';
import AddItem from 'app/components/MainBudget/AddItem';
import SingleCell from 'app/components/MainBudget/SingleCell';

class MainBudget extends Component {
    constructor(props) {
        super(props);

        this.getBudget = this.getBudget.bind(this);
        this.onRowsToShowChange = this.onRowsToShowChange.bind(this);
    }

    onRowsToShowChange(event) {
        event.preventDefault();

        this.props.onSetValue('rowsToShow', Number(this.rowsToShow.value));
    }

    getBudget() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
            range: 'Main Budget!A1:AZ'
        }).then(function(response) {
            this.props.onStoreMainBudget(this.getFilledRows(response.body));
        }.bind(this), function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }

    getFilledRows(rows) {
        return JSON.parse(rows).values.filter((row, index) => row[0] || index === 0);
    }

    renderRows() {
        const { dataRows, headerRows, onSetValue, rowsToShow } = this.props;

        return (
            <table className="main-budget__table">
                <thead>
                    {
                        headerRows.map((headerCells, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        headerCells.map((headerCell, index1) => {
                                            return (
                                                <th key={index1} className="main-budget__table-cell">
                                                    {headerCell}
                                                </th>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </thead>
                <tbody>
                    {
                        dataRows.slice(0, rowsToShow).map((dataCells, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        dataCells.map((dataCell, index1) => {
                                            return (
                                                <SingleCell
                                                    key={index1}
                                                    dataCell={dataCell}
                                                    getBudget={this.getBudget}
                                                    column={index1}
                                                    onSetValue={onSetValue}
                                                    row={dataRows.length + 1 - index}
                                                />
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

    render() {
        const { loading, onSetValue, onStoreMainBudget, rowsToShow } = this.props;

        return loading
            ? <h1 className="main-budget__loading">LOADING...</h1>
            : (
                <div>
                    <AddItem
                        getBudget={this.getBudget}
                        newRowIndex={this.props.dataRows.length + 2}
                        onSetValue={onSetValue}
                        onStoreMainBudget={onStoreMainBudget}
                    />
                    <form className="main-budget__rows-to-show-form" onSubmit={this.onRowsToShowChange} style={{ display: 'inline-block', float: 'right', width: 45 }}>
                        <input type="text" ref={rowsToShow => this.rowsToShow = rowsToShow} defaultValue={rowsToShow} />
                    </form>
                    {this.renderRows()}
                </div>
            );
    }
}

const mapStateToProps = createSelector(
    state => state.app,
    app => ({ ...app })
);

const mapActionsToProps = {
    onSetValue: setValue,
    onStoreMainBudget: storeMainBudget
};

export default connect(mapStateToProps, mapActionsToProps)(MainBudget);
