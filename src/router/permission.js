import router from "@/router/index";
import {getToken} from "@/utils/token";
router.beforeEach((to,from,next)=>{
    if(getToken()){
        if(to.path==='/login'){
            next(false)
        }else{
            next()
        }
    }else{
        if(to.path==='/login'){
            next()
        }else{
            next('/login')
        }
    }
})