<template>
    <div>
        <pc v-if="showPage === 1" />
        <pda v-else />
    </div>
</template>

<script>
import Pda from './cardRead/pda'
import Pc from './cardRead/pc'
export default {
  name: 'card',
  components: {
    Pda,
    Pc
  },
  data () {
    return {
      showPage: 1
    }
  },
  created () {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      this.showPage = 2
    } else {
      this.showPage = 1
    }
  }
}
</script>

<style scoped>

</style>
