<template>
 <div class="Cart">
   <nav-bar>
     <div slot='center'>购物车({{length}})</div>
   </nav-bar>
   <cart-list></cart-list>
   <cart-total></cart-total>
 </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
import CartList from 'views/cart/childComps/CartList'
import CartTotal from "./childComps/CartTotal.vue";


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartTotal
    },
    computed: {
    //...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
    }
  }
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.Cart {
  height: 100vh;
}
</style>
