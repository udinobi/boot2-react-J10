import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    LoadCountriesDispatchProps,
    mapCountriesDispatchToProps
} from "../../store/location/countriesActions"

const ReloadCountries = (props: LoadCountriesDispatchProps) => {
    {/* tslint:disable:jsx-boolean-value */}
    return <Button
        data-tip data-for="ReloadCountries"
        icon="reload"
        onClick={props.loadCountries}
        shape="circle"
    />
}

export default connect(undefined, mapCountriesDispatchToProps)(ReloadCountries);
