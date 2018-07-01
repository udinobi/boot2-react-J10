import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Container from "../../../../components/map/Container"

describe("--> Snapshot for Components > map > 'Container'", () => {
    it("matches", () => {
        const wrapper = shallow(<Container />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
