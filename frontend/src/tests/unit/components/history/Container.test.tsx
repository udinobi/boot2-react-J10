import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import Container from "../../../../components/history/Container"

describe("--> Snapshot for Components > History 'Container'", () => {
    it("matches", () => {
        const wrapper = shallow(<Container />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
