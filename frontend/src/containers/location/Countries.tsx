import { Select } from 'antd';
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

/*
import { AppState, ConnectedReduxProps } from "../../store/store"

interface CountriesProps extends ConnectedReduxProps<LocationState> {
*/

import { AppState } from "../../store/store"

import { updateCountries } from "../../store/location/actions"

import { Country } from "../../store/location/types"

interface CountriesState {
    countries: Country[]
}

interface DispatchProps {
    updateCountries: typeof updateCountries
}

class Countries extends React.Component<DispatchProps, CountriesState> {

    private readonly Option = Select.Option

    private readonly select = styled(Select)`
        font-size: 1.1rem;
        width: 100%;
    `

    constructor(props: DispatchProps) {
        super(props)
        this.state = { countries: [] }
    }

    public componentDidMount() {
        this.props.updateCountries()
    }

    public componentWillReceiveProps(props: DispatchProps & CountriesState) {
        if (this.state.countries !== props.countries) {
            this.setState({
                countries: props.countries
            })
        }
    }

    public render() {
        const countries = this.state.countries;
        const value = countries.length === 0 ? "" : countries[0].name;
        const options = countries.map(country => <this.Option value={country.name} key={country.code}>{country.name}</this.Option>);
        return (
            <this.select value={value} onChange={this.handleChange}>
                {options}
            </this.select>
        )
    }

    private readonly handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }
}

const mapStateToProps = (state: AppState): CountriesState => ({
    countries: state.countriesState.countries
})

const mapDispatchToProps = {
    updateCountries
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
