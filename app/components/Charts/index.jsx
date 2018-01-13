import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isEmpty, map } from 'lodash';
import { Tabs, Tab } from 'material-ui/Tabs';
import * as constants from 'app/utils/constants';
import { getNumber } from 'app/utils/methods';

class Charts extends Component {
    getMonthlyData() {
        const { dateMapping } = constants;

        const rows = this.props.dataRows.sort((a, b) => {
            return new Date(b[0]).getTime() - new Date(a[0]).getTime();
        });

        let groceryMonth = '';
        let groceryMonthIndex = -1;
        let gasMonth = '';
        let gasMonthIndex = -1;

        return rows.reduce((results, row) => {
            const date = new Date(row[0]);
            const newMonth = `${dateMapping[date.getMonth()]}/${dateMapping[date.getYear()]}`;

            if (newMonth !== groceryMonth) {
                groceryMonth = newMonth;
                groceryMonthIndex++;

                results.grocery.months[groceryMonthIndex] = {
                    monthTitle: groceryMonth,
                    total: 0
                };
            }

            if (row[constants.groceryExpensesIndex] && row[1].toLowerCase() !== 'redistribute categories') {
                results.grocery.months[groceryMonthIndex].total += getNumber(row[constants.groceryExpensesIndex]);
            }

            if (newMonth !== gasMonth) {
                gasMonth = newMonth;
                gasMonthIndex++;

                results.gas.months[gasMonthIndex] = {
                    monthTitle: gasMonth,
                    total: 0
                };
            }

            if (row[constants.gasExpensesIndex] && row[1].toLowerCase() !== 'redistribute categories') {
                results.gas.months[gasMonthIndex].total += getNumber(row[constants.gasExpensesIndex]);
            }

            return results;
        }, {
            grocery: {
                name: 'Grocery',
                months: []
            },
            gas: {
                name: 'Gas',
                months: []
            }
        });
    }

    getBusinessData() {
        const rows = this.props.dataRows.sort((a, b) => {
            return new Date(b[0]).getTime() - new Date(a[0]).getTime();
        });

        return rows.reduce((result, row) => {
            const year = constants.dateMapping[new Date(row[0]).getYear()];
            if (!result[year]) {
                result[year] = {
                    businessIncome: 0,
                    businessExpenses: 0
                };
            }

            const description = row[constants.descriptionIndex].toLowerCase();
            const businessExpenses = getNumber(row[constants.businessExpensesIndex]);

            if (description.indexOf('redistribute categories') !== -1) { return result; }

            if (description.indexOf('bestactprep') !== -1 || description.indexOf('stripe') !== -1 || description.indexOf('google adsense') !== -1) {
                result[year].businessIncome += getNumber(row[constants.incomeIndex]);
            }

            if (businessExpenses) {
                result[year].businessExpenses += businessExpenses;
            }

            return result;
        }, {});
    }

    renderTotals() {
        const { dataRows } = this.props;

        return (
            <div className="charts__totals">
                <div className="charts__total charts__total--fun-michael">
                    <div className="charts__total-title">Michael Fun</div>
                    {dataRows[0][constants.funMichaelTotalIndex]}
                </div>
                <div className="charts__total charts__total--fun-michael">
                    <div className="charts__total-title">Michael Clothing</div>
                    {dataRows[0][constants.clothingMichaelTotalIndex]}
                </div>
                <div className="charts__total charts__total--fun-anna">
                    <div className="charts__total-title">Anna Fun</div>
                    {dataRows[0][constants.funAnnaTotalIndex]}
                </div>
                <div className="charts__total charts__total--fun-anna">
                    <div className="charts__total-title">Anna Fun</div>
                    {dataRows[0][constants.clothingAnnaTotalIndex]}
                </div>

                <div className="charts__total charts__total--giving">
                    <div className="charts__total-title">Giving GFBC</div>
                    {dataRows[0][constants.givingGFBCTotalIndex]}
                </div>
                <div className="charts__total charts__total--giving">
                    <div className="charts__total-title">Giving Other</div>
                    {dataRows[0][constants.givingOtherTotalIndex]}
                </div>
                <div className="charts__total charts__total--housing">
                    <div className="charts__total-title">Housing</div>
                    {dataRows[0][constants.housingTotalIndex]}
                </div>
                <div className="charts__total charts__total--housing">
                    <div className="charts__total-title">Utilities</div>
                    {dataRows[0][constants.utilitiesTotalIndex]}
                </div>
                <div className="charts__total charts__total--housing">
                    <div className="charts__total-title">General Housing</div>
                    {dataRows[0][constants.generalHousingTotalIndex]}
                </div>
                <div className="charts__total charts__total--car">
                    <div className="charts__total-title">Gas</div>
                    {dataRows[0][constants.gasTotalIndex]}
                </div>
                <div className="charts__total charts__total--car">
                    <div className="charts__total-title">Car Maintenance</div>
                    {dataRows[0][constants.carMaintenanceTotalIndex]}
                </div>
                <div className="charts__total charts__total--car">
                    <div className="charts__total-title">Car Insurance</div>
                    {dataRows[0][constants.carInsuranceTotalIndex]}
                </div>
                <div className="charts__total charts__total--grocery">
                    <div className="charts__total-title">Grocery</div>
                    {dataRows[0][constants.groceryTotalIndex]}
                </div>
                <div className="charts__total charts__total--random">
                    <div className="charts__total-title">Gifts</div>
                    {dataRows[0][constants.giftsTotalIndex]}
                </div>
                <div className="charts__total charts__total--random">
                    <div className="charts__total-title">Education</div>
                    {dataRows[0][constants.educationTotalIndex]}
                </div>
                <div className="charts__total charts__total--random">
                    <div className="charts__total-title">Books</div>
                    {dataRows[0][constants.booksTotalIndex]}
                </div>
                <div className="charts__total charts__total--random">
                    <div className="charts__total-title">Entertainment</div>
                    {dataRows[0][constants.entertainmentTotalIndex]}
                </div>
                <div className="charts__total charts__total--travel">
                    <div className="charts__total-title">Travel</div>
                    {dataRows[0][constants.travelTotalIndex]}
                </div>
                <div className="charts__total charts__total--health">
                    <div className="charts__total-title">Health Insurance</div>
                    {dataRows[0][constants.healthInsuranceTotalIndex]}
                </div>
                <div className="charts__total charts__total--health">
                    <div className="charts__total-title">Health</div>
                    {dataRows[0][constants.healthTotalIndex]}
                </div>
                <div className="charts__total charts__total--misc">
                    <div className="charts__total-title">Miscellaneous</div>
                    {dataRows[0][constants.miscTotalIndex]}
                </div>
                <div className="charts__total charts__total--business">
                    <div className="charts__total-title">Facebook Ads</div>
                    {dataRows[0][constants.facebookAdsTotalIndex]}
                </div>
                <div className="charts__total charts__total--business">
                    <div className="charts__total-title">Business</div>
                    {dataRows[0][constants.businessTotalIndex]}
                </div>
            </div>
        );
    }

    renderMonthly() {
        const monthlyData = this.getMonthlyData();

        return (
            <div className="charts__monthly">
                <div className="charts__monthly--category">
                    <h3>Grocery</h3>
                    {
                        monthlyData.grocery.months.map((month, index) => {
                            return <div key={index}>{month.monthTitle} - <strong>${month.total}</strong></div>;
                        })
                    }
                </div>

                <div className="charts__monthly--category">
                    <h3>Gas</h3>
                    {
                        monthlyData.gas.months.map((month, index) => {
                            return <div key={index}>{month.monthTitle} - <strong>${month.total}</strong></div>;
                        })
                    }
                </div>
            </div>
        );
    }

    renderBusiness() {
        const business = this.getBusinessData();

        return (
            <div className="charts__business">
                {
                    map(business, (value, key) => {
                        return (
                            <div className="charts__business--year" key={key}>
                                <h4>{key}</h4>
                                <div>Income: <strong>${value.businessIncome}</strong></div>
                                <div>Expenses: <strong>${value.businessExpenses}</strong></div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        if (isEmpty(this.props.dataRows)) {
            return <h1 className="main-budget__loading">LOADING...</h1>;
        }

        return (
            <div className="charts">
                <Tabs>
                    <Tab label="Totals" >
                        {this.renderTotals()}
                    </Tab>
                    <Tab label="Monthly" >
                      {this.renderMonthly()}
                    </Tab>
                    <Tab label="Business" >
                      {this.renderBusiness()}
                    </Tab>
                  </Tabs>
                }
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    state => state.app,
    app => ({ ...app })
);

export default connect(mapStateToProps)(Charts);
