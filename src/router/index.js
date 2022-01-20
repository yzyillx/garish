import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name:'Register',
    component:()=>import('@/views/Register')
  },
  {
    path: '/',
    name:'Layer',
    redirect:'/index',
    component:()=>import('@/views/homepage/Layer'),
    children:[
      {
        path:'/index',
        name:'Index',
        component:()=>import('@/views/homepage/Index')
      },
      {
        path:'/go',
        name:'Go',
        component:()=>import('@/views/go/Go'),
        children:[
          {
            path:'question',
            name:'Question',
            component:()=>import('@/views/go/Question')
          },
          {
            path:'train',
            name:'Train',
            component:()=>import('@/views/go/Train')
          }
        ]
      },
      {
        path: '/life',
        name:'Life',
        component:()=>import('@/views/life/Life'),
        children: [
          {
            path: 'calendar',
            name:'Calendar',
            component:()=>import('@/views/life/Calendar')
          },
          {
            path: 'cook',
            name:'Cook',
            component:()=>import('@/views/life/Cook')
          },
          {
            path: 'express',
            name:'Express',
            component:()=>import('@/views/life/Express')
          },
          {
            path: 'weather',
            name:'Weather',
            component:()=>import('@/views/life/Weather')
          }
        ]
      },
      {
        path: '/tools',
        name:'Tools',
        component:()=>import('@/views/tools/Tools'),
        children: [
          {
            path: 'change',
            name:'Change',
            component:()=>import('@/views/tools/Change')
          },
          {
            path: 'code',
            name:'Code',
            component:()=>import('@/views/tools/Code')
          },
          {
            path: 'talk',
            name:'Talk',
            component:()=>import('@/views/tools/Talk')
          }
        ]
      },
      {
        path:'music',
        name:'Music',
        component:()=>import('@/views/music/Music')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
