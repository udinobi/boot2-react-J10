<template>
  <div class='location-box mt-5 mx-1'>
    <div class='container'>
      <div class='row mb-4'>
        <div class='col-sm'>
          <select id='countries' name='countries'
                  @change="countrySelected" v-model='selectedCountry'>
            <option v-for='country in countries' :key='country.name' v-bind:value='country.code'>
              {{ country.name }}
            </option>
          </select>
        </div>
      </div>
      <div class='row mb-5'>
        <div class='col-sm'>
          <input class='form-control' type='text' placeholder='Enter a location...'
                @keyup='fetchSuggestedLocations' v-model='location' :disabled='!supportedCountry'>
        </div>
      </div>
    </div>
    <div class='container-fluid'>
      <div class='row' v-for="suggestion in suggestions" :key="suggestion.name">
        <div class='col'>
          <button class="btn btn-light mt-4 text-left w-100" type="button">
            <div class='float-left'>{{ suggestion.name }}</div>
            <div class='float-right'>({{suggestion.location.lat}}, {{suggestion.location.lon}})</div>
            <div class='float-none'></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import suggestionService from '../service/suggestion'

export default {
    name: 'locations',
    data() {
        return {
            location: '',
            locations: [],
            selectedCountry: 'TH',
            suggestions: [],
            supportedCountry: true,
            countries: [
                { name: 'Brunei', code: 'BN' },
                { name: 'Cambodia', code: 'KH' },
                { name: 'Indonesia', code: 'ID' },
                { name: 'Laos', code: 'LA' },
                { name: 'Malaysia', code: 'MY' },
                { name: 'Myanmar', code: 'MM' },
                { name: 'Philippines', code: 'PH' },
                { name: 'Singapore', code: 'SG' },
                { name: 'Thailand', code: 'TH' },
                { name: 'Vietnam', code: 'VN' }
            ],
            url: `${this.$config.serviceHost}${this.$config.suggestionService}`
        }
    },
    methods: {
        countrySelected() {
            this.location = ''
            this.suggestions = []
            suggestionService.clearCache()
            this.supportedCountry = suggestionService.isCountrySupported(this.selectedCountry)
        },

        fetchSuggestedLocations(event) {
            const location = this.location.trim()
            if (location.length < 3) {
                this.suggestions = ''
                return
            }

            this.suggestions = suggestionService.getFromCache(location.toLowerCase())
            if (!this.suggestions) {
                suggestionService.searchFor(`${this.url}/${this.selectedCountry}/${location}`, data => {
                    this.suggestions = data
                })
            }
        }
    }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    .clr {
        clear: both;
    }
    .location-box {
        font-size: 1.3em;
    }
    input {
        background-color: #343A40;
        border: 0;
        color: #687f7f;
        font-size: 1.3em;
        padding: 20px;
    }
    select {
        font-size: 1.3em;
        padding: 10px;
        width: 100%;
    }
</style>
