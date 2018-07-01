import { AutoComplete } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { option } from "ts-option"

import { initialCityState } from "../../store/location/city/reducer"

import { AppState } from "../../store/store"

import {
    CityProps,
    mapCityDispatchToProps
} from "../../store/location/city/actions"

import { CityState, Location } from "../../store/location/city/types"

export class City extends React.Component<CityProps, CityState> {

    private readonly autocomplete = styled(AutoComplete)`
        font-size: 1.1rem;
        width: 100%;
    `

    private readonly minLenSuggestionPrefix =
        +option(process.env.REACT_APP_MIN_LEN_SUGGESTION_PREFIX).getOrElse("3")

    private readonly Option = AutoComplete.Option

    constructor(props: CityProps) {
        super(props)

		this.state = initialCityState
        this.onSelect = this.onSelect.bind(this)
    }

    public componentWillReceiveProps(props: CityProps & CityState) {
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

        if (locationTerm.length < this.minLenSuggestionPrefix) {
            if (this.state.suggestions.length > 0) {
                this.props.suggestionsReset();
            }
        } else {
            this.state.country.map(country =>
                this.props.suggestionsLookup(country, locationTerm)
            )
        }
    }

    private readonly onSelect = (value: string) =>
        option(this.state.suggestions[+value])
            .map((suggestion: Location) => this.props.locationSelected(suggestion))
}

const mapStateToProps = (state: AppState): CityState => ({
    country: state.cityState.country,
    suggestions: state.cityState.suggestions
})

export default connect(mapStateToProps, mapCityDispatchToProps)(City);
