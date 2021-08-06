import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
    addCart(context,payload){
       return new Promise((resolve,reject)=>{
            // let oldProduct=null
        // for(let item of state.cartList){
        //     if(item.iid===payload.iid){
        //         oldProduct=item
        //     }
        // }

        let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)

        if(oldProduct){
            // oldProduct.count11+=1
            context.commit(ADD_COUNTER,oldProduct)
            resolve('当前数量+1')
        }else{
            payload.count=1
            // state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)
            resolve('添加了新的商品')
            reject('错误了')
        }
          
       })
        
      }
}