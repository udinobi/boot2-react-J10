import React from "react"
import * as Renderer from 'react-test-renderer'

import Title from "../../../../components/header/Title"

describe("--> Snapshot for Components > header > 'Title'", () => {
    it("matches", () => {
        const component = Renderer.create(<Title />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
