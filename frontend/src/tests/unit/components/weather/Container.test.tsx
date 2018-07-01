import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Container from "../../../../components/weather/Container"

describe("--> Snapshot for Components > weather > 'Container'", () => {
    it("matches", () => {
        const wrapper = shallow(<Container />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
