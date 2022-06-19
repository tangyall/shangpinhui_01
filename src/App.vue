<template>
  <div>
    <Header></Header>
    <!-- 路由组件的出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  created() {},
  mounted() {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
