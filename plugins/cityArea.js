/**
 * 地区联动 start
 * */
function getProvinceBuy(){
	$("body .dqld_div").remove();
	var province=eval(proStr);
	var newStr=new Array();
	newStr.push("<div class=\"dqld_div\"><span class=\"back\"><i onclick=\"$(this).parents('.dqld_div').remove();\"></i></span><ul>");
	for(var i=0,psize=province.length;i<psize;i++){
		province[i].NAME;
		newStr.push("<li onclick=\"getCityBuy("+i+")\">"+province[i].NAME+"</li>");
	}
	newStr.push("</ul></div>");
	$("body").append(newStr.join(""));

}

function getCityBuy(val){
	var province=eval(proStr);
	var city=eval(province[val].ITEMS);
	var newStr=new Array();
	newStr.push("<div class=\"dqld_div\"><span class=\"back\"><i onclick=\"$(this).parents('.dqld_div').remove();\"></i></span><ul>");
	newStr.push("<li onclick=\"getProvinceBuy()\" style=\"background-color:#B7B7B7; padding-left: 0.2rem;\">"+province[val].NAME+"</li>");
	for(var j=0,csize=city.length;j<csize;j++){
		newStr.push("<li onclick=\"getAreaBuy("+j+","+val+")\"  >"+city[j].NAME+"</li>");
		$("body .dqld_div").remove();
	}
	newStr.push("</ul></div>");
	$("body").append(newStr.join(""));
}

function getAreaBuy(val,val1){
	var province=eval(proStr);
	var city=eval(province[val1].ITEMS);
	var area=eval(city[val].ITEMS);
	var newStr=new Array();

	newStr.push("<div class=\"dqld_div\"><span class=\"back\"><i onclick=\"$(this).parents('.dqld_div').remove();\"></i></span><ul>");
	newStr.push("<li onclick=\"getProvinceBuy()\" style=\"background-color:#B7B7B7; padding-left: 0.2rem; \">"+province[val1].NAME+"</li>");
	newStr.push("<li onclick=\"getCityBuy("+val1+")\" style=\"background-color:#DEDEDE;padding-left:0.3rem;\">"+city[val].NAME+"</li>");
	for(var t=0,asize=area.length;t<asize;t++){
		area[t].NAME;
		newStr.push("<li style=\"padding-left:0.4rem;\" onclick=\"getallArea("+val1+","+val+","+t+")\">"+area[t].NAME+"</li>");
	}
	newStr.push("</ul></div>");

	asize=0;    //added or modified on 2016.11.15 (只显示省市，不显示地区)

	if(asize==0){
		var allarea=province[val1].NAME+city[val].NAME;
		$("#shengshi").attr({"SS":province[val1].NAME,"SQ":city[val].NAME,"XS":""});
		$("#shengshi").val(allarea);
		$("body .dqld_div").remove();
	}
	else{
		$("body .dqld_div").remove();
		$("body").append(newStr.join(""));
	}

}

function getallArea(val,val1,val2){
	var province=eval(proStr);
	var city=eval(province[val].ITEMS);
	var area=eval(city[val1].ITEMS);
	var allarea=province[val].NAME+city[val1].NAME+area[val2].NAME;
	$("#shengshi").attr({"SS":province[val].NAME,"SQ":city[val1].NAME,"XS":area[val2].NAME});
	$("#shengshi").val(allarea);
	$("body .dqld_div").remove();
}


/*地区联动 end*/
