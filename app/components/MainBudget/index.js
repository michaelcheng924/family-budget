import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class MainBudget extends Component {
    renderRows() {
        const rows = this.props.rows;

        const headers = rows.slice(0, 2);

        return (
            <table>
                <thead>
                    {
                        headers.map(headerCells => {
                            return (
                                <tr>
                                    {
                                        headerCells.map(headerCell => {
                                            return (
                                                <th>
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

                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                {this.renderRows()}
            </div>
        );
    }
};

const mapStateToProps = createSelector(
    state => state.mainBudget,
    mainBudget => ({ ...mainBudget })
);

export default connect(mapStateToProps, null)(MainBudget);
