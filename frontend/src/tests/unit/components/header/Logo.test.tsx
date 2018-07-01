import React from "react"
import * as Renderer from 'react-test-renderer'

import Logo from "../../../../components/header/Logo"

describe("--> Snapshot for Components > header > 'Logo'", () => {
    it("matches", () => {
        const component = Renderer.create(<Logo />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
