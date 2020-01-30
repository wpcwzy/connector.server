const serverURL="http://localhost:8888"


function showSuccess()
{
    $("#success").attr("class","alert alert-success alert-dismissabe fade in")
    window.setTimeout(function(){
        $("#success").attr("class","alert alert-success alert-dismissabe hide")
    },2000);
}

function showFailed()
{
    $("#failed").attr("class","alert alert-danger alert-dismissabe fade in")
    window.setTimeout(function(){
        $("#failed").attr("class","alert alert-danger alert-dismissabe hide")
    },2000);
}

var getJSON = function(url, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function()
    {
        var status = xhr.status;
        if (status === 200) {
            callback(null, JSON.parse(xhr.responseText));
        }
        else
        {
            callback(status, JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function helloworld()
{
    console.log("Hello,World!")
    getJSON(serverURL,function(err,data)
    {
        if(err!=null)
            throw "Network Error"
        else
        {
            console.log(data.newMessage)
        }
    })
    showSuccess()
}

function getSnapshot()
{
    console.log("getSnapshot")
    showSuccess()
}

function reboot()
{
    console.log("reboot")
    showSuccess()
}