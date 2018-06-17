import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    LoadCountryDispatchProps,
    mapCountryDispatchToProps
} from "../../store/location/countryActions"

const ReloadCountries = (props: LoadCountryDispatchProps) => {
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
