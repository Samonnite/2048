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
    prepare_for_moblie();
    newgame();
});

//开始新游戏
function newgame(){

    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
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
            $('#gird_container').append('<div class="number_cell" id="number_cell_'+i+''+j+'"></div>');
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