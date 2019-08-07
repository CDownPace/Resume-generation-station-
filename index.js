var express= require('express') // http框架
var app = express()
var bodyParser = require('body-parser') // 解析http请求体
var urlencodedParser = bodyParser.urlencoded({extended:false})
const cookieParser = require('cookie-parser')  
const MongoControl = require('./tools/databasecontrol').MongoControl
const information = new MongoControl('resume1', 'information')
const information2 = new MongoControl('resume2', 'information')
const information3 = new MongoControl('resume3', 'information')
// 初始化存储的集合
var path=require('path')
const ejs = require('ejs')
const moment = require('moment')

app.use(express.static('./static', {
    index: false
}))
app.get('/',function(req,res){
    res.sendFile(
    path.resolve('./static/html/threeResumeStyle.html')
        )
})

// 第一个简历
app.get('/godie',function(req,res){
    res.sendFile(
        path.resolve('./static/html/information.html')
            )
    
})
app.post('/getInformate' ,urlencodedParser,function(req,res){
             var { myname,quarters,birthday,graduateSchool,major,telephone,mailbox,individualEvaluation ,
                work1Time,work1Content, work2Time,work2Content,succe1Time,succe1Content,succe2Time,succe2Content }=req.body
    // information.drop()
    information.insert({
        myname : myname,
        quarters : quarters,
        birthday : birthday,
        graduateSchool : graduateSchool,
        major : major,
        telephone : telephone,
        mailbox : mailbox,
        individualEvaluation : individualEvaluation ,
        work1Time : work1Time,
        work1Content : work1Content,
        work2Time : work2Time,
        work2Content : work2Content,
        succe1Time : succe1Time,
        succe1Content : succe1Content,
        succe2Time : succe2Time,
        succe2Content : succe2Content
    },(err,result)=>{
        if(err){
            res.status(500).send('数据库插入那出错了')
            return
        }
        res.redirect(
            '/third'
        )
    })
})

app.get('/third',function(req,res){
    //   var _id = req.query._id
      information.find( {},function(err,result){
    //    console.log(result)
        if(result.length==0){
            res.status(404).send('数据为空')
            return
        }
         var dataa=result[0]
        ejs.renderFile('./static/ejs/firstTemplet.ejs',{data:dataa},function(error,html){
            // ejs.renderFile('./static/ejs/ceshi.ejs',{data:data},function(error,html){
            res.send(html)
        })
    })
})



// 第二个简历
app.get('/godie2',function(req,res){
    res.sendFile(
        path.resolve('./static/html/2information.html')
            )
    
})
app.post('/getInformate2' ,urlencodedParser,function(req,res){
             var {  myname,quarters,telephone,mailbox,graduateIime,graduateSchool, major, individualEvaluation ,
                work1Time, work1Content,work1Site,work2Time,work2Content,work2Site,succe1Time,succe1Content,succe2Time,
                succe2Content,skills1Content,skills2Content,skills3Content, }=req.body
    // information.drop()
    information2.insert({
        myname : myname,
        quarters : quarters,
        telephone : telephone,
        mailbox : mailbox,
        graduateIime:graduateIime,
        graduateSchool : graduateSchool,
        major : major,
        individualEvaluation : individualEvaluation ,
        work1Time : work1Time,
        work1Site:work1Site,
        work1Content : work1Content,
        
        work2Time : work2Time,
        work2Site:work2Site,
        work2Content : work2Content,
        
        succe1Time : succe1Time,
        succe1Content : succe1Content,
        succe2Time : succe2Time,
        succe2Content : succe2Content,
        skills1Content:skills1Content,
        skills2Content:skills2Content,
        skills3Content:skills3Content,

       
    },(err,result)=>{
        if(err){
            res.status(500).send('数据库插入那出错了')
            return
        }
        res.redirect(
            '/third2'
        )
    })
})

app.get('/third2',function(req,res){
    //   var _id = req.query._id
      information2.find( {},function(err,result){
    //    console.log(result)
        if(result.length==0){
            res.status(404).send('数据为空')
            return
        }
         var dataa=result[0]
        ejs.renderFile('./static/ejs/secondTemplet.ejs',{data:dataa},function(error,html){
            // ejs.renderFile('./static/ejs/ceshi.ejs',{data:data},function(error,html){
            res.send(html)
        })
    })
})


// 第三个简历
app.get('/godie3',function(req,res){
    res.sendFile(
        path.resolve('./static/html/3information.html')
            )
    
})
app.post('/getInformate3' ,urlencodedParser,function(req,res){
             var { myname,telephone,mailbox,quarters,educationalBackground,major,graduateSchool,expectedSalary,
                succe1Content,succe2Content,succe3Content,sex,individualEvaluation,
                graduateIime,graduateContent,work1Time,work1Content,work2Time,
                work2Content,hobby1,hobby2,hobby3 }=req.body
    // information.drop()
    information3.insert({
        myname : myname,
        telephone:telephone,
        mailbox:mailbox,
        quarters:quarters,
        educationalBackground:educationalBackground,
        major:major,
        graduateSchool:graduateSchool,
        expectedSalary:expectedSalary,
        succe1Content:succe1Content,
        succe2Content:succe2Content,
        succe3Content:succe3Content,
        sex:sex,
        individualEvaluation:individualEvaluation,
        graduateIime:graduateIime,
        graduateContent:graduateContent,
        work1Time:work1Time,
        work1Content:work1Content,
        work2Time:work2Time,
        work2Content:work2Content,
        hobby1:hobby1,
        hobby2:hobby2,
        hobby3:hobby3

    },(err,result)=>{
        if(err){
            res.status(500).send('数据库插入那出错了')
            return
        }
        res.redirect(
            '/third3'
        )
    })
})

app.get('/third3',function(req,res){
    //   var _id = req.query._id
      information3.find( {},function(err,result){
    //    console.log(result)
        if(result.length==0){
            res.status(404).send('数据为空')
            return
        }
         var dataa=result[0]
        ejs.renderFile('./static/ejs/thirdTemplet.ejs',{data:dataa},function(error,html){
            // ejs.renderFile('./static/ejs/ceshi.ejs',{data:data},function(error,html){
            res.send(html)
        })
    })
})

app.listen(3000)