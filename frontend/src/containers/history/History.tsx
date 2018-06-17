import { List } from "antd"

import React from "react"
import Scroller from "react-infinite-scroller"
import { connect } from "react-redux"
import ReactTooltip from 'react-tooltip'

import { AppState } from "../../store/store"

import ReloadLocation from "./ReloadLocation"
import RemoveLocation from "./RemoveLocation"

import {
    HistoryDispatchProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { HistoryState } from "../../store/history/types"

import { Location } from "../../store/location/types"

class History extends React.Component<HistoryDispatchProps, HistoryState> {

    constructor(props: HistoryDispatchProps) {
        super(props)
        this.state = {
            locations: []
        }
    }

    public componentWillReceiveProps(props: HistoryDispatchProps & HistoryState) {
        this.setState({
            locations: props.locations
        })
    }

    public render() {
        return (
            <div style={{ overflow: "auto", height: 300 }}>
                <Scroller
                    loadMore={this.loadMore}
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.locations}
                        renderItem={this.itemsFromLocations}
                    />
                </Scroller>
            </div>
        )
    }

    private readonly itemsFromLocations = (location: Location) =>
        <List.Item key={location.geoId} className="history-location-item">
            <div className="history-location-wrapper">
                <RemoveLocation location={location} />
                <ReactTooltip id="RemoveLocation">
                    <div>Remove this location</div>
                    <div>&nbsp; from the History.</div>
                </ReactTooltip>
    
                <ReloadLocation location={location} />
                <ReactTooltip id="ReloadLocation">
                    <div>Reload the weather info</div>
                    <div>&nbsp; for this location.</div>
                </ReactTooltip>
            </div>

            {`${location.name} (${location.country.code}) [${location.coord.lat},${location.coord.lon}]`}
        </List.Item>

    /* tslint:disable:no-empty */
    private readonly loadMore = (page: number) => {}
}

const mapStateToProps = (state: AppState): HistoryState => ({
    locations: state.historyState.locations
})

export default connect(mapStateToProps, mapHistoryDispatchToProps)(History);
