<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="mouseLeave" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <!-- 事件委派 -->
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{item_on:currentIndex === index}"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                          >{{c3.categoryName}}</a>
                        </em>
                        <em>
                          <a href>文学</a>
                        </em>
                        <em>
                          <a href>经管</a>
                        </em>
                        <em>
                          <a href>畅读VIP</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true
    };
  },
  mounted() {
    // this.getCategoryList();
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },
    // moveIn(index) {
    //   this.currentIndex = index;
    // },
    //节流(固定时间内触发一次，防止滑动过快时产生的bug)
    moveIn: throttle(
      function(index) {
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),
    mouseLeave() {
      this.currentIndex = -1;
      //鼠标移出隐藏23级
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    toSearch(event) {
      let data = event.target.dataset; //dataset可以拿到自定义属性组成的一个对象
      let { categoryname, category1id, category2id, category3id } = data; //里面的属性都是小写，采用解构
      if (categoryname) {
        let location = {
          name: "search"
        };
        let query = {};
        query.categoryName = categoryname;
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        //点击三级分类的时候，我们也不能光关注query参数，也要去看看之前有没有params参数
        //如果有，需要把之前的params参数也带上
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }
        if (this.$route.path !== "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    }
  },
  computed: {
    // ...mapState(['categoryList'])//错误
    //mapState映射的是总的store的state内部的数据
    // categoryList(){
    // return this.$store.state.home.categoryList
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.show-enter {
        height: 0;
        opacity: 0;
      }
      // &.show-enter-to {
      //   height: 461px;
      //   opacity: 1;
      // }
      &.show-enter-active {
        transition: all 3s;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-image: linear-gradient(
              to right,
              #eea2a2 0%,
              #bbc1bf 19%,
              #57c6e1 42%,
              #b49fda 79%,
              #7ac5d8 100%
            );
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>