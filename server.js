const http=require("http")
const url=require("url")
const fs=require("fs")
const formidable=require("formidable")
const path=require("path")
var Rollbar = require("rollbar");
// var rollbar = new Rollbar({
//   accessToken: '64ec64629ffb4471808edcd58c6dceb9',
//   captureUncaught: true,
//   captureUnhandledRejections: true
// });
const log4js = require('log4js');
log4js.configure({
  appenders: { server: { type: 'file', filename: 'server.log' },terminal:{type:"console"}},
  categories: { default: { appenders: ['server','terminal'], level: 'debug' } }
});

const logger = log4js.getLogger('server');

logger.info("Start Init")
var status={newMessage:1,message:"sayHello",code:2}

const statusTable=["None","sayHello"]
logger.info("Init Finished")

function listener(request,response)
{
    response.writeHead(200,"Success",{"Content-Type":"application/json","Access-Control-Allow-Origin":"null"})

    var route=url.parse(request.url).pathname
    logger.debug("Route=",route)

    if(route=="/done")
    {
        status.newMessage=0
        status.code=0
        status.message=statusTable[status.code]
    }
    
    if(route=="/new")
    {
        var command=url.parse(request.url,true).query.mode
        logger.debug("New requested Mode:",command)
        status.newMessage=1
        status.code=command
        status.message=statusTable[command]
        response.end(JSON.stringify({status:1,message:"Success"}))
        logger.debug(JSON.stringify(status))
    }
    if(route=="/uploadSnapshot")
    {
        var form=formidable.IncomingForm()
        form.uploadDir="./snapshot"
        form.parse(request,function(err,fileds,files)
        {
            logger.debug(files)
            if(err)
            {
                throw err
            }
            logger.debug("Path=",__dirname)
            var path=__dirname+"/snapshot"
            fs.readdir(path,function(err,files)
            {
                if(err)
                {
                    throw err
                }
                var count=0
                var index=0
                files.forEach(function(file)
                {
                    if(new RegExp("upload").test(file))
                    {
                        index=count
                    }
                    count++
                })
                logger.info(index)
                fs.rename(__dirname+"/snapshot/"+files[index],__dirname+"/snapshot/doge.jpeg",function(err){
                    if(err)
                    {
                        throw err
                    }
                })
            })
            
        })
        status.newMessage=0
        status.code=0
        status.message=statusTable[status.code]
    }

    response.end(JSON.stringify(status))
}

logger.info("Start listening")
http.createServer(listener).listen(8888)
logger.info("Listening started")