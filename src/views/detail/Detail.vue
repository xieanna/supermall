<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  />
    <scroll 
    class="content" 
    ref="scroll"  
    :probe-type="3"
     @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <!-- 加入doodsList 的时候回发生问题 -->
      <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
      <!-- <detail-goods-info :detail-info="detailInfo"></detail-goods-info> -->
      <detail-param-info :param-info="paramInfo" ref="paramsRef"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo" ></detail-comment-info>
      <goods-list :goods="recommend" ref="recommendRef"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/context/goods/GoodsList";

import {debounce } from "common/untils";
import {backTopMixin} from 'common/mixin'



import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/Detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
     // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then(res => {
     // console.log(res);
      this.recommend = res.data.list;
    });
  },
  mounted() {
   
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    contentScroll(position) {
     //console.log(position)
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      //1、获取购物车需要的内容
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品添加到购物车
      this.$store.dispatch('addCart',product)


      console.log('点击购物车')
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
}
</style>