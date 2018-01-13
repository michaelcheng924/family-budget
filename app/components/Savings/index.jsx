import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as constants from 'app/utils/constants';
import { getNumber } from 'app/utils/methods';

class Savings extends Component {
    renderSavings() {
        const { savingsDataRows } = this.props;

        return (
            <div>
                <h3>Categories</h3>
                <div className="savings__totals">
                    <div className="savings__category" style={{ background: '#C8E6C9' }}>
                        <h4>Non-allocated</h4>
                        {savingsDataRows[0][3]}
                    </div>
                    <div className="savings__category">
                        <h4>Loan from Michael's dad</h4>
                        {savingsDataRows[0][7]}
                    </div>
                    <div className="savings__category">
                        <h4>A/C / Major remodeling</h4>
                        {savingsDataRows[0][10]}
                    </div>
                    <div className="savings__category">
                        <h4>Taxes</h4>
                        {savingsDataRows[0][13]}
                    </div>
                    <div className="savings__category">
                        <h4>Home repair</h4>
                        {savingsDataRows[0][16]}
                    </div>
                    <div className="savings__category">
                        <h4>Rainy day fund</h4>
                        {savingsDataRows[0][19]}
                    </div>
                </div>
            </div>
        );
    }

    renderTotals() {
        const { dataRows, savingsDataRows } = this.props;

        return (
            <div>
                <h3>Totals</h3>
                <div className="savings__totals">
                    <div className="savings__category" style={{ background: '#C8E6C9' }}>
                        <h4>Total</h4>
                        ${getNumber(dataRows[0][constants.totalIndex]) + getNumber(savingsDataRows[0][4])}
                    </div>
                    <div className="savings__category">
                        <h4>Main Budget Total</h4>
                        {dataRows[0][constants.totalIndex]}
                    </div>
                    <div className="savings__category">
                        <h4>Savings Total</h4>
                        {savingsDataRows[0][4]}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { savingsLoading } = this.props;

        return savingsLoading
            ? <h1 className="main-budget__loading">LOADING...</h1>
            : (
                <div className="savings">
                    {this.renderSavings()}
                    {this.renderTotals()}
                </div>
            );
    }
}

const mapStateToProps = createSelector(
    state => state.app,
    app => ({ ...app })
);

export default connect(mapStateToProps)(Savings);
