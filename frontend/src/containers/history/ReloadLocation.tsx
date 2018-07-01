import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    HistoryProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryItem } from "../../store/history/types"

export class ReloadLocation extends React.Component<HistoryProps & HistoryItem> {

    constructor(props: HistoryProps & HistoryItem) {
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
