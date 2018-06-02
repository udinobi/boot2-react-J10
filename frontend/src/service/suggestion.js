import axios from 'axios'

// Minimum rate in ms at which suggestions are provided while the user is typing.
// const minSuggestionRate = 250
// const maxSuggestionCacheEntries = 1000
const suggestionCache = new Map()

export default {
    getFromCache: location => suggestionCache.get(location),

    clearCache: () => suggestionCache.clear(),

    isCountrySupported: selectedCountry => selectedCountry === 'TH',

    searchFor: (url, assign) => {
        axios.get(url)
            .then(response => assign(response.data))
            .catch(e => this.errors.push(e))
    }
}
