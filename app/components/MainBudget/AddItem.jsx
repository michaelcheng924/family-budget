import React, { Component } from 'react';
import Select from 'react-select-plus';
import { categoriesMapping } from '../../utils/constants';

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryIndex: null,
            year: '2018'
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(event) {
        event.preventDefault();

        const { date, description, amount } = this;
        const { categoryIndex, year } = this.state;

        if (!date.value || !year || !description.value || !amount.value || !categoryIndex) {
            alert('Missing field(s)!');
            return;
        }

        this.props.onSetValue('loading', true);

        gapi.client.sheets.spreadsheets.batchUpdate({
            spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
            resource: {
                requests: [
                    {
                        updateCells: {
                            start: {
                                sheetId: 0,
                                rowIndex: this.props.newRowIndex,
                                columnIndex: 0
                            },
                            rows: [
                                {
                                    values: [
                                        {
                                            userEnteredValue: { stringValue: `${date.value}/${year.value}` },
                                            userEnteredFormat: {
                                                horizontalAlignment: 'right',
                                                numberFormat: {
                                                    type: 'date'
                                                }
                                            }
                                        },
                                        {
                                            userEnteredValue: { stringValue: description.value },
                                        }
                                    ]
                                }
                            ],
                            fields: '*'
                      }
                    },
                    {
                        updateCells: {
                            start: {
                                sheetId: 0,
                                rowIndex: this.props.newRowIndex,
                                columnIndex: categoryIndex
                            },
                            rows: [
                                {
                                    values: [
                                        {
                                            userEnteredValue: { numberValue: Number(amount.value) },
                                            userEnteredFormat: {
                                                backgroundColor: {
                                                    red: 250 / 255,
                                                    green: 245 / 255,
                                                    blue: 188 / 255,
                                                    alpha: 1
                                                },
                                                horizontalAlignment: 'right',
                                                numberFormat: {
                                                    type: 'currency'
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            fields: '*'
                        }
                    }
                ]
            }
        }).then(function(response) {
            this.getBudget();
        }.bind(this), function(response) {
            console.log('Error: ' + response.result.error.message);
        });
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

    renderYear() {
        const options = [
            {
                label: '2017',
                value: '2017'
            },
            {
                label: '2018',
                value: '2018'
            }
        ];

        return (
            <Select
                className="main-budget__categories-select"
                onChange={option => this.setState({ year: option.value })}
                options={options}
                placeholder="Select year"
                value={this.state.year}
            />
        );
    }

    renderCategoriesSelect() {
        const options = categoriesMapping.map((category, index) => {
            return {
                label: category.name,
                value: category.index
            };
        });

        return (
            <Select
                className="main-budget__categories-select"
                onChange={option => this.setState({ categoryIndex: option.value })}
                options={options}
                placeholder="Select category"
                value={this.state.categoryIndex}
            />
        );
    }

    render() {
        return (
            <form className="main-budget__add-item-form" onSubmit={this.addItem}>
                <input type="text" ref={date => this.date = date} placeholder="Date" />
                {this.renderYear()}
                <input type="text" ref={description => this.description = description} placeholder="Description" />
                <input type="text" ref={amount => this.amount = amount} placeholder="Amount" />
                {this.renderCategoriesSelect()}
                <button>Add</button>
            </form>
        );
    }
}
