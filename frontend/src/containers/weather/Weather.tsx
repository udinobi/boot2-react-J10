import React from "react"
import { connect } from "react-redux"

import { option } from "ts-option"

import CenteredDiv from "../../components/lib/CenteredDiv"
import Spinner from "../../components/lib/Spinner"

import FilterContainer from "../../components/weather/FilterContainer"

import { AppState } from "../../store/store"

import { mapWeatherDispatchToProps, WeatherProps } from "../../store/weather/actions";

import { initialState } from "../../store/weather/reducer"

import { WeatherState } from "../../store/weather/types"


export class WeatherComponent extends React.Component<WeatherProps, WeatherState> {

    private readonly owmApiKey = option(process.env.REACT_APP_OWM_API_KEY)
    
    constructor(props: WeatherProps) {
        super(props)

        this.state = initialState
    }

    public componentWillReceiveProps(props: WeatherProps & WeatherState) {
        this.setState({
            askingWeatherDataToOWM: props.askingWeatherDataToOWM,
            lastUpdate: props.lastUpdate,
            location: props.location,
            weatherData: props.weatherData
        })

        if (props.askingWeatherDataToOWM) {
            this.owmApiKey.map(_ =>
                props.location.map(location => props.weatherDataRetrieve(location, _))
            )
        }
    }

    public render() {
        return this.owmApiKey
            .map(_ => this.owmDefined())
            .getOrElse(this.owmNotDefined())
    }

    private owmDefined = () => this.state.askingWeatherDataToOWM
        ? <Spinner />
        : <FilterContainer {...this.state}/>

    private owmNotDefined = () =>
        <CenteredDiv>
            Please, provide your OpenWeatherMap API key to retrieve weather information.
        </CenteredDiv>
}

const mapStateToProps = (state: AppState): WeatherState => ({
    ...state.weatherState
})

export default connect(mapStateToProps, mapWeatherDispatchToProps)(WeatherComponent)
