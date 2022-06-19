<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="getPageNoSon(pageNo - 1)">上一页</button>
    <button v-if="startNumEndNum.start > 1" :class="{ active: pageNo == 1 }" @click="getPageNoSon(1)">1</button>
    <button v-if="startNumEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page, index) in startNumEndNum.end" :key="index" v-if="page >= startNumEndNum.start" :class="{ active: pageNo == page }" @click="getPageNoSon(page)">{{ page }}</button>

    <button v-if="startNumEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumEndNum.end < totalPage" :class="{ active: pageNo == totalPage }" @click="getPageNoSon(totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="getPageNoSon(totalPage + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共多少页
    totalPage() {
      // 向上取整，保证所有的数据都可以展示
      return Math.ceil(this.total / this.pageSize)
    },
    startNumEndNum() {
      const { continues, pageNo, totalPage } = this
      let start = 0
      let end = 0
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  },
  methods: {
    getPageNoSon(pageNo) {
      this.$emit('getPageNo', pageNo)
      // console.log(this.pageNo, '11')
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
    .active {
      background-color: skyblue;
    }
  }
}
</style>
