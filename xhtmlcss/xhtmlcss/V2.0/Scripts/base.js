//两列等高布局兼容IE7
if(navigator.appName == "Microsoft Internet Explorer"){
   if(navigator.appVersion.match(/7./i)=='7.'){
      var r = document.getElementById("container");
      var l = document.getElementById("sidebar");
	  if(r&l){
		  if (r.scrollHeight < l.scrollHeight){
			  r.style.height = l.scrollHeight + "px";
		  }else {
			l.style.height = r.scrollHeight + "px";
		  }
	  }
   }
 }

//输入框默认文字的切换
function delInfo(obj){
	if(obj.value == obj.getAttribute("info")){
		obj.value = "";
	}
}
function addInfo(obj){
	if(obj.value == ""){
		obj.value = obj.getAttribute("info");
	}
}

//职位候选人添加步骤里展开更多
function step_content_switch(id){
	var odiv = document.getElementById("add_"+id);
	if(odiv.style.display=="block"){
		odiv.style.display="none";
	}else{
		odiv.style.display="block";
	}
}


//左侧更多菜单
function position_nav_less(obj){
	obj.parentNode.style.display = "none";
	document.getElementById("position_nav_more_1").style.display = "none";
	document.getElementById("position_nav_more_2").style.display = "none";
	document.getElementById("position_nav_more_3").style.display = "none";
	document.getElementById("position_nav_more").style.display = "";
}

function position_nav_more(obj){
	obj.parentNode.style.display = "none";
	document.getElementById("position_nav_more_1").style.display = "";
	document.getElementById("position_nav_more_2").style.display = "";
	document.getElementById("position_nav_more_3").style.display = "";
	document.getElementById("position_nav_less").style.display = "";
}

//选项卡
function tab(obj,id){
	var m=$("#tab_"+obj+" li");
	m.removeClass("current");
	m.eq(id).addClass("current");
	var c=$("#tab_"+obj+" .tab_content");
	c.removeClass("current");
	c.eq(id).addClass("current");
}