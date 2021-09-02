import Mock from "mockjs"
 const check=new Map([['admin','123456']])
Mock.mock("localhost:8080/","post",(res)=>{
    const result=JSON.parse(res.body)
    console.log(check.get(result.name))
    if(check.get(result.name)===result.password){
        return{
            code:200,
            success:true,
            message:'成功',
            token:'j21908vnq9n23p4n'
        }
    }else{
        return{
            code:100,
            success: false,
            message: '登陆失败'
        }
    }
})
const menuList=[
    {
        name:'首页',
        icon:'el-icon-s-platform',
        url:'/index',
    },
    {
        name:'生活常用',
        icon:'el-icon-umbrella',
        url:'/life',
        children:[
            {
                name:'快递查询',
                icon:'el-icon-truck',
                url:'/life/express'
            },
            {
                name:'天气预报',
                icon:'el-icon-sunrise-1',
                url:'/life/weather'
            },
            {
                name:'万年历',
                icon:'el-icon-date',
                url:'/life/calendar'
            },
            {
                name:'菜谱大全',
                icon:'el-icon-dish',
                url:'/life/cook'
            }
        ]
    },
    {
        name:'工具万能',
        icon:'el-icon-s-tools',
        url:'/tools',
        children: [
            {
                name:'智能问答',
                icon:'el-icon-s-promotion',
                url:'/tools/talk'
            },
            {
                name:'邮编查询',
                icon:'el-icon-takeaway-box',
                url:'/tools/code'
            },
            {
                name:'简体/繁体/火星文转换',
                icon:'el-icon-refresh',
                url:'/tools/change'
            },
        ]
    },
    {
        name:'交通出行',
        icon:'el-icon-position',
        url:'/go',
        children: [
            {
                name:'火车查询',
                icon:'el-icon-bicycle',
                url:'/go/train'
            },
            {
                name:'驾考题库',
                icon:'el-icon-document-copy',
                url:'/go/question'
            }
        ]
    },
]
Mock.mock('localhost:8080/menu',"post",()=>{
    return menuList
})

