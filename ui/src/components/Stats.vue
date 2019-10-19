<template>
  <v-container class="pa-5">
    <v-row>
      <v-col>
        <h2 class="text-center">
          SPRINT<span class="font-weight-light">STATS</span>
          <v-icon medium class="ml-1">
            mdi-chart-bar
          </v-icon>
        </h2>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <v-progress-circular
        rotate="-90"
          size="100"
          width="15"
          color="accent"
          :value="countriesStats.productivity"
        >
          {{ countriesStats.productivity    }}
        </v-progress-circular>

      </v-col>
      <v-col>
        Average sprinter productivity:
        <h1>{{ countriesStats.productivity }} %</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ul>
          <li>
            Sprinters from <b>{{ countriesNumber }}</b> countries participated
          </li>
          <li>
            Sprintasks completed: <b>{{ countriesStats.completed }}</b>
            (<b>{{ countriesStats.completedPct }}</b>%)
          </li>
          <li>
            Sprintasks remaining: <b>{{ countriesStats.left }}</b>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        Most productive country:
        <h2 color="accent--text">
          <v-icon x-large color="accent">
            mdi-map-marker
          </v-icon>
          <span class="accent--text">
            {{ mostProductiveCountry.countryName }} ({{ mostProductiveCountry.stats.productivity }} %)
          </span>
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['stats']),
    countriesNumber () {
      return Object.keys(this.stats).length
    },
    countriesStats () {
      const countries = Object.values(this.stats)

      if (!countries.length) {
        return { }
      }

      const result = countries.reduce(
        (acc, country) => {
          const { stats } = country
          acc.completed += stats.completed
          acc.left += stats.left
          const total = stats.completed + stats.left
          acc.completedPct += stats.completed / total
          acc.productivity += stats.productivity
          return acc
        }, {
          completed: 0,
          completedPct: 0,
          left: 0,
          productivity: 0
        })

      result.completedPct = Math.round(100 * result.completed / (result.completed + result.left))
      const calcAvg = val => Math.round(val / countries.length)
      result.completed = calcAvg(result.completed)
      result.left = calcAvg(result.left)
      result.productivity = calcAvg(result.productivity)

      return result
    },
    mostProductiveCountry () {
      return Object.values(this.stats)
        .sort(
          (a, b) => a.stats.productivity - b.stats.productivity
        )[0] || { stats: { } }
    }
  }
}
</script>
