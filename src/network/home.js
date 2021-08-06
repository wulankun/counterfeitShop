import {request} from './request'


export function getHomeMultidata(){
    return  request({
        url:'/home/multidata'
    })
}


export function getHomeGoods(type,page){

    return request({
        url:'/home/data',
        params:{
            type:type,        //也可以用es6加强写法 直接 type ,data
            page:page
        }
    })
}