import { AutoComplete } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { Option } from "tsoption"

import { initialCityState } from "../../store/location/reducer"

import { AppState } from "../../store/store"

import {
    CityDispatchProps,
    mapCityDispatchToProps
} from "../../store/location/cityActions"

import { CityState, Location } from "../../store/location/types"

class City extends React.Component<CityDispatchProps, CityState> {

    private readonly autocomplete = styled(AutoComplete)`
        font-size: 1.1rem;
        width: 100%;
    `

    private readonly Option = AutoComplete.Option

    constructor(props: CityDispatchProps) {
        super(props)

				this.state = initialCityState
        this.onSelect = this.onSelect.bind(this)
    }

    public componentWillReceiveProps(props: CityDispatchProps & CityState) {
        this.setState({
            country: props.country,
            suggestions: props.suggestions
        })
    }

    public render() {
        return (
            <this.autocomplete
                allowClear={true}
                defaultActiveFirstOption={false}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
            >
                {this.state.suggestions.map(this.optionsFromSuggestions)}
            </this.autocomplete>
        )
    }

    private readonly optionsFromSuggestions = (suggestion: Location, index: number) =>
        <this.Option value={`${index}`} key={suggestion.name}>
            {`${suggestion.name} [${suggestion.coord.lat},${suggestion.coord.lon}]`}
        </this.Option>

    private readonly onSearch = (locationTerm: string) => {
        this.setState({ suggestions: [] })

        if (locationTerm.length > 2) {
            this.state.country.map(country =>
                this.props.lookupSuggestions(country, locationTerm)
            )
        }
    }

    private readonly onSelect = (value: string) =>
        Option.of(this.state.suggestions[+value])
            .map(suggestion => this.props.locationSelected(suggestion))
}

const mapStateToProps = (state: AppState): CityState => ({
    country: state.cityState.country,
    suggestions: state.cityState.suggestions
})

export default connect(mapStateToProps, mapCityDispatchToProps)(City);
