import { shallow } from "enzyme"
import toJson from "enzyme-to-json"
import React from "react"

import { none } from "ts-option"

import WeatherContainer, { Data } from "../../../../components/weather/WeatherContainer"

describe("--> Snapshot for Components > weather > 'WeatherContainer'", () => {
    let props: Data

    beforeEach(() => {
        props = {
            lastUpdate: none,
            location: {
                coord: { lat: "", lon: "" },
                country: { code : "IT", name: "Italy" },
                geoId: 0,
                name: "",
                tz: ""
            },
            weatherData: {
                coord: { lat: 0, lon: 0 },
                main: {
                    grnd_level: 0,
                    humidity: 0,
                    pressure: 0,
                    sea_level: 0,
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0,
                },
                sys: { sunrise: 0, sunset: 0 },
                weather: [ {
                    description: "",
                    icon: "",
                    id: 0,
                    main: ""
                } ]
            }
        }
    })

    it("matches", () => {
        const wrapper = shallow(<WeatherContainer {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
