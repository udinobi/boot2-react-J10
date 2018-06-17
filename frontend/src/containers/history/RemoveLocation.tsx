import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    HistoryDispatchProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryLocation } from "../../store/history/types"

class RemoveLocation extends React.Component<HistoryDispatchProps & HistoryLocation> {

    constructor(props: HistoryDispatchProps & HistoryLocation) {
        super(props)
    }

    public render() {
        return (
            <Button
                /* tslint:disable:jsx-boolean-value */
                data-tip data-for="RemoveLocation"
                icon="minus-circle"
                /* tslint:disable:jsx-no-lambda */
                onClick={() => this.props.removeLocation(this.props.location)}
                shape="circle"
                size="small"
                type="danger"
            />
        )
    }
}

export default connect(undefined, mapHistoryDispatchToProps)(RemoveLocation);
