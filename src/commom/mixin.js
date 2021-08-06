import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'

export const itemListennerMixin={
    data(){
        return{
            itemImgListenner:null,
            newrefresh:null
        }
    },
    mounted(){
        this.newrefresh=debounce(this.$refs.scroll.refresh,500)  
this.itemImglistnner=()=>{this.newrefresh()}
    this.$bus.$on('itemImageLoad',this.itemImglistnner)
    
  
    }
}


export const  backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false,
        }
    },
    methods:{
        backClick(){
            // this.$refs.scroll.scroll.scrollTo(0, 0,1000)
            this.$refs.scroll.scrollTo(0,0,1000)
            
          },
    }
}