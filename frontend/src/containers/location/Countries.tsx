import { Select } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

/*
import { AppState, ConnectedReduxProps } from "../../store/store"

interface CountriesProps extends ConnectedReduxProps<LocationState> {
*/

import { Option } from "tsoption"

import { AppState } from "../../store/store"

import { updateCountries } from "../../store/location/actions"

import { Country } from "../../store/location/types"

interface CountriesState {
    countries: Country[]
}

interface SelectionState {
    country: string
}

interface DispatchProps {
    updateCountries: typeof updateCountries
}

class Countries extends React.Component<DispatchProps, CountriesState & SelectionState> {

    private readonly Option = Select.Option

    private readonly select = styled(Select)`
        font-size: 1.1rem;
        width: 100%;
    `

    constructor(props: DispatchProps) {
        super(props)
        this.state = { countries: [], country: "" }
    }

    public componentDidMount() {
        this.props.updateCountries()
    }

    public componentWillReceiveProps(props: DispatchProps & CountriesState) {
        if (this.state.countries !== props.countries) {
            const country = props.countries.length === 0
                ? ""                                  // No countries... need to clear <select>
                : (this.state.country.length === 0    // Have countries but if no current selection then... 
                    ? props.countries[0].name            // Set the <select> to the 1st element in props.countries
                                                      // else <select> has a current selection then...
                    : Option.of(props.countries.find(_ => _.name === this.state.country))
                        .map(_ => _.name)             // check if selection is in props.countries
                        .getOrElse(props.countries[0].name)  // if not set the <select> to the 1st element in props.countries
                )
                       
            this.setState({
                countries: props.countries,
                country
            })
        }
    }

    public render() {
        console.log("rendering")
        const countries = this.state.countries;
        const options = countries.map(country => <this.Option value={country.name} key={country.code}>{country.name}</this.Option>);
        return (
            <this.select value={this.state.country} onChange={this.handleChange}>
                {options}
            </this.select>
        )
    }

    private readonly handleChange = (country: string) => {
        this.setState({ country })
}
}

const mapStateToProps = (state: AppState): CountriesState => ({
    countries: state.countriesState.countries
})

const mapDispatchToProps = {
    updateCountries
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
