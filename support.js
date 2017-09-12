document_width=window.screen.availWidth;   //屏幕宽度
gird_container_width=0.92*document_width;   //棋盘宽度
cell_side_length=0.18*document_width;      //格子的大小
cell_space=0.04*document_width;          //各自之间的间隔


//获得相应格子距离棋盘顶部的距离
function get_pos_top(i,j){
    return cell_space+i*(cell_space+cell_side_length);
}

//获得相应格子距离棋盘左边的距离
function get_pos_left(i,j){
    return cell_space +j*(cell_space+cell_side_length);
}
