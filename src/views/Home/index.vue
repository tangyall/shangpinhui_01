<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/LIke'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
