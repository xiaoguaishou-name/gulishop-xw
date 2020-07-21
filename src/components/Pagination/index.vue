<template>
  <div class="pagination">
    <!-- 当当前页码为第一页时，应该被禁止点击 -->
    <button :disabled="currentPageNum === 1" @click="$emit('changePage',currentPageNum - 1)">上一页</button>
    <!-- 当当前页码大于1时，第一页才显示 当前点击为第一页显示背景颜色代表选中-->
    <button v-show="startEnd.start > 1" :class="{active:currentPageNum === 1}" @click="$emit('changePage',1)">1</button>
    <!-- 当当前页码大于2时，第一页才显示 -->
    <button v-show="startEnd.start > 2">···</button>

    <button v-for="page in startEnd.end" :key="page"
    v-if="page >= startEnd.start"
    :class="{active:currentPageNum === page}"
    @click="$emit('changePage',page)">
    {{page}}
    </button>
 
    <!-- 当当前页码小于总页数 - 1时，...才显示 -->
    <button v-show="startEnd.end < totalPage - 1">···</button>
    <!-- 当当前页码小于总页数时，总页数才显示 -->
    <button v-show="startEnd.end < totalPage" :class="{active:currentPageNum === totalPage}" @click="$emit('changePage',totalPage)">{{totalPage}}</button>
    <!-- 当当前页为最后一页时，应禁止 -->
    <button :disabled="startEnd.end === totalPage" @click="$emit('changePage',currentPageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['currentPageNum','pageSize','total','continueNum'],
  computed:{
    // 计算总页数
    totalPage(){
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页码的起始和结束
    startEnd(){
      let {currentPageNum,totalPage,continueNum} = this
      let start
      let end
      let disNum
      // 判断总页码是否比连续页码小
      if(totalPage < continueNum){
        //如果是，显示全部页码
        start = 1
        end = totalPage
      }else{
        //如果不是(正常情况下)
        start = currentPageNum - Math.floor(continueNum / 2)
        end = currentPageNum + Math.floor(continueNum / 2)
        // 二般情况判断左右边界
        if(start <= 1){
          disNum = 1 - start
          start += disNum
          end += disNum
        }
        if(end >= totalPage){
          disNum = end - totalPage
          start -= disNum
          end -= disNum
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
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
  }
}
</style>