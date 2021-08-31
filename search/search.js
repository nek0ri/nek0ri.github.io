function loadDoc() {
    var input=document.getElementById("myId");
    var xhttp = new XMLHttpRequest();
    var txtjson, prcjson;
    document.getElementById("result").innerHTML = "请稍后...";
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        txtjson = this.responseText;
        prcjson = JSON.parse(txtjson);
        //document.getElementById("result").innerHTML = prcjson.servers[0].prefix;
        document.getElementById("result").innerHTML = 
        "查询成功！<br><br>" +
        '<img src="' + prcjson.avatar + '" height="100px" width="100px"/>' + '<br><h2>' +
        prcjson.userName + '</h2><br>' +
        '<h3>战绩</h3><br><table class="table table-striped table-bordered table-hover">' +
        '<tr>' +
        "<th>等级</th><td>" + prcjson.rank + '</td>' +
        "<th>技巧值</th><td>" + prcjson.skill + '</td>' +
        '</tr><tr>' +
        "<th>SPM</th><td>" + prcjson.scorePerMinute + '</td>' +
        "<th>KPM</th><td>" + prcjson.killsPerMinute + '</td>' +
        '</tr><tr>' +
        "<th>最佳兵种</th><td>" + prcjson.bestClass + '</td>' +
        "<th>准确率</th><td>" + prcjson.accuracy + '</td>' +
        '</tr><tr>' +
        "<th>爆头率</th><td>" + prcjson.headshots + '</td>' +
        "<th>K/D比</th><td>" + prcjson.killDeath + '</td>' +
        '</tr><tr>' +
        "<th>总击杀数</th><td>" + prcjson.kills + '</td>' +
        "<th>最远爆头</th><td>" + prcjson.longestHeadShot + '</td>' +
        '</tr><tr>' +
        "<th>游戏时长</th><td>" + prcjson.timePlayed + '</td>' +
        "<th>胜率</th><td>" + prcjson.winPercent + '</td>' +
        '</tr><tr>' +
        "<th>夺取狗牌</th><td>" + prcjson.dogtagsTaken + '</td>' +
        "<th></th><td>" + '</td>' +
        '</tr>' +
        + '</table>'
        ;
        } else if (this.readyState == 4 && this.status == 404){document.getElementById("result").innerHTML = "查无此人<br>";}
    };
    xhttp.open("GET", "https://api.gametools.network/bf1/stats/?name="+input.value+"&lang=zh-tw", true);
    xhttp.send();
}