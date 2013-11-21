$(function(){
	//行业箭头的点击展开事件
	$("#industry_categories_block .arrow").click(function(){
		var inputVisable = '<div class="inputVisable"><input type="button" class="input_unfold_button btn_1" value="确定" onclick="confirmIndustryList(this)" /><input type="button" class="input_unfold_button btn_2" value="取消" onclick="closeUnfold(this)" /></div>';
		$("#industry_categories_block").append(inputVisable);
		$("#position_categories_block").css("z-index","9");   
		$("#city_search_block").css("z-index","9");
		$("#industry_categories_block").css("z-index","10");
	});
	
	//职位箭头的点击展开事件
	$("#position_categories_block .arrow").click(function(){
		var inputVisable = '<div class="inputVisable"><input type="button" class="input_unfold_button btn_1" value="确定" onclick="confirmPositionList(this)" /><input type="button" class="input_unfold_button btn_2" value="取消" onclick="closeUnfold(this)" /></div>';
		$("#position_categories_block").append(inputVisable);
		$("#industry_categories_block").css("z-index","9");   
		$("#city_search_block").css("z-index","9");
		$("#position_categories_block").css("z-index","10");
	});
	
	//地点箭头的点击展开事件
	$("#city_search_block .arrow").click(function(){
		var inputVisable = '<div class="inputVisable"><input type="button" class="input_unfold_button btn_1" value="确定" onclick="confirmCity(this)" /><input type="button" class="input_unfold_button btn_2" value="取消" onclick="closeUnfold(this)" /></div>';
		$("#city_search_block").append(inputVisable);
		$("#position_categories_block").css("z-index","9");   
		$("#industry_categories_block").css("z-index","9");
		$("#city_search_block").css("z-index","10");
	});
	
});


/*行业的脚本*/
var IndustryCategoryList = document.getElementsByName("IndustryCategoryListItem");
var IndustryCategoryListLength = IndustryCategoryList.length;
//行业点击确定事件
function confirmIndustryList(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);  
	$("#dialogMask").remove();
	$(".input_unfold_content").hide();	//以上三步和关闭的操作一样，以下循环是把选到的值给MembersSelected ul
	$("#industry_categories_selected").html("");
	for(var i=0;i<IndustryCategoryListLength;i++){
		if(IndustryCategoryList[i].checked){
			var IndustryCategoryTitle = IndustryCategoryList[i].parentNode.getElementsByTagName("label")[0].innerHTML;
			var IndustryCategoryLi = document.createElement("li");
				IndustryCategoryLi.id=IndustryCategoryList[i].id;
				IndustryCategoryLi.innerHTML = IndustryCategoryTitle + '<em class="close" onclick="closeIndustry(this)"></em>';
			$("#industry_categories_selected").append(IndustryCategoryLi);
		}
	}
}
//关闭带关闭的行业类别名称
function closeIndustry(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	for(var i=0;i<IndustryCategoryListLength;i++){
		if(IndustryCategoryList[i].id==obj.parentNode.id){
			IndustryCategoryList[i].checked = "";   //删掉本条数据后MemberList里的本条数据checkbox去掉
			IndustryCategoryList[i].parentNode.className="";
		}
	}
}
//点击行业类别名称后高亮显示
function industryCategoriesNameClick(obj){
	if(obj.checked){
		obj.parentNode.className="selected"
	}else{
		obj.parentNode.className = "";
	}
}



/*职位的脚本*/
var PositionList = document.getElementsByName("PositionListItem");
var PositionListLength = PositionList.length;
var PositionListLi_k = 0;
//点击二级栏目的名称显示三级菜单内容
function GetPositionType(obj,selectedId){
	var PositionTypeId = "#" + "PositionType_" + selectedId;
	var PositionTypeTitleId = "#" + "PositionTypeTitle_" + selectedId;
	$(PositionTypeId).parent().siblings("li").find("div").hide();
    $(PositionTypeTitleId).parent().siblings("li").find("h4").removeClass("current");
	$(PositionTypeId).parent().parent().parent().parent().siblings("tr").find("div").hide();
    $(PositionTypeTitleId).parent().parent().parent().parent().siblings("tr").find("h4").removeClass("current");
	$(PositionTypeId).toggle();
	$(PositionTypeTitleId).toggleClass("current");
	var parentUl=obj.parentNode.parentNode;
	var parentOLis=parentUl.getElementsByTagName("li");
	var parentOLisLength=parentOLis.length;
	for(var i=0;i<parentOLisLength;i++){
		if(i%3==2){
			var o=parentOLis[i].getElementsByTagName("div")[0];
			    o.className="clearfix third"
		}
	}
	var parentTable=obj.parentNode.parentNode.parentNode.parentNode.parentNode;
	var parentTrs=parentTable.getElementsByTagName("tr");
	var parentTrsLength=parentTrs.length;
	for(var j=0;j<parentTrsLength;j++){
		if(j>4){
			var o=parentTrs[j].getElementsByTagName("li");
			var oLength=o.length;
			for(var k=0;k<oLength;k++){
				o[k].className="up"
			}
		}
	}
}
//职位类别点击确定事件
function confirmPositionList(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);  
	$("#dialogMask").remove();
	$(".input_unfold_content").hide();	//以上三步和关闭的操作一样，以下循环是把选到的值给MembersSelected ul
	$("#position_categories_selected").html("");
	for(var i=0;i<PositionListLength;i++){
		if(PositionList[i].checked){
			var PositionListTitle = PositionList[i].parentNode.lastChild.innerHTML;
			var PositionListLi = document.createElement("li");
				PositionListLi.id=PositionList[i].id;
				PositionListLi.innerHTML = PositionListTitle + '<em class="close" onclick="closePosition(this)"></em>';
			$("#position_categories_selected").append(PositionListLi);
		}
	}
}
//关闭带关闭的团队成员Member姓名
function closePosition(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	for(var i=0;i<PositionListLength;i++){
		if(PositionList[i].id==obj.parentNode.id){
		    PositionList[i].checked = "";   //删掉本条数据后MemberList里的本条数据checkbox去掉
			PositionList[i].parentNode.className="";
		}
	}
}
//点击职位类别名称后高亮显示OK
function positionListNameClick(obj){
	if(obj.checked){
		obj.parentNode.className="selected";
		PositionListLi_k ++;
	}else{
		obj.parentNode.className = "";
		PositionListLi_k --;
	}
	for(var i=0;i<PositionListLength;i++){  //最多只能选择5个
		if(PositionListLi_k>4){  //大于5个的时候把非checked了的灰掉
			if(!PositionList[i].checked){
				PositionList[i].disabled=true;
			}
	    }else{//小于5个所有checkbox都放开
			PositionList[i].disabled=false;
		}
	}
}


/*城市的脚本*/
var CityList = document.getElementById("province-items").getElementsByTagName("li");
var CityListLength = CityList.length;
var MainCityList = document.getElementById("main_cities_box").getElementsByTagName("li");
var MainCityListLength = MainCityList.length;
function confirmCity(obj){
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	$("#dialogMask").remove();
	$(".input_unfold_content").hide();	
	for(var i=0;i<MainCityListLength;i++){
		if(MainCityList[i].className=="selected"){
			CityName = MainCityList[i].innerHTML;	
			$("#city_search_selected").val(CityName)
		}
	}
	for(var i=0;i<CityListLength;i++){
		if(CityList[i].className=="selected"){
			CityName = CityList[i].innerHTML;	
			$("#city_search_selected").val(CityName)
		}
	}
}

//点击城市名字的样式切换
function CityNameClick(obj){
	if(obj.className==""){
		for(var i=0;i<CityListLength;i++){
			CityList[i].className = "";
		}
		for(var i=0;i<MainCityListLength;i++){
			MainCityList[i].className = "";
		}
		obj.className = "selected";
	} else if(obj.className=="selected"){
		obj.className = "";
	}
}

//点击省份显示城市函数
function provinceCityShow(obj){
	var provinceId = "city_" + obj.id;
	//alert(provinceId)
	document.getElementById("province").style.display = "none";
	document.getElementById("province-items").style.display = "block";
	var provinceList = document.getElementById("province-items").getElementsByTagName("div");
	for(var i=0; i<provinceList.length; i++){
		provinceList[i].style.display = "none";
	}
	document.getElementById(provinceId).style.display = "block";
}
//从某个省份城市返回省份列表
function backToProvice(obj){
	obj.parentNode.parentNode.style.display = "none";
	document.getElementById("province-items").style.display = "none";
	document.getElementById("province").style.display = "block";
}