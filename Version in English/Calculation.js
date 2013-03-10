chamberType = ["NaN","Refrigerator compartment","Cooling chamber","Ice greenhouse",
		"1 Star Room","2 Star Room","3 Star Room","The freezer compartment","Other compartments"]
function ChambersControl($scope){
	$scope.chambers = [
		{count:1,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:2,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:3,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:4,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:5,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:6,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:7,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0},
		{count:8,type:0,chamberTemperature:0,chamberRatio:0,chamberRFSystem:1.4,chamberMeasuredVolume:0,chamberAdjustedVolume:0}	];
		
	
		//$("html").refresh();
}

function ChamberTypeControl($scope){
	$scope.chamberType = [
		{value:0,text:"NaN"},
		{value:1,text:"Refrigerator compartment"},
		{value:2,text:"Cooling chamber"},
		{value:3,text:"Ice greenhouse"},
		{value:4,text:"1 Star Room"},
		{value:5,text:"2 Star Room"},
		{value:6,text:"3 Star Room"},
		{value:7,text:"The freezer compartment"},
		{value:8,text:"Other compartments"}];
		
		
		}