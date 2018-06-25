import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    HistoryDispatchProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryItem } from "../../store/history/types"

class ReloadLocation extends React.Component<HistoryDispatchProps & HistoryItem> {

    constructor(props: HistoryDispatchProps & HistoryItem) {
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
                    onClick={() => this.props.reloadLocation(this.props)}
                    shape="circle"
                    size="small"
                    type="primary"
                />
            </span>
        )
    }
}

export default connect(undefined, mapHistoryDispatchToProps)(ReloadLocation);
