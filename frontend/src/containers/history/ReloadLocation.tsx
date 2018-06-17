import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    HistoryDispatchProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryLocation } from "../../store/history/types"

class ReloadLocation extends React.Component<HistoryDispatchProps & HistoryLocation> {

    constructor(props: HistoryDispatchProps & HistoryLocation) {
        super(props)
    }

    public render() {
        return (
            <span style={{ marginLeft: 8 }}>
                <Button
                    /* tslint:disable:jsx-boolean-value */
                    data-tip data-for="ReloadLocation"
                    icon="reload"
                    /* tslint:disable:jsx-no-lambda */
                    onClick={() => this.props.reloadLocation(this.props.location)}
                    shape="circle"
                    size="small"
                    type="primary"
                />
            </span>
        )
    }
}

export default connect(undefined, mapHistoryDispatchToProps)(ReloadLocation);
