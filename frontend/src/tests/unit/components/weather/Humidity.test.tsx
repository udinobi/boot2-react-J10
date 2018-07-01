import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Humidity, { Data } from "../../../../components/weather/Humidity"

describe("--> Snapshot for Components > weather > 'Humidity'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            humidity: 0
        }
    })

    it("matches", () => {
        const wrapper = shallow(<Humidity {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
