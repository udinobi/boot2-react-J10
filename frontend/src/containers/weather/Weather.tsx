import React from "react"
import { connect } from "react-redux"

import { Option } from "tsoption"

import CenteredDiv from "../../components/lib/CenteredDiv"
import Spinner from "../../components/lib/Spinner"

import FilterContainer from "../../components/weather/FilterContainer"

import { AppState } from "../../store/store"

import { mapWeatherDispatchToProps, WeatherDispatchProps } from "../../store/weather/actions";

import { initialState } from "../../store/weather/reducer"

import { WeatherState } from "../../store/weather/types"


class WeatherComponent extends React.Component<WeatherDispatchProps, WeatherState> {

    private readonly owmApiKey = Option.of(process.env.REACT_APP_OWM_API_KEY)
    
    constructor(props: WeatherDispatchProps) {
        super(props)

        this.state = initialState
    }

    public componentWillReceiveProps(props: WeatherDispatchProps & WeatherState) {
        this.setState({
            askingWeatherDataToOWM: props.askingWeatherDataToOWM,
            location: props.location,
            requestTime: props.requestTime,
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
