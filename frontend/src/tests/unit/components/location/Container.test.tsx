import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Container from "../../../../components/location/Container"

describe("--> Snapshot for Components > location > 'Container'", () => {
    it("matches", () => {
        const wrapper = shallow(<Container />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
