import { Button } from "antd"
import React from "react"
import { connect } from "react-redux"

import {
    HistoryProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryItem } from "../../store/history/types"

export class RemoveLocation extends React.Component<HistoryProps & HistoryItem> {

    constructor(props: HistoryProps & HistoryItem) {
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
