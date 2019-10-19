<template>
  <v-row no-gutters align="center">
    <v-col class="text-right pr-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.56 39" style="width: 80px">
        <svg:style>
          .users-icon {
            fill: none;
            stroke: var(--v-users-base);
          }
        </svg:style>
        <g>
          <g>
            <path class="users-icon" d="M12.6,29.56A7.54,7.54,0,1,0,5.06,22,7.55,7.55,0,0,0,12.6,29.56Zm0-9A1.48,1.48,0,1,1,11.12,22,1.48,1.48,0,0,1,12.6,20.54Z" />
            <path class="users-icon" d="M.5,38.5a16.25,16.25,0,0,1,24.2,0" />
            <path class="users-icon" d="M48,29.56A7.54,7.54,0,1,0,40.42,22,7.55,7.55,0,0,0,48,29.56Zm0-9A1.48,1.48,0,1,1,46.48,22,1.48,1.48,0,0,1,48,20.54Z" />
            <path class="users-icon" d="M35.86,38.5a16.25,16.25,0,0,1,24.2,0" />
            <path class="users-icon" d="M30.28,15.58A7.54,7.54,0,1,0,22.74,8,7.55,7.55,0,0,0,30.28,15.58Zm0-9A1.48,1.48,0,1,1,28.8,8,1.48,1.48,0,0,1,30.28,6.56Z" />
          </g>
        </g>
      </svg>
    </v-col>
    <v-col class="col-auto">
      <h2 class="accent--text">{{ countData.count }}</h2>
      <h4>{{ countData.caption }}</h4>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isSprint']),
    ...mapState(['joinedSprintId', 'connectedUsers']),
    countData () {
      const getCount = arr => {
        if (arr && arr.length) {
          return arr.length
        }
        return 1
      }
      let caption = 'SPRINTERS JOINING'
      let count = getCount(this.connectedUsers.idle)
      if (this.joinedSprintId && this.isSprint) {
        caption = 'SPRINTERS WORKING'
        count = getCount(this.connectedUsers.joined)
      }
      return {
        caption, count
      }
    }
  }
}
</script>
