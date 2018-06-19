import { Select } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { None, Option } from "tsoption"

import { AppState } from "../../store/store"

import {
    LoadCountryDispatchProps,
    mapCountryDispatchToProps
} from "../../store/location/countryActions"

import { Country, CountryState } from "../../store/location/types"

interface SelectionState {
    country: Option<Country>
}

interface Value {
    key: string
    label: string
}

class Countries extends React.Component<LoadCountryDispatchProps, CountryState & SelectionState> {

    private readonly Option = Select.Option

    private readonly select = styled(Select)`
        font-size: 1.1rem;
        width: 100%;
    `

    constructor(props: LoadCountryDispatchProps) {
        super(props)

        this.state = {
            countries: [],
            country: None.of()
        }
    }

    public componentDidMount() {
        this.props.loadCountries()
    }

    public componentWillReceiveProps(props: LoadCountryDispatchProps & CountryState) {
        if (this.state.countries !== props.countries) {
            const country = props.countries.length === 0
                ? Option.of<Country>()               // No countries... need to clear <select>
                : this.state.country.flatMap(_1 =>   // Have countries and if have current selection then... 
                    // check if selection is in props.countries
                    Option.of(props.countries.find(_2 => _2.code === _1.code))
                )
                // if not, set the <select>'s value to the 1st element in props.countries
                .orElse(Option.of(props.countries[0]))

            country.map(_ => props.countrySelected(_))

            this.setState({
                countries: props.countries,
                country
            })
        }
    }

    public render() {
        return (
            <this.select
                labelInValue={true}
                onSelect={this.onSelect}
                value={this.state.country.map(this.value).getOrElse({ key: "", label: "" })}
            >
                {this.state.countries.map(this.optionsFromCountries)}
            </this.select>
        )
    }

    private readonly onSelect = (value: Value) => {
        const country = {
            code: value.key,
            name: value.label
        }
        this.setState({ country: Option.of(country) })
        this.props.countrySelected(country)
    }

    private readonly optionsFromCountries = (country: Country) =>
        <this.Option value={country.code} key={country.name}>
            {country.name}
        </this.Option>

    private readonly value = (country: Country) => ({
        key: country.code,
        label: country.name
    })
}

const mapStateToProps = (state: AppState): CountryState => ({
    countries: state.countryState.countries
})

export default connect(mapStateToProps, mapCountryDispatchToProps)(Countries);