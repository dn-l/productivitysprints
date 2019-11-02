<template>
  <div>
    <span v-if="currentState">{{ timer.minutes }}:{{ timer.seconds }}</span>
    <span v-else>..:..</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const MINUTE = 60 * 1000
const SECOND = 1000

export default {
  data () {
    return { now: Date.now(), minutes: undefined, seconds: undefined }
  },

  computed: {
    ...mapState(['currentState']),
    timer () {
      const timeLeft = (this.currentState.endsAt - this.now)
      if (timeLeft <= 0) {
        return { minutes: '..', seconds: '..' }
      }
      const minutes = Math.floor(timeLeft / MINUTE)
      const seconds = Math.floor((timeLeft % MINUTE) / SECOND)
      return {
        minutes,
        seconds: String('0' + seconds).slice(-2)
      }
    }
  },

  created () {
    this.interval = setInterval(() => {
      this.now = Date.now()
    }, 1000)
  },

  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
  span {
    font-size: 4em;
    font-weight: 300;
  }
</style>
