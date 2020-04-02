import BackTop from "components/context/backtop/BackTop";


export const backTopMixin = {
  components: {
  BackTop
  },
  data() {
    return { 
      isShowBackTop: false, 
    }
  },
  methods: {
    backClick() {
      // scrollTo(x坐标，y坐标，返回的时间)
      this.$refs.scroll.scrollTo(0, 0, 1000);
    }
  }
}