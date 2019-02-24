/**
* React Imports 
*/
import React, { Component } from "react";

/**
 * Semantic UI Imports
 */
import { Container, Grid, Header, Image, Label, Table } from 'semantic-ui-react'

import {
    addTotalToData,
    getTieBreakerField,
    renderMedalDataRows,
    sortMedalData
} from '@helpers'

import MedalWidgetItem from './MedalWidgetItem'

class MedalWidget extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: null,
          fetchError: false,
          loading: true,
          sortField: 'gold'
        };
        this.handleMedalIconClick = this.handleMedalIconClick.bind(this)

    }

    componentDidMount() {
        fetch('https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json')
        .then( (response) => {
            return response.json()
        })
        .then( (data) => {
            data = addTotalToData(data)
            this.setState({
                data,
                loading: false
            })
        })
        .catch(err => {
            // Error fetching data from mdeal source
            this.setState({
                fetchError: true
            })
            console.log(err)
        })
    }

    handleMedalIconClick(e, data) {
        console.log("sort by: ")
        console.log(data)
        let medalType = data["data-medal-type"]
        if (medalType) {
            let data = this.state.data.sort(sortMedalData(medalType, getTieBreakerField(medalType),'desc'));
            this.setState({
                sortField: medalType,
                data
            })
        }
    }

    render() {
        const { sort } = this.props
        const { data, fetchError, loading, sortField } = this.state

        if (fetchError) return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            Error fetching Medals data, please try again later!
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )

        if (loading) return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            Loading Medal Data..... 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
        

        console.log(data);
        console.log(sortField);

        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h3' color='grey' className="medal_widget_header">MEDAL COUNT</Header>
                            <Table basic='very' unstackable textAlign="center" compact>
                                <Table.Header>
                                    <Table.Row className="medal_widget_table_header">
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell className="selected">
                                            <Label circular color='yellow' 
                                                data-medal-type='gold'
                                                onClick={this.handleMedalIconClick} />
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Label circular color='grey' 
                                                data-medal-type='silver'
                                                onClick={this.handleMedalIconClick} />
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Label circular color='brown' 
                                                data-medal-type='bronze'
                                                onClick={this.handleMedalIconClick} />
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>TOTAL</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {renderMedalDataRows(data, MedalWidgetItem)}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}


export default MedalWidget;