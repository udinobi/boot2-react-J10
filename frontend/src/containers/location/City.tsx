import { AutoComplete } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { None } from "tsoption"

import { AppState } from "../../store/store"

import {
    LookupSuggestionsDispatchProps,
    mapLookupSuggestionDispatchToProps
} from "../../store/location/suggestionsActions"

import { SuggestionsState } from "../../store/location/types"

class City extends React.Component<LookupSuggestionsDispatchProps, SuggestionsState> {

    private readonly autocomplete = styled(AutoComplete)`
        font-size: 1.1rem;
        width: 100%;
    `

    private readonly Option = AutoComplete.Option

    constructor(props: LookupSuggestionsDispatchProps) {
        super(props)
        this.state = {
            country: None.of(),
            suggestions: []
        }

        this.onSelect = this.onSelect.bind(this)
    }

    public componentWillReceiveProps(props: LookupSuggestionsDispatchProps & SuggestionsState) {
        this.setState({
            country: props.country,
            suggestions: props.suggestions
        })
    }

    public render() {
        const suggestions = this.state.suggestions;
        const options = suggestions.map((suggestion, index) =>
            <this.Option value={`${index}`} key={suggestion.name}>
                {`${suggestion.name} [${suggestion.coord.lat},${suggestion.coord.lon}]`}
            </this.Option>
        );

        return (
            <this.autocomplete defaultActiveFirstOption={false} onSearch={this.onSearch} onSelect={this.onSelect}>
                {options}
            </this.autocomplete>
        )
    }

    private onSearch = (locationTerm: string) => {
        this.setState({ suggestions: [] })

        if (locationTerm.length > 2) {
            this.state.country.map(country =>
                this.props.lookupSuggestions(country, locationTerm)
            )
        }
    }

    private onSelect(value: string) {
        const suggestion = this.state.suggestions[+value]
        console.log(`value(${value}), suggestion(${JSON.stringify(suggestion)})`)
    }
}

const mapStateToProps = (state: AppState): SuggestionsState => ({
    country: state.suggestionsState.country,
    suggestions: state.suggestionsState.suggestions
})

export default connect(mapStateToProps, mapLookupSuggestionDispatchToProps)(City);
