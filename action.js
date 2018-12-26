//

	function addToStorage(){
		var uy = document.getElementById('kick_him').value;

		if ( !in_array(uy,(lst||' ').split('=#####=')) && uy!="" ){

		var t =(lst=="" ? '':lst+'=#####=')+uy;
			lst = t;
			chrome.extension.sendRequest({localstorage: "set",settedValue:lst},function(response){document.location.reload()});

		} else {

			alert('Уже в списке!');
			
			}
	}

var lst = "";

var z = "";

//
	function show_kicked(zz){
		
			for(var t=0,x=zz.length;t<x;t++){
				if(zz[t]!="") 
				$("#kicked").append("<tr id='tr"+t+"'><td>"+zz[t]+"</td><td><button class=\"btn btn-mini btn-warning delitem pull-right\" id=\"b"+t+"\"><i class=\"icon-trash icon-white\"></i></button></td></tr>");
			}
		$("button.delitem").click(function(){
			zz.splice($(this).attr("id").replace(/^b/gim,''),1);
			chrome.extension.sendRequest({localstorage: 'set',settedValue:zz.join('=#####=')},function(response){document.location.reload()});
		});
		
	}

//Вывод опций
	function showOptions (option, description) {
		var opt = localStorage[option];
		if (!opt || opt == "false") {
			$("#options").append('<tr><td><label class="checkbox"><input class="options" type="checkbox" name='+option+'>'+description+"</label></td></tr>");
		}
		else {
			$("#options").append('<tr><td><label class="checkbox"><input class="options" type="checkbox" name='+option+' checked="checked">'+description+"</label></td></tr>");
		}
	};

//Обработка чекбоксов
	function setOption(){
		var checkBoxName = $(this).attr("name");
		if ($(this).is(":checked")) { 
			localStorage[checkBoxName]=true;
		}
		else {
			localStorage[checkBoxName]=false;
		}
	};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', addToStorage);
});
	
	
	
	chrome.extension.sendRequest({localstorage: "kicked"}, function(response){ 
		lst = response.kicked;
		z = response.kicked.split('=#####=');
		show_kicked(z);
	});