<template>
  <div>
    <mobile v-if="loginType==='mobile'"/>
    <card v-else />
  </div>

</template>

<script>
import {Mobile, Card} from './components'
export default {
  name: 'Login',
  components: {
    Mobile,
    Card
  },
  data () {
    return {
      loginType: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.loginType = route.params.type
      },
      immediate: true
    }
  }
}
</script>
