import React, { Component } from 'react';
import Popover from 'material-ui/Popover';

class MainBudget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.updateCell = this.updateCell.bind(this);
    }

    handleClick(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({ open: false });
    }

    updateCell(event) {
        event.preventDefault();

        const { column, row } = this.props;

        let entryObj = {};

        if (this.props.column > 1) {
            entryObj = {
                userEnteredValue: {
                    numberValue: Number(this.updateValue.value)
                },
                userEnteredFormat: {
                    backgroundColor: {
                        red: 229 / 255,
                        green: 229 / 255,
                        blue: 229 / 255,
                        alpha: 1
                    },
                    horizontalAlignment: 'right',
                    numberFormat: {
                        type: 'currency'
                    }
                }
            }
        } else if (this.props.column === 0) {
            entryObj = {
                userEnteredValue: {
                    stringValue: this.updateValue.value
                },
                userEnteredFormat: {
                    backgroundColor: {
                        red: 229 / 255,
                        green: 229 / 255,
                        blue: 229 / 255,
                        alpha: 1
                    },
                    horizontalAlignment: 'right',
                    numberFormat: {
                        type: 'date'
                    }
                }
            }
        } else {
            entryObj = {
                userEnteredValue: {
                    stringValue: this.refs.cellContent.value
                },
                userEnteredFormat: {
                    backgroundColor: {
                        red: 229 / 255,
                        green: 229 / 255,
                        blue: 229 / 255,
                        alpha: 1
                    }
                }
            }
        }

        const data = [
            {
                updateCells: {
                    start: {
                        sheetId: 0,
                        rowIndex: row,
                        columnIndex: this.props.column
                    },
                    rows: [
                        {
                            values: [entryObj]
                        }
                    ],
                    fields: '*'
                }
            }
        ];

        this.props.onSetValue('loading', true);

        gapi.client.sheets.spreadsheets.batchUpdate({
            spreadsheetId: '1OtFV6WA2Ec3T0UR7cgzSp9wozabz_NzPprUdT56Nt5U',
            resource: {
                requests: data
            }
        }).then(function(response) {
            this.props.getBudget();
        }.bind(this), function(response) {
            console.log('Error: ' + response.result.error.message);
        });
    }

    render() {
        return (
            <td className="main-budget__table-cell" onClick={this.handleClick}>
                {this.props.dataCell}
                <Popover
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <form onSubmit={this.updateCell}>
                        <input placeholder={`Old: ${this.props.dataCell}. Enter new`} ref={updateValue => this.updateValue = updateValue} />
                    </form>
                </Popover>
            </td>
        );
    }
}

export default MainBudget;
