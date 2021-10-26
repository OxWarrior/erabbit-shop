<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span>{{paramsList.salesCount}}</span><span>人购买</span></p>
        <p><span>{{paramsList.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a @click="changeCondition(index)" href="javascript:;" :class="{active:currentIndex === index}" v-for="(item,index) in paramsList.tags" :key="index">{{item.title}}({{item.tagCount}})</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a @click="changeSort(null)" :class="{active:reqParams.sortField === null}" href="javascript:;">默认</a>
      <a @click="changeSort('praiseCount')" :class="{active:reqParams.sortField === 'praiseCount'}" href="javascript:;">最新</a>
      <a @click="changeSort('createTime')" :class="{active:reqParams.sortField === 'createTime'}" href="javascript:;">最热</a>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for='item in commentList' :key='item.id'>
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <!-- 字体图标控制评价星根据数量显示两种 -->
            <i class="iconfont icon-wjx01" v-for='star in item.score' :key='star'></i>
            <i class="iconfont icon-wjx02" v-for='star in 5 - item.score' :key='star'></i>
            <span class="attr">{{formatSpec(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 图片预览 -->
          <GoodsCommentImage v-if="item.pictures" :pictures="item.pictures"></GoodsCommentImage>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <XtxPagination :currentPage="1" :pagesize="reqParams.pageSize" :total="total" @change-page="changePage" ></XtxPagination>
  </div>
</template>

<script>
import { findCommentInfoByGoods, findCommentListByGoods } from '@/api/product'
import { inject, reactive, ref, watch } from 'vue'
import GoodsCommentImage from './goods-comment-image.vue'

export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },
  setup () {
    const detail = inject('detail')

    // 获取顶部筛选条件数据
    const paramsList = ref([])
    findCommentInfoByGoods(detail.value.id).then(res => {
      res.result.tags.unshift({
        type: 'img',
        title: '有图',
        tagCount: res.result.hasPictureCount
      })
      res.result.tags.unshift({
        type: 'all',
        title: '全部评价',
        tagCount: res.result.evaluateCount
      })
      paramsList.value = res.result
    })
    // 选中筛选条件的索引
    const currentIndex = ref(0)
    // 切换评论条件
    const changeCondition = (index) => {
      currentIndex.value = index
      // 获取当前选中的tag标签
      const tag = paramsList.value.tags[index]
      // 判断选中条件
      if (tag.type === 'img') {
        reqParams.hasPicture = true
      } else if (tag.type === 'all') {
        reqParams.tag = null
        reqParams.hasPicture = null
      } else {
        reqParams.tag = tag.title
      }
    }

    // 筛选条件准备
    const reqParams = reactive({
      // 当前页码
      page: 1,
      // 每页的条数
      pageSize: 10,
      // 是否有图片
      hasPicture: null,
      // 筛选条件
      tag: null,
      // 排序的字段
      sortField: null
    })

    // 评论列表数据
    const commentList = ref([])
    const total = ref(0)
    watch(reqParams, () => {
      findCommentListByGoods(detail.value.id, reqParams).then(res => {
        commentList.value = res.result.items
        total.value = res.result.counts
      })
    }, {
      immediate: true
    })

    // 切换排序
    const changeSort = (type) => {
      reqParams.sortField = type
      reqParams.page = 1
    }

    // 定义筛选方法
    const formatSpec = (specs) => {
      return specs.reduce((ret, item) => `${ret} ${item.name}:${item.nameValue}`, '')
    }
    const formatName = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    // 页码切换
    const changePage = (currentPage) => {
      reqParams.page = currentPage
    }

    return {
      paramsList,
      currentIndex,
      reqParams,
      changeCondition,
      commentList,
      changeSort,
      formatSpec,
      formatName,
      changePage,
      total
    }
  }
}
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
