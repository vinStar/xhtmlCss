$(function(){

	//点击帐户名展开
	$("#account_info_nav_name").click(function(){
		$(this).toggleClass("current");
		$(this).next().toggle();
	});
	
	
	//全选反选
	$("#AllCheck").click(function(){
		if(this.checked){$("[name=ListItem]:checkbox").attr("checked",true);}
		else{$("[name=ListItem]:checkbox").attr("checked",false);}
	});
	
	//申请人模块快捷方式的显示
	$("#applicant_operation_nav").hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	});
	
	
	//表格斑马线
	$("#table_list tr:even").addClass("odd"); 
	$(".zebra tr.tr_list:odd").addClass("odd"); 
	//列表鼠标放上背景变色 
	$(".zebra tr.tr_list").hover(function(){     
		$(this).addClass("hover");
		$(this).find(".unfold").show();
	},function(){
		$(this).removeClass("hover");
		$(this).find(".unfold").hide();
	});
	//点击展开列表详情
	$(".unfold").click(function(){
		$(this).parent().parent().next().toggle();
		$(this).parent().parent("tr").toggleClass("tr_current");
	});
	
	
	//列表与详情的切换
	$("#view_as_list").click(function(){
		if(!$(this).hasClass("on")){   //有on则表当前是列表，点击当前还是显示列表，没有on表示当前是详情，要回到列表
			$(this).addClass("on");
			$("#view_as_detail").removeClass("on");
		    $(".tr_detail").hide();
		    $(".tr_list").removeClass("tr_current");
		}
	});
	$("#view_as_detail").click(function(){
		if(!$(this).hasClass("on")){   //有on则表当前是详情，点击当前还是显示详情
			$(this).addClass("on");
			$("#view_as_list").removeClass("on");
		    $(".tr_detail").show();
		    $(".tr_list").addClass("tr_current");
		}
	});
	
	
	//关键字搜索的展开
	$(".keywords_input_box span").click(function(){
		$(this).next().toggle();
	});
	$(document).bind("click", function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("keywords_input_box"))
			$(".keywords_input_box ul").hide();
	});
	$(".keywords_input_box li").click(function(){
		var keywordsValue = $(this).text();
		var keywordsId = $(this).attr("cid");
		$(this).parent().hide();
		$(this).parent().prev().html(keywordsValue);
		$(this).parent().prev().attr("cid",keywordsId)
	});
	
	//职位基本信息菜单展开收起
	$("#position_nav_more").click(function(){
		$(this).hide();
		$(this).siblings(".undis").show();
		var oless = '<li id="position_nav_less"><a href="javascript:void(0)" onclick="position_nav_less(this)">收起 »</a></li>';
		$("#position_info_nav").append(oless);
	});
	$("#position_nav_less").click(function(){
		$(this).hide();
		$(this).siblings(".dis").hide();
		var omore = '<li id="position_nav_more"><a href="javascript:void(0)" onclick="position_nav_more(this)">更多 »</a></li>';
		$("#position_nav_more_1").before(omore);
	});
	
	//行业、职位类别、地点等的input框展开
	$(".input_unfold_block .arrow").click(function(){
		var oh = document.body.scrollHeight;
		var dialogMask = '<div id="dialogMask" style="width:100%;height:'+ oh +'px"></div>';
		$("body").append(dialogMask);
		$(this).next(".input_unfold_content").show();
		//var inputVisable = '<div id="inputVisable"><em onclick="closeDialogMask(this)">关闭</em></div>';
		//$(".input_unfold_content").after(inputVisable);   //给对应的input框加上操作
	});
	
	
	//候选人步骤里添加项目
	$(".add_items a").click(function(){
		$(this).parent().next().toggle();
	});
	
	//添加分公司
	$("#add_branch_btn").click(function(){
		$(this).next().toggle();
	});
	
	
	//题库类别的展开
	$(".categoey_item em").click(function(){
		$(this).parent().next("ul").toggle();
		$(this).toggleClass("up");
	});
	
	//
    var _move = false; //移动标记
    var _x, _y; //鼠标离控件左上角的相对位置
    $("#dialog_title").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#dialog").css("left"));
        _y = e.pageY - parseInt($("#dialog").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            $("#dialog").css({ top: y, left: x }); //控件新位置
        }
    }).mouseup(function () {
        _move = false;
    });

    
	//申请人弹出层里通用关闭事件
	$(".button_dialog_cancel").click(function(){
		$(".applicant_dialog").dialog('close');
	});
	
	//提示语关闭
	$(".remind_close").click(function(){
		$(this).parent().remove();
	});
	
	
	//
	$(".account_rights_tit em").toggle(function(){
		$(this).addClass("arrow");
		$(this).text('展开');
		$(this).parent().next("ul").hide();
	},function(){
		$(this).removeClass("arrow");
		$(this).text('收起');
		$(this).parent().next("ul").show();
	})
	
});

//input_unfold展开后的取消按钮事件
function closeUnfold(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);  //把inputVisable给移除
	$("#dialogMask").remove(); //遮罩层移除
	$(".input_unfold_content").hide();    //展开的内容隐藏  移除还是隐藏？
}



$(function(){
	$.fn.extend({
		SimpleTree:function(options){
			var option = $.extend({
				click:function(a){ }
			},options);
			option.tree=this;	
			option._init=function(){			
				this.tree.find("ul ul").hide();	
				this.tree.find("ul ul").prev("li").removeClass("open");	
				this.tree.find("ul ul[show='true']").show();	
				this.tree.find("ul ul[show='true']").prev("li").addClass("open");
			}
			
			//this.find("a").click(function(){$(this).parents("li").click(); return false; });
			this.find("li:not('.p')").click(function(){
				//var a=$(this).find("a")[0];
				//if(typeof(a)!="undefined")
				//	option.click(a);
				alert(1);	
				if($(this).next("ul").attr("show")=="true"){
					$(this).next("ul").attr("show","false");					
				}else{
					$(this).next("ul").attr("show","true");
				}
				option._init();
			});
			
/*			this.find("li").hover(
				function(){
					$(this).addClass("hover");
				},
				function(){
					$(this).removeClass("hover");
				}
			);*/
			
			this.find("ul").prev("li").addClass("folder");
			this.find("li").find("a").attr("hasChild",false);
			this.find("ul").prev("li").find("a").attr("hasChild",true);
			option._init();
		}
	});
});



//Success、Warning、Error弹出框
function openSuccessMsg(oTitle, msg, width, height, url) {
    $("body").append('<div id="SuccessDialog" class="msg-dialog" style="display:none"></div>');
    $("#SuccessDialog").dialog({
        bgiframe: true,
        width: width,
        height: height,
        buttons: {
            确定: function () {
                if (url != '') {
                    window.location.href = url;
                }
                $(this).dialog('close');
            }
        }
    });
    var oMsg = '<p class="success">' + msg + '</p>'
    $("#SuccessDialog").html(oMsg);
    $(".ui-dialog-title").html(oTitle);
}

function openWarningMsg(oTitle, msg, width, height, url) {
    $("body").append('<div id="WarningDialog" class="msg-dialog" style="display:none"></div>')
    //$("#WarningDialog").html("");
    $("#WarningDialog").dialog({
        bgiframe: true,
        width: width,
        height: height,
        buttons: {
            确定: function () {
                if (url != '') {
                    window.location.href = url;
                }
                $(this).dialog('close');
            },
			取消: function () {
                    $(this).dialog('close');
                }
        }
    });
    var oMsg = '<p class="warning">' + msg + '</p>'
    $("#WarningDialog").html(oMsg);
    $(".ui-dialog-title").html(oTitle);
}

function openErrorMsg(oTitle, msg, width, height, url) {
    $("body").append('<div id="ErrorDialog" class="msg-dialog" style="display:none"></div>');
    $("#ErrorDialog").dialog({
        bgiframe: true,
        width: width,
        height: height,
        buttons: {
            确定: function () {
                if (url != '') {
                    window.location.href = url;
                }
                $(this).dialog('close');
            }
        }
    });
    var oMsg = '<p class="error">' + msg + '</p>'
    $("#ErrorDialog").html(oMsg);
    $(".ui-dialog-title").html(oTitle);
}

function openConfirmMsg(oTitle, msg, width, height, url) {
    $("body").append('<div id="ConfirmDialog" class="msg-dialog" style="display:none"></div>');
    $("#ConfirmDialog").dialog({
        bgiframe: true,
        width: width,
        height: height,
        buttons: {
            确定: function () {
                if (url != '') {
                    window.location.href = url;
                }
                $(this).dialog('close');
            },
			取消: function () {
                if (url != '') {
                    window.location.href = url;
                }
                $(this).dialog('close');
            }
        }
    });
    var oMsg = '<p class="confirm">' + msg + '</p>'
    $("#ConfirmDialog").html(oMsg);
    $(".ui-dialog-title").html(oTitle);
}


//引用新页面的弹出层
function dialog(){
	var temp_box=new String;
		temp_box+="<div id=\"dialogBg\" style=\"height:"+$(document).height()+"px;\"></div>";
		temp_box+="<div id=\"dialog\">";
		temp_box+="<div id=\"dialog_title\"><h4></h4><small onclick=\"new dialog().close()\">关闭</small></div>";
		temp_box+="<div id=\"dialog_content\"></div>";
		temp_box+="</div>";
	this.init=function(_title,_w,_h){
		if(! $("#dialog").length)$("body").append(temp_box);
		$("#dialogBg").show();
		$("#dialog").show().css({width:_w,left:$(document).width()/2-parseInt(_w)/2,top:$(document).scrollTop()+document.documentElement.clientHeight/2-parseInt(_h)/2-50});
		if(_title.length)$("#dialog_title h4").html(_title);
		$("#dialog_content").css({height:_h});
		}
		this.close=function(){
			$("#dialogBg").hide();
			$("#dialog").hide();
		}
		this.open=function(_url){
			$("#dialog_content").html("<iframe src=\""+_url+"\" width=\"100%\" height=\"100%\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
		}
		this.alert=function(_url){
			$.get(_url,function(data){
			$("#dialog_content").html(data);
		});
	}
}
function openWindow(_url,_title,_w,_h){
	var obj=new dialog();
	obj.init(_title,_w,_h);
	obj.open(_url);
}
function colseWindow(_url,_title,_w,_h){
	var obj=new dialog();
	obj.init(_title,_w,_h);
	obj.close();
}
function openAlert(_url,_title,_w,_h){
	var obj=new dialog();
	obj.init(_title,_w,_h);
	obj.alert(_url);
} 

