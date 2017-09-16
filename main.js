/**
 * Created by samonnite on 2017/9/12.
 */

//-------------------------------------------------------------------------------
var board=new Array();  //每个格子的数字
var score=0;   //分数
var has_conflicted=new Array(); //解决连续消除的标记
var startx=0;  //移动端触摸屏幕开始点的x坐标
var starty=0;  //移动端触摸屏幕开始点的y坐标
var endx=0;    //移动端触摸屏幕结束点的x坐标
var endy=0;    //移动端触摸屏幕结束点的y坐标
var success_string='Success';
var gameover_string='GameOver';

//HTML文档加载完成后，初始化棋局
$(document).ready(function(){
    //做自适应处理
    prepare_for_mobile();
    new_game();
});

//开始新游戏
function new_game(){

    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    generate_one_number();
    generate_one_number();
}


//初始化
function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gird_cell=$('#gird_cell_'+i+'_'+j);
            gird_cell.css('top',get_pos_top(i,j));
            gird_cell.css('left',get_pos_left(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i]=new Array();
        has_conflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0
            has_conflicted[i][j]=false;
        }
    }
    update_board_view();
    score=0;
    update_score(score);
}


//更新棋局
function update_board_view(){
    $('.number_cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('#gird_container').append('<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>');
            var number_cell=$('#number_cell_'+i+''+j);
            if(board[i][j]){
                number_cell.css('width','0px');
                number_cell.css('height','0px');
                number_cell.css('top',get_pos_top(i,j)+cell_side_length/2);
                number_cell.css('left',get_pos_left(i,j)+cell_side_length/2);
            }else{
                number_cell.css('width',cell_side_length);
                number_cell.css('height',cell_side_length);
                number_cell.css('top',get_pos_top(i,j));
                number_cell.css('left',get_pos_left(i,j));
                number_cell.css('background-color',get_number_background_color(board[i][j]));
                number_cell.css('color',get_number_color(board[i][j]));
                number_cell.text(board[i][j]);
            }
            has_conflicted[i][j]=false;
        }
    }
    $('.number_cell').css('line-height',cell_side_length+'px');
    $('.number_cell').css('font-size',0.6*cell_side_length+'px');
}

//随机在一个格子生成数字
function generate_one_number(){
    if(nospace(board)){
        return false;
    }
    //随机一个位置
var randx=parseInt(Math.floor(Math.random()*4));
var randy=parseInt(Math.floor(Math.random()*4));
var time=0;
while(time<50){
    if(board[randx][randy]==0){
        break;
    }
    randx=parseInt(Math.floor(Math.random()*4));
    randy=parseInt(Math.floor(Math.random()*4));
    time++;
}
if(time==50){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j]){
            randx=i;
            randy=j;
        }
      }  
    }
}

//随机一个数字
var rand_number=Math.random()<0.5?2:4;
//在随机位置随机数字
board[randx][randy]=rand_number;
show_number_width_animation(randx,randy,rand_number);
return true;
}

//自适应处理
function prepare_for_mobile(){
    if(document_width>500){
        gird_container_width=500;
        cell_side_length=100;
        cell_space=20;
    }
    $('#gird_container').css('width',gird_container_width-2*cell_space);
    $('#gird_container').css('height',gird_container_width-2*cell_space);
    $('#gird_container').css('padding',cell_space);
    $('#gird_container').css('border-radius',0.02*gird_container_width);
    $('#gird_cell').css('width',cell_side_length);
    $('#gird_cell').css('height',cell_side_length);
    $('#gird_cell').css('border-radius',0.02*gird_container_width);
     
}

//监听键盘的上下左右移动
$(document).keydown(function(event){ //按键式改变
    if ($('#score').text()==success_string){
        new_game();
        return;
    }
    switch(event.keyCode){
        case 37: //left
        event.preventDefault();
        if(move_left()){
            setTimeout('generate_one_number()',210);
            setTimeout('is_gameover()',300);
            break;
        }
    }
});