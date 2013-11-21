//拒绝候选人弹出框
function RefusePopup(title){
	$("#LayerRefuse").dialog({
		bgiframe: true, 
		width: 600,
		title:title,
		modal:true
   });
}

//搁置候选人弹出框
function AsidePopup(title){
	$("#LayerAside").dialog({
		bgiframe: true, 
		width: 600,
		title:title,
		modal:true
   });
}

//专业测试弹出框
function ProfessionalTesting(title){
	$("#ProfessionalTesting").dialog({
		bgiframe: true, 
		width: 600,
		title:title,
		modal:true
   });
}

//导出测试结果
function export_test_results(){
	$("#export_test_results").dialog({
		bgiframe: true, 
		width: 400,
		modal:true
   });
}

//简历下载弹出框
function resumeDownload(){
	$("#resumeDownload_dailog").dialog({
        bgiframe: true,
        width: 400,
        height: 220
    });
}

function NewStageDialog(){
	$("#LayerNewStage").dialog({
        bgiframe: true,
        width: 400,
        height: 220
    });
}

function HiringCost(){
	$("#LayerHiringCost").dialog({
        bgiframe: true,
        width: 800,
        height: 360
    });
}