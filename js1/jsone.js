
window.onload = function () {
     
    var url = "province.json"
    var request = new XMLHttpRequest();   //运用request对象访问本地数据
   
    request.open("get", url);   
    request.send(null);               //向服务器发送请求
    
    request.onload = function () {

    var json = JSON.parse(request.responseText);         //把独读到的数据转换为js对象

         for(var i=0 ; i<json.provinces.length ;i++){    //循环增加下拉列表option节点

            var sel = document.getElementById("sel");
            var op = document.createElement("option");

            op.innerHTML = json.provinces[i].item_name;
            op.style.height = "20px";

            sel.appendChild(op);
            }
        }
 }

 
function citys(pro) {

    var url = "province.json"
    var url1 = "city.json"

    var code="";

    var request = new XMLHttpRequest();
    var request1 = new XMLHttpRequest();

    request.open("get", url);
    request.send(null);
    request1.open("get", url1);
    request1.send(null);
    
  
    var parent = document.getElementById("sel1");
    var parent1 = document.getElementById("sel2");

    parent.options.length = 1;                             //onchange事件清空城市，区县option标签
    parent1.options.length = 1;


    request.onload = function () {
    var json = JSON.parse(request.responseText);

         for (var i=0 ; i<json.provinces.length ; i++){
             if (json.provinces[i].item_name == pro)
                {    
                    code = json.provinces[i].item_code;   //得到上一级（省份）的code
                    break;
                }
            }
        }
   
    

    request1.onload = function () {

            var json1 = JSON.parse(request1.responseText);
            
            for (var i=0 ;i<json1.city.length ;i++ ){

                if ((Number(code.slice(0,2))) == (Number(json1.city[i].item_code.slice(0,2))) ){
                //从城市的json数据中找到和省份code前两位相同的城市code
                    var sel = document.getElementById("sel1");
                    var op = document.createElement("option");
        
                    op.innerHTML = json1.city[i].item_name;
                    op.style.height = "20px";
                    op.id = Number(code.slice(0,2));
                    sel.appendChild(op);
                }
            }
   
    }

  
}

function countys(pro) {

    var url = "city.json"
    var url1 = "cuonty.json"

    var code="";

    var request = new XMLHttpRequest();
    var request1 = new XMLHttpRequest();

    request.open("get", url);
    request.send(null);
    request1.open("get", url1);
    request1.send(null);
    
  
    var parent = document.getElementById("sel2");
   
    parent.options.length = 1;   //清除下一级的option

    request.onload = function () {
    var json = JSON.parse(request.responseText);

         for (var i=0 ; i<json.city.length ; i++){
             if (json.city[i].item_name == pro)
                {    
                    code = json.city[i].item_code;  //得到所在城市的code
                    break;
                }
            }
        }
   
    
    request1.onload = function () {
            var json1 = JSON.parse(request1.responseText);
            
            for (var i=0 ;i<json1.county.length ;i++ ){

                if ((Number(code.slice(0,4))) == (Number(json1.county[i].item_code.slice(0,4))) ){
                     //从区县的json数据中找到和城市code前四位相同的区县code
                    var sel = document.getElementById("sel2");
                    var  op = document.createElement("option");
        
                    op.innerHTML = json1.county[i].item_name;
                    op.style.height = "20px";
                    op.id = Number(code.slice(0,4));
                    sel.appendChild(op);
                }
            }
   
    }

}




 
    
