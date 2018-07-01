import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import TemperatureMax, { Data } from "../../../../components/weather/TemperatureMax"

describe("--> Snapshot for Components > weather > 'TemperatureMax'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            maxTemperature: 0
        }
    })

    it("matches", () => {
        const wrapper = shallow(<TemperatureMax {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
