export default {
  addCart(context, payload) {
    // let product = null
    // for (let item of state.cartList){
    //    if (item.iid === payload.iid){
    //     product === item
    //    }
    // }
    let product = context.state.cartList.find((item) => {
      return item.iid === payload.iid
    })
    if (product) {
      context.commit('addCounter', product)
    } else {
      context.commit('addToCart',payload)
    }
  }
}