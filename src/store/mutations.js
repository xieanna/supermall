export default {
   //mutations 的目的是为了修改state
    //里面的每一个方法完成的事情尽可能单一
    addCounter(state,payload){
      payload.count++
     },
     addToCart (state,payload){
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
     }
}