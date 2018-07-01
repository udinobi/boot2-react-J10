import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import MapInfo, { MapInfoState } from "../../../../components/map/MapInfo"

describe("--> Snapshot for Components > map > 'MapInfo'", () => {
    let props: MapInfoState

    beforeEach(() => {
        props = {
            coord: [ 0, 0 ],
            zoom: 11
        }
    })

    it("matches", () => {
        const wrapper = shallow(<MapInfo {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
