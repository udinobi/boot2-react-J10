import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    CountriesProps,
    mapCountryDispatchToProps
} from "../../store/location/country/actions"

export const ReloadCountries = (props: CountriesProps) => {
    {/* tslint:disable:jsx-boolean-value */}
    return <Button
        data-tip data-for="ReloadCountries"
        icon="reload"
        onClick={props.loadCountries}
        shape="circle"
        type="primary"
    />
}

export default connect(undefined, mapCountryDispatchToProps)(ReloadCountries);
