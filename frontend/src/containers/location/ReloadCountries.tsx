import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import { updateCountries } from "../../store/location/actions"

interface DispatchProps {
    updateCountries: typeof updateCountries
}

const ReloadCountries = (props: DispatchProps) =>
    <Button icon="reload" onClick={props.updateCountries} shape="circle" />

const mapDispatchToProps = {
    updateCountries
}

export default connect(undefined, mapDispatchToProps)(ReloadCountries);
