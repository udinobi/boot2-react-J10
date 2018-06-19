import { reloadLocation } from '../history/actions'
import { locationSelected } from '../location/cityActions'

export interface MapDispatchProps {
    locationSelected: typeof locationSelected
    reloadLocation: typeof reloadLocation
}

export const mapMapDispatchToProps = {
    locationSelected,
    reloadLocation
}
