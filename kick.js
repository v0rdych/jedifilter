/*************************************************
2011 Sergey Lubenin web_lab@mail.ru
2017 Dmitry Vorobiev v0rd@yandex.ru
*************************************************/
var current_pretendent = "";
var vhosts = [
[
	/((http\:\/\/)?(www\.)?youtube\.com\/watch\?v\=)([a-zA-Z0-9\-_]+)(\&.*)?$/i , 
	"<iframe title=\"YouTube video player\" width=\"425\" height=\"349\" src=\"http://www.youtube.com/embed/$4\" frameborder=\"0\" allowfullscreen></iframe>"
],
[
	/((http\:\/\/)?(www\.)?rutube\.ru\/tracks\/\d+\.html\?v\=)([a-zA-Z0-9\-]+)(\&.*)?$/i , 
	"<OBJECT width=\"470\" height=\"353\"><PARAM name=\"movie\" value=\"http://video.rutube.ru/$4\"></PARAM><PARAM name=\"wmode\" value=\"window\"></PARAM><PARAM name=\"allowFullScreen\" value=\"true\"></PARAM><EMBED src=\"http://video.rutube.ru/$4\" type=\"application/x-shockwave-flash\" wmode=\"window\" width=\"470\" height=\"353\" allowFullScreen=\"true\" ></EMBED></OBJECT>"
]				
			];

$(document).ready(function(){
var messagesRegex = /user\/(\d+)\//gi;
var profileId = $('#navprofile').find("a").attr('href')||"";
if (profileId == "")
{}
else
{
$.get(
    profileId,
    function(data) {
		var ratingRegex = /\[ \+ (\d+) \| (\d+) \- \]/gi;
		var ratingVals = ratingRegex.exec(data);
		
		var ratingNumber = ratingVals[1] - ratingVals[2];
    chrome.extension.sendMessage({
        type: "ratingChanged",
        data: {
            ratingValue: ratingNumber
        }	
	});
	$('#brd-visit').append('<p id="test"><span>&nbsp;Ваш рейтинг: <strong>'+ratingNumber+'</strong></span></p>');
}
)
}
	var body = {
		"font-family":"Verdana, Helvetica, sans-serif",
	}
	$("body").css(body);
	function insertText(){
		var tag = $(this).attr("title");
		var messageForm = document.getElementsByName("req_message")[0];
		var text = messageForm.value;
		messageForm.focus();
		if (document.getSelection) {
			var start = messageForm.selectionStart;
			var end = messageForm.selectionEnd;
			if (start-end != 0) {
				var selectedText = text.substring(start, end);
				text = text.replace(selectedText, "["+tag+"]"+selectedText+"[/"+tag+"]");
				messageForm.value = text;
			}
			else {
				text = text.substring(0,start)+"["+tag+"][/"+tag+"]"+text.substring(end,text.length);
				messageForm.value = text;
			}
		}
	};
});
	chrome.extension.sendRequest({localstorage: "kicked"}, function(response) {
		var st = response.kicked.split("=#####=");
	$("body").append("<div id='popupp' style='position:absolute;padding:9px;-webkit-border-radius:10px;font-size:12px;background:#EEE;-webkit-box-shadow:0 0 3px 4px #CCC;display:none;z-index:5000;'><a id='to_s' style='color:red' href='javascript:;' >В список!</a><br /><br /><a style='color:green' href='javascript:;' id='from_s'>Реабилитировать</a></div>");
	$("#to_s").click(function() {
	var uy = current_pretendent;
	var lst = st;
	var lsst = st.join('=#####=');
	if ( !in_array(uy,lst) && uy!="" ){

		var t =(lsst=="" ? '':lsst+'=#####=')+uy;
			lsst = t;
			chrome.extension.sendRequest({localstorage: "set",settedValue:lsst},function(response){document.location.reload()});

		} else {

			alert('Уже в списке!');

		}

	});



	function a_index(arr,fin){
		for(var i=0,l=arr.length;i<l;i++){
			if (arr[i]==fin) return i;
		}
	}	
	$("#from_s").click(function(){
	var uy = current_pretendent;
	var lst = st;
	if (in_array(uy,lst) && uy!=""){
		var aj = a_index(lst,uy);
		if(aj>=0) delete lst[aj];
			chrome.extension.sendRequest({localstorage: "set",settedValue:lst.join('=#####=')},function(response){document.location.reload()});
		} else {
			alert('Его и так там нет!');
			}
			});
		$("div.posthead").bind("contextmenu",function(event){
		var target = (event||window.event);
		var x = target.clientX+document.documentElement.scrollLeft+5;
		var y = target.clientY+document.documentElement.scrollTop+5;
		current_pretendent = $(this).find("span.post-byline").find("a").text()||"";
		$("#popupp").css({'left':x+'px','top':y+'px'}).show();
		$("div.posthead").click(function(){

				var ob = $("#popupp");

				if (ob.is(':visible')) 
					ob.hide("fast"); 

			});		
		return false});	
			$("li.username").each(function(){
				var text = $(this).text()||"";
				if (in_array(text,st)	&& text!="") {
					$(this)
					.parents("div.post")
					.hide();
				} 
			});
			$("div.entry-content").each(function(){
					$(this).find("a").each(function(){
						
						var div_parent= $(this).parents("div.entry-content");
						
						if (/http.*\:\/\/coub\.com\/view\//.test($(this).text())) {
							
							
							var c_url = $(this).text().replace(/http.*\:\/\/coub\.com\/view\//gim,'') || "";
							$(this).replaceWith('<iframe src="https://coub.com/embed/' + c_url + '?autoplay=true" allowfullscreen="true" frameborder="0" width="640" height="288"></iframe>');
							
						}
					});
				});
			
		$("div.quotebox").each(function(){
					$(this).find("a").each(function(){
						
						var div_parent= $(this).parents("div.quotebox");
						
						if (/http.*\:\/\/coub\.com\/view\//.test($(this).text())) {
							
							
							var c_url = $(this).text().replace(/http.*\:\/\/coub\.com\/view\//gim,'') || "";
							$(this).replaceWith('<iframe src="https://coub.com/embed/' + c_url + '?autoplay=true" allowfullscreen="true" frameborder="0" width="640" height="288"></iframe>');
							
						}
					});
				});
			$("div.quotebox").each(function(){
				var text = $(this).find("cite").text().replace(/\s+пишет\:/gim,'')||"";
				if(in_array(text,st) && text!="") $(this).css({'opacity':'0.1'});

			});
			$("span.item-starter").each(function(){
				var text = $(this).find("cite").text()||"";
				if(in_array(text,st) && text!="") $(this).parents("div.main-item").css({'opacity':'0.1'});

			});
			$("td.td3").each(function(){
				var text = $(this).find("a").text()||"";
				if(in_array(text,st) && text!="") {
					$(this)
					.parents("tr")
					.hide();}

			});

	});
