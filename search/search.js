function loadDoc() {
    var input=document.getElementById("myId");
    var xhttp = new XMLHttpRequest();
    var txtjson, prcjson;

    document.getElementById("platoon").innerHTML = " "; //刷新
    document.getElementById("session").innerHTML = " "; //刷新
    document.getElementById("result").innerHTML = "查询中，速度取决于地区";

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        txtjson = this.responseText;
        prcjson = JSON.parse(txtjson);

        //=========变量生成区=========

        //战队表格生成
        if(prcjson.platoons.length != 0){
            var platoonsTable = '<table class="table table-hover">';
            var i;
            for(i = 1; i <= prcjson.platoons.length; i++){
                platoonsTable += '<tr>';
                platoonsTable += '<td>' + '<img src="' + prcjson.platoons[i-1].emblem + '" height="80px" width="80px"/></td><td>[' + prcjson.platoons[i-1].tag + ']<br>' + prcjson.platoons[i-1].name + '</td>';
                platoonsTable += '</tr>';
            }
            platoonsTable += '</table>';
        }

        //历史游戏表格生成
        if(prcjson.sessions.length != 0){
            var sessionsTable = '<table class="table table-hover">';
            var j;
            for(j = 1; j <= prcjson.sessions.length; j++){
                sessionsTable += '<tr><td><b>' + prcjson.sessions[j-1].serverName + '</b><br>'
                + prcjson.sessions[j-1].timeStamp +
                '<br>游戏时长：' + Math.round(prcjson.sessions[j-1].stats.timePlayed/60) + '分钟'+
                '&nbsp;&nbsp;KD：' + (prcjson.sessions[j-1].stats.kills / prcjson.sessions[j-1].stats.deaths).toFixed(2) +
                '&nbsp;&nbsp;KPM：' + (prcjson.sessions[j-1].stats.kills / (prcjson.sessions[j-1].stats.timePlayed/60)).toFixed(2)
                + '</td></tr>'
                ;
            }
            sessionsTable += '</table>';
        }

        //=========innerHTML输出=========

        //战绩
        document.getElementById("result").innerHTML = 
        '<img src="' + prcjson.avatar + '" height="100px" width="100px"/>' + '<br><h2>' +
        prcjson.userName + '</h2><br><h4>战绩</h4><table class="table table-striped table-bordered table-hover"><tr><th>等级</th><td>' + prcjson.rank + '</td>' +
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
        "<th>夺取狗牌</th><td>" + prcjson.dogtagsTaken + '</td><th></th><td></td></tr></table><br>'
        ;

        //战队
        if(prcjson.platoons.length != 0){

        document.getElementById("platoon").innerHTML = '<h4>战队</h4><div class="bbblock"><br>' +
        '<img src="' + prcjson.activePlatoon.emblem + '" height="100px" width="100px"/><br><h5>代表：[' +
        prcjson.activePlatoon.tag + ']</h5>名称：' +
        prcjson.activePlatoon.name + '<br><br>已加入' +prcjson.platoons.length + '个战队<br>' + platoonsTable + '</div><br>';

        } else { document.getElementById("platoon").innerHTML = '<h4>战队</h4><div class="bbblock"><br>该玩家没有加入任何战队<br>&nbsp;</div><br>'; }

        //历史游戏
        if(prcjson.sessions.length != 0){
            document.getElementById("session").innerHTML = '<h4>最近记录</h4><div class="bbblock"><br>' + sessionsTable + '<br>&nbsp;</div>';
        } else { document.getElementById("session").innerHTML = '<h4>最近记录</h4><div class="bbblock"><br>查询不到玩家最近的游戏记录<br>&nbsp;</div><br>'; }
    

        // 记得加个回到顶部
        } else if (this.readyState == 4 && this.status == 404){document.getElementById("result").innerHTML = "查无此人<br>";}//404处理
        else if(this.status == 408 || this.status == 504) {document.getElementById("result").innerHTML = "EA服务器超时，请稍后再试<br>";}//超时处理
    };
    xhttp.open("GET", "https://api.gametools.network/bf1/all/?name="+input.value+"&lang=zh-tw", true);
    xhttp.send();
}

