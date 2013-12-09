$("#ratedPowerConsumption").bind("blur",measuredDRated);
$("#measuredPowerConsumption").bind("blur",measuredDRated);
$("#ratedPowerConsumption").bind("blur",PowerConsumptionLimit);
$("#climateType").bind("blur",CC);
$("#freezerType").bind("blur",M);
$("#freezerType").bind("blur",N);
$("#volume15Check").bind("blur",CH);
$("#volume100Check").bind("blur",Sr);
$(".chamberType").bind("blur",chamberTemperature);
$(".chamberTemperature").bind("blur",chamberRatio);
$(".chamberMeasuredVolume").bind("blur",chamberAdjustedVolume);
$(".chamberRFSystem").bind("blur",chamberAdjustedVolume);
$(".climateType").bind("blur",chamberAdjustedVolume);
$("#ratedVolume").bind("blur",ratedVolume);


$("#ratedPowerConsumption").change(measuredDRated);
$("#measuredPowerConsumption").change(measuredDRated);
$("#ratedPowerConsumption").change(PowerConsumptionLimit);
$("#ratedVolume").change(ratedVolume);
$("#climateType").change(CC);
$("#freezerType").change(M);
$("#freezerType").change(N);
$("#volume15Check").change(CH);
$("#volume100Check").change(Sr);
$(".chamberType").change(chamberTemperature);
$(".chamberTemperature").change(chamberRatio);
$(".chamberMeasuredVolume").change(chamberAdjustedVolume);
$(".chamberRFSystem").change(chamberAdjustedVolume);
$(".climateType").change(chamberAdjustedVolume);

//额定值实测值摘要
//实测值除以额定值
function measuredDRated(){
	var r = parseFloat($("#ratedPowerConsumption").val());
	var m = parseFloat($("#measuredPowerConsumption").val());
	var out = $("#measuredDRated");
	

	$("#abs_measured").html( m > 0 ? "实测：" + m + " kW·h/24h" : "");
	
	if(r > 0 && m > 0){
		out.removeClass("rangeOut");
		var d = (m/r*100).toFixed(1);
		out.val( d + " %" );
		if( d>115 ) out.addClass("rangeOut");
		return d;
		}
	else return;
}

//额定容积
function ratedVolume(){
	var v = parseFloat($("#ratedVolume").val());
	$("#vol").html( v > 0 ? "额定： " + v + " L" : "");
}

//限值
function PowerConsumptionLimit(){
	var r = parseFloat($("#ratedPowerConsumption").val());
	var out = $("#PowerConsumptionLimit");
	
	if(r > 0){
		var d = (r*1.15).toFixed(2);
		out.val( d );
		return d;
		}
	else return;
}

//气候类型修正系数
//气候类型摘要
function CC(){
	var d = {N:1.0,SN:1.0,ST:1.1,T:1.2}
	var t = $("#climateType").val();
	var out = $("#CC");
	
	if(t.length > 0){

		var p = d[t];
		if(p) out.val( "CC = " + p );
		else out.val("");
		//$("#clitype").html(t);

		return p;
		}
	else return;
}

//冷藏冷冻箱系数M
//气候类型修正参数
function M(){
	var dM = [	0.221,	0.611,	0.428,	0.624,	0.697,	0.530,	0.567];
	var dN = [	233,	181,	233,	233,	272,	190,	205];
	var dF = [	"无星级的冷藏箱",	"带1星级室的冷藏箱",	"带2星级室的冷藏箱",	"带3星级室的冷藏箱",	"冷藏冷冻箱",	"冷冻食品储藏箱"	,"食品冷冻箱"];
	var f = $("#freezerType").val();
	var out = $("#M");
	
	if(f.length > 0){
		var m = dM[f];
		out.val( "M = " + m );
		$("#abs_m").html(dF[f]);
		return m;
		}
	else return;
}

//冷藏冷冻箱系数N
function N(){
	var dM = [	0.221,	0.611,	0.428,	0.624,	0.697,	0.530,	0.567];
	var dN = [	233,	181,	233,	233,	272,	190,	205];
	
	var f = $("#freezerType").val();
	var out = $("#N");
	
	if(f.length > 0){
		var n = dN[f];
		out.val( "N = " + n );
		
		return n;
		}
	else return;
}

//变温室修正系数
function CH(){
	var dCH = {"false":0,	"true":50};
	
	var f = !!$("#volume15Check").attr("checked");
	var out = $("#CH");
	
	if(true){
		var ch = dCH[f];
		out.val( "CH = " + ch );
		$("#abs_ch").html("CH=" + ch);
		return ch;
		}
	else return;
}

//穿透式自动制冰修正系数
function Sr(){
	var dSr = {"false":1.00,	"true":1.10};
	
	var f = !!$("#volume100Check").attr("checked");
	var out = $("#Sr");
	
	if(true){
		var sr = (dSr[f]).toFixed(2);
		out.val( "Sr = " + sr );
		$("#abs_sr").html("Sr=" + sr);
		return sr;
		}
	else return;
}

//特性温度
function chamberTemperature(){
	var dchamberTemperature = ["",5,10,0,-6,-12,-18,-18,0];
	
	$(".chamberSetting").each(function(index){
		var ct = $(this).find("select.chamberType").val();
		var chamberTemperature = $(this).find(".chamberTemperature");
		chamberTemperature.attr("disabled","disabled");
		if(ct == 8) 	chamberTemperature.removeAttr("disabled");
		chamberTemperature.val(dchamberTemperature[ct]);
		
		//顺便更新下间室摘要
		var chamberName = ["无","冷藏室","冷却室","冰温室","1星级室","2星级室","3星级室","冷冻室","其他间室"];
		$(".chamberAbstract").eq(index).text(chamberName[ct]);
		
	})
	chamberRatio();
}

//加权系数
function chamberRatio(){

	$(".chamberSetting").each(function(){
		var temperature = $(this).find(".chamberTemperature").val();
		if( temperature === "") return;
		
		temperature = parseFloat(temperature);
		var ratio = (( 25 - temperature)/20).toFixed(2);
		
		var chamberRatio = $(this).find(".chamberRatio");
		chamberRatio.val(ratio);
		
		return ratio;
	})
}

//调整容积
function chamberAdjustedVolume(){
	var chamberAdjustedVolume = $(".chamberAdjustedVolume");
	$(".chamberSetting").each(function(index){
		var measuredV = parseFloat($(this).find(".chamberMeasuredVolume").val());
		var Fc = parseFloat($(this).find("select.chamberRFSystem").val());
		var ratio = parseFloat($(this).find(".chamberRatio").val());
		var lcc = CC();
		var v = (measuredV*Fc*ratio*lcc).toFixed(2);
		//console.log(measuredV,Fc,ratio,lcc,v);
		$(this).find(".chamberAdjustedVolume").val(v>0?v:"");
		$(".chamberAbstract2").eq(index).text(measuredV >0 ? "实测容积： " + measuredV + " L":"");	
		
		return v;
		});
}

//计算能效检查
function go(){
	measuredDRated();
	PowerConsumptionLimit();
	CC();
	M();
	N();
	CH();
	Sr();
	chamberTemperature();
	chamberRatio();
	chamberAdjustedVolume();
	
	
	var v_m_all = 0; // 总有效容积
	var v_a_all = 0; // 总调整容积
	
	//if( !($("#ratedPowerConsumption").val() > 0)) return "错误: 请检查额定值";
	if( !($("#measuredPowerConsumption").val() > 0)) return "错误: 请检查实测值";
	//if( !($("#ratedVolume").val() > 0)) return "错误: 请检查额定容积";
	
	$(".chamberSetting").each(function(index){
		if($(this).find(".chamberType").val() == "0") return;
		
		//计算总有效容积
		var v = $(this).find(".chamberMeasuredVolume").val();
		if(! v > 0) return "错误:请检查间室"+index+"数据!";
		v_m_all+= parseFloat(v);
		
		//计算总调整容积
		var v2 = $(this).find(".chamberAdjustedVolume").val();
		if(! (v2 > 0)) return "错误:请检查间室"+index+"数据!";
		v_a_all+= parseFloat(v2);
	});
	
	$("#Vc").val(v_m_all.toFixed(2));
	$("#Vadj").val(v_a_all.toFixed(2));
	
	//总有效容积97%
	var ratedVolume = parseFloat($("#ratedVolume").val());
	//if(!(ratedVolume > 0)) return "错误:请检查额定容积";
	var VcDVadj = (v_m_all / ratedVolume*100).toFixed(3);
	$("#VPercent").val( ratedVolume > 0 ? VcDVadj + "%" : "");
	if(VcDVadj < 97) $("#VPercent").addClass("rangeOut");
	else $("#VPercent").removeClass("rangeOut");
	
	//电冰箱基准耗电量
	var Ebase = (( M() * v_a_all + N() + CH()) * Sr() / 365).toFixed(3);
	$("#Ebase").val(Ebase);
	
	//电冰箱耗电量限定值
	var L = ($("#freezerType").val() == "4" ? 0.8 : 0.9);
	var Emax = (Ebase * L).toFixed(3);
	$("#Emax").val(Emax);
	
	//能效指数
	var ETA = parseFloat($("#measuredPowerConsumption").val()) / Ebase * 100;
	$("#ETA").val( ETA.toFixed(2) + "%");
	
	//级别
	var level;
	if($("#freezerType").val() == "4"){
		if(ETA < 40) level = 1;
		else if (ETA < 50) level = 2;
		else if (ETA < 60) level = 3;
		else if (ETA < 70) level = 4;
		else if (ETA < 80) level = 5;
		else level = 6;
	}
	else{
		if(ETA < 50) level = 1;
		else if (ETA < 60) level = 2;
		else if (ETA < 70) level = 3;
		else if (ETA < 80) level = 4;
		else if (ETA < 90) level = 5;
		else level = 6;	
	}
	$("#levelno").text(level == 6 ? "超5" : level);
	$("#level").removeClass().addClass("level_"+level);
}
	!function(){
		CC();M();N();CH();Sr();
		$("#go").click(function(){
			var r = go();
			if(typeof r == "string"){
				$("#errorMsg").text(r);
				$("#errorinfo").popup("open");
			}
			else {$("#generated").hide().slideDown("fast");
			$("#copy").show();
			$("#go_text").text("重新计算");}
		});
	}()

$("#copy").click(function(){
	$("#copy_area").html(
	'额定值(KW·h/24h):		' + $("#ratedPowerConsumption").val() + '\n' +
	'实测值(KW·h/24h):		' + $("#measuredPowerConsumption").val() + '\n' +
	'实测值/额定值:			' + $("#measuredDRated").val() + '\n' +
	'限值:					' + $("#PowerConsumptionLimit").val() + '\n' +
	'额定容积(L):				' + $("#ratedVolume").val() + '\n' +
	'电冰箱气候类型:			' + $("#clitype").text() + '\n' +
	'气候类型修正系数:		' + $("#CC").val() + '\n' +
	'冷藏箱/冷冻箱类型:		' + $("#abs_m").text() + '\n' +
	'参数M/(kW·h/L):			' + $("#M").val() + '\n' +
	'参数N/(kW·h/L):			' + $("#N").val() + '\n' +
	'变温室修正系数(kW·h):	' + $("#CH").val() + '\n' +
	'穿透式自动制冰修正系数:	' + $("#Sr").val() + '\n\n' +
	'电冰箱总有效容积:		' + $("#Vc").val() + '\n' +
	'电冰箱总调整容积:		' + $("#Vadj").val() + '\n' +
	'电冰箱总有效容积应≥额定容积的97%:	' + $("#VPercent").val() + '\n' +
	'电冰箱基准耗电量:		' + $("#Ebase").val() + '\n' +
	'电冰箱耗电量限定值:		' + $("#Emax").val() + '\n' +
	'能效指数η:				' + $("#ETA").val() + '\n' +
	'等级:					' + $("#level").text() + '\n' );
	
});



