import { AutoComplete } from "antd"
import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

import { None, Option } from "tsoption"

import { AppState } from "../../store/store"

import {
    CityDispatchProps,
    mapCityDispatchToProps
} from "../../store/location/cityActions"

import { CityState, Location } from "../../store/location/types"

class City extends React.Component<CityDispatchProps, CityState> {

    private readonly autocomplete = styled(AutoComplete)`
        font-size: 1.1rem;
        width: 100%;
    `

    private readonly Option = AutoComplete.Option

    constructor(props: CityDispatchProps) {
        super(props)
        this.state = {
            country: None.of(),
            suggestions: []
        }

        this.onSelect = this.onSelect.bind(this)
    }

    public componentWillReceiveProps(props: CityDispatchProps & CityState) {
        this.setState({
            country: props.country,
            suggestions: props.suggestions
        })
    }

    public render() {
        return (
            <this.autocomplete
                allowClear={true}
                defaultActiveFirstOption={false}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
            >
                {this.state.suggestions.map(this.optionsFromSuggestions)}
            </this.autocomplete>
        )
    }

    private readonly optionsFromSuggestions = (suggestion: Location, index: number) =>
        <this.Option value={`${index}`} key={suggestion.name}>
            {`${suggestion.name} [${suggestion.coord.lat},${suggestion.coord.lon}]`}
        </this.Option>

    private readonly onSearch = (locationTerm: string) => {
        this.setState({ suggestions: [] })

        if (locationTerm.length > 2) {
            this.state.country.map(country =>
                this.props.lookupSuggestions(country, locationTerm)
            )
        }
    }

    private readonly onSelect = (value: string) => {
        Option.of(this.state.suggestions[+value])
//            .map(suggestion => this.props.locationSelected(suggestion))
            .map(suggestion => {
                if (bangkok.length > 0) {
                    bangkok.forEach(_ => this.props.locationSelected(_))
                    bangkok = []
                }
                this.props.locationSelected(suggestion)
            })
    }
}

const mapStateToProps = (state: AppState): CityState => ({
    country: state.cityState.country,
    suggestions: state.cityState.suggestions
})

export default connect(mapStateToProps, mapCityDispatchToProps)(City);

/* tslint:disable:object-literal-sort-keys */
let bangkok: Location[] = [
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok",
	  geoId: 1609348,
	  coord: {
	    lat: "13.87719",
	    lon: "100.71991"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok",
	  geoId: 11876553,
	  coord: {
	    lat: "13.70352",
	    lon: "100.57718"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok",
	  geoId: 1609350,
	  coord: {
	    lat: "13.75398",
	    lon: "100.50144"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Asia Hotel",
	  geoId: 6957530,
	  coord: {
	    lat: "13.7529",
	    lon: "100.53"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Bar",
	  geoId: 1619462,
	  coord: {
	    lat: "13.47257",
	    lon: "100.62517"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Boutique Hotel",
	  geoId: 7114246,
	  coord: {
	    lat: "13.7457",
	    lon: "100.562"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Centre Hotel",
	  geoId: 7114766,
	  coord: {
	    lat: "13.7263",
	    lon: "100.544"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Cha Da Superior",
	  geoId: 9885912,
	  coord: {
	    lat: "13.77403",
	    lon: "100.57395"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Cha-Da",
	  geoId: 7114247,
	  coord: {
	    lat: "13.774",
	    lon: "100.574"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Christian Guesthouse",
	  geoId: 10344640,
	  coord: {
	    lat: "13.72736",
	    lon: "100.53407"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok City Inn",
	  geoId: 7114249,
	  coord: {
	    lat: "13.73",
	    lon: "100.5"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Condotel",
	  geoId: 10100887,
	  coord: {
	    lat: "13.79086",
	    lon: "100.54374"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Garden Resort and Spa",
	  geoId: 10289705,
	  coord: {
	    lat: "13.77803",
	    lon: "100.60857"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Golf Spa Resort",
	  geoId: 9950298,
	  coord: {
	    lat: "13.9818",
	    lon: "100.54272"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Golf Spa Resort",
	  geoId: 6505282,
	  coord: {
	    lat: "15.0086",
	    lon: "100.9557"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Hiptique Hotel",
	  geoId: 9950337,
	  coord: {
	    lat: "13.7459",
	    lon: "100.5583"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Hotel Lotus Sukhumvit",
	  geoId: 9882746,
	  coord: {
	    lat: "13.72965",
	    lon: "100.57284"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Inter Place",
	  geoId: 10101981,
	  coord: {
	    lat: "13.75344",
	    lon: "100.62246"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Loft Inn",
	  geoId: 10109660,
	  coord: {
	    lat: "13.72178",
	    lon: "100.49176"
	  }
	},
	{ country: { code : "TH", name: "Thailand" },
	  name: "Bangkok Marriott Hotel Sukhumv",
	  geoId: 10116442,
	  coord: {
	    lat: "13.72288",
	    lon: "100.58112"
	  }
	}
]
