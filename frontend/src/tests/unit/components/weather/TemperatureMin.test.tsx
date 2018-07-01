import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import TemperatureMin, { Data } from "../../../../components/weather/TemperatureMin"

describe("--> Snapshot for Components > weather > 'TemperatureMin'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            minTemperature: 0
        }
    })

    it("matches", () => {
        const wrapper = shallow(<TemperatureMin {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
