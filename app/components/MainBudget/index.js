import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { setValue, storeMainBudget } from 'app/actions/MainBudgetActions';
import AddItem from 'app/components/MainBudget/AddItem';

class MainBudget extends Component {
    renderRows() {
        const { dataRows, headerRows, rowsToShow } = this.props;

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
                                                <td key={index1} className="main-budget__table-cell">
                                                    {dataCell}
                                                </td>
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
        const { loading, onSetValue, onStoreMainBudget } = this.props;

        return loading
            ? <h1 className="main-budget__loading">LOADING...</h1>
            : (
                <div>
                    <AddItem
                        newRowIndex={this.props.dataRows.length + 2}
                        onSetValue={onSetValue}
                        onStoreMainBudget={onStoreMainBudget}
                    />
                    {this.renderRows()}
                </div>
            );
    }
}

const mapStateToProps = createSelector(
    state => state.mainBudget,
    mainBudget => ({ ...mainBudget })
);

const mapActionsToProps = {
    onSetValue: setValue,
    onStoreMainBudget: storeMainBudget
};

export default connect(mapStateToProps, mapActionsToProps)(MainBudget);
