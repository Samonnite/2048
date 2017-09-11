// 初始化棋盘格
function initialize(){
 for(var i=0;i<4;i++){
  for(var j=0;j<4;j++){
   // 设置棋盘格的位置
   var everyCell = $('#cell-'+ i +'-'+ j);
   everyCell.css({top:getPos(i),left:getPos(j)});
  }
 }
}

// 获取位置
function getPos(num){
 return 20 + num*120;
}