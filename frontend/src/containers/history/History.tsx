import { List } from "antd"

import React from "react"
import Scroller from "react-infinite-scroller"
import { connect } from "react-redux"
import ReactTooltip from 'react-tooltip'

import { AppState } from "../../store/store"

import ReloadLocation from "./ReloadLocation"
import RemoveLocation from "./RemoveLocation"

import { historyAndMapHeight } from "../map/Map"

import {
    HistoryProps,
    mapHistoryDispatchToProps
} from "../../store/history/actions"

import { initialHistoryState } from "../../store/history/reducer"

import { HistoryItem, HistoryState } from "../../store/history/types"

export class History extends React.Component<HistoryProps, HistoryState> {

    constructor(props: HistoryProps) {
        super(props)

        this.state = initialHistoryState
    }

    public componentWillReceiveProps(props: HistoryProps & HistoryState) {
        this.setState({
            items: props.items
        })
    }

    public render() {
        const height = historyAndMapHeight

        return (
            <div style={{ height, overflow: "auto" }}>

                <Scroller
                    loadMore={this.loadMore}
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.items}
                        renderItem={this.itemsFromLocations}
                    />
                </Scroller>
            </div>
        )
    }

    private readonly itemsFromLocations = (item: HistoryItem) =>
        <List.Item key={item.location.geoId} className="history-location-item">
            <div className="history-location-wrapper">
                <RemoveLocation {...item} />
                <ReactTooltip id="RemoveLocation">
                    <div>Remove this location</div>
                    <div>{"\u00a0"} from the History.</div>
                </ReactTooltip>
    
                <ReloadLocation {...item} />
                <ReactTooltip id="ReloadLocation">
                    <div>Reload the weather info</div>
                    <div>{"\u00a0"} for this location.</div>
                </ReactTooltip>
            </div>

            {`${item.location.name} (${item.location.country.code}) [${item.location.coord.lat},${item.location.coord.lon}]`}
        </List.Item>

    /* tslint:disable:no-empty */
    private readonly loadMore = (page: number) => {}
}

const mapStateToProps = (state: AppState): HistoryState => ({
    items: state.historyState.items
})

export default connect(mapStateToProps, mapHistoryDispatchToProps)(History);
