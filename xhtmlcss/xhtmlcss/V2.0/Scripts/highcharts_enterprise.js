var chart;
$(function() {
	//系统职位
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart_position',
			type: 'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['进行的','完成的','过期的','暂停的','删除的'],
			tickWidth: 0,   //去除X轴下面凸出的线条
			lineWidth:0    //去除X轴最下面的一条线
		},
		yAxis: {
			min: 0,
			//gridLineWidth:1,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		plotOptions: {
			column: {
				pointWidth: 22,    
				borderWidth:0,
				shadow: false,  //去除柱形的阴影 
				borderRadius:3  //柱形的圆角
			}
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'职位</b><br/>'+Highcharts.numberFormat(this.y, 0) +'个';
			}
		},
		series: [{
			data: [{'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':50},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':68},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':13},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':24},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35}]
		}]
	});
	
	
	//职位招聘进度
	chart = new Highcharts.Chart({
	chart: {
			renderTo: 'chart_progress',
			type: 'bar',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['7','6','5','4','3','2','1'],
			tickWidth: 0,
			lineWidth: 0
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		plotOptions: {
			series: {
				pointWidth: 10,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			},
			bar:{
				cursor: 'pointer',
				events: {
					  click: function(e) {
						  location.href = e.point.url
					  }
				}
			}
		},
		tooltip: {
			formatter: function() {
				return '职位ID：'+ this.point.id +'<br/>'+'结束：'+
					this.y +'天<br/>' + '招聘数量：' + '<span style="color:#ff0000">' +
					this.point.recruitment +'</span>' + '/' +this.point.total;
			}
		},
		series: [{
			data: [
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 100, 0)']]},id: '1000077',y:25,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},id: '1000076',y:16,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 100, 0)']]},id: '1000075',y:11,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},id: '1000074',y:20,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 100, 0)']]},id: '1000073',y:9,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},id: '1000072',y:15,recruitment:1,total:3,url:'position_info_1.html'},
				{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 100, 0)']]},id: '1000071',y:9,recruitment:1,total:3,url:'position_info_1.html'}
			]
		}]
	});	
	
	
	//职位发布情况
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart_job',
			type: 'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['智联','前程无忧','中华英才','官方网站','富柯瑞猎头'],
			tickWidth: 0,   //去除X轴下面凸出的线条
			lineWidth:0    //去除X轴最下面的一条线
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'</b>: '+ Highcharts.numberFormat(this.y, 0, ',') +' 个)';
			}
		},
		plotOptions: {
			column: {
				pointWidth: 22,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			}
		},
		series: [{
		   data: [{'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':33},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':48},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':13},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':24},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':15}]
		}]
	});
	
	
	//求职者信息
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart_hunter',
			type:'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['面试中','拒绝的','新简历','已上岗','搁置的','已发Offer'],
			tickWidth: 0,   //去除X轴下面凸出的线条
			lineWidth:0    //去除X轴最下面的一条线
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'</b>: '+ Highcharts.numberFormat(this.y, 0, ',') +' 个)';
			}
		},
		plotOptions: {
			column: {
				pointWidth: 18,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			}
		},
		series: [{
		   data: [{'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':33},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':48},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':13},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':24},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':24},
				   {'color':{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':15}]
		}]
	});
	
	
	
	//招聘需求
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart_demand',
			type: 'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['新需求','批准的','搁置的','拒绝的'],
			tickWidth: 0,  
			lineWidth:0   
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'</b>: '+ Highcharts.numberFormat(this.y, 0, ',') +' 个)';
			}
		},
		plotOptions: {
			column: {
				pointWidth: 25,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			}
		},
		series: [{
			data: [{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':10}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':25}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}]
		}]
	});
	
	
	//上岗信息
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'chart_upland',
			type: 'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['市场部','销售部','人事部','开发部','猎头部','行政部'],
			tickWidth: 0,  
			lineWidth:0   
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'</b>: '+ Highcharts.numberFormat(this.y, 0, ',') +' 个)';
			}
		},
		plotOptions: {
			column: {
				pointWidth: 22,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			}
		},
		series: [{
			data: [{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':10}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':25}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}]
		}]
	});
	
	
	//候选人学历分布
	chart = new Highcharts.Chart({
	chart: {
			renderTo: 'resume_degree',
			type: 'column',
			backgroundColor:'#f6f6f6'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['初中','高中','中专','大专','本科','硕士','博士','其他'],
			tickWidth: 0,  
			lineWidth:0   
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {enabled:false},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.x +'</b>: '+ Highcharts.numberFormat(this.y, 0, ',') +' 个)';
			}
		},
		plotOptions: {
			column: {
				pointWidth: 15,    
				borderWidth: 0,
				shadow: false,
				borderRadius:3
			}
		},
		series: [{
			data: [{color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':10}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':25}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}, 
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(255, 128, 0)'],[1,'rgb(255, 75, 0)']]},'y':35},
				   {color:{linearGradient: [0, 0, 0, 250],stops: [[0,'rgb(66, 189, 231)'],[1,'rgb(25, 150, 212)']]},'y':18}]
		}]
	});	
		
});