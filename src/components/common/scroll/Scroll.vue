<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0      
    },
    pullUpLoad: {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: []
    }
  },
  mounted() {
    //1.创建betterscroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3 ){
        this.scroll.on('scroll', (position) =>{
     // console.log(position)
     this.$emit('scroll',position)
    })
    }
  
    //3.监听上拉事件
    if (this.pullUpLoad){
         this.scroll.on('pullingUp',() => {
      //console.log('上拉加载更多')
      this.$emit('pullingUp')   
    })
    }
  },
  methods: {
    //主要是为了点击回到顶部
    scrollTo(x, y, time=300){
        this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUP() {
      //主要是为了可以多下下拉加载
      this.scroll && this.scroll.finishPullUp()
    },
    //解决页面下拉时的卡顿问题
    refresh() {
      //console.log('doudong')
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>