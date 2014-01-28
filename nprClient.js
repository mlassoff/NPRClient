var xmlhttp;

window.onload = function()
{
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = processData;
xmlhttp.open("get", "http://api.npr.org/list?id=3218", false);
xmlhttp.send();
}

function processData()
{
if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
	var ids = new Array();
	var titles = new Array();
	var output ="<ul>";
	//Parse XML in to two parallel arrays
	var theXML = xmlhttp.responseXML.documentElement.getElementsByTagName('item');
	var numItems = theXML.length;
	for(var i=0; i< numItems; i++)
		{
			ids[i] = theXML[i].getAttribute('id');
			titles[i]= theXML[i].getElementsByTagName('title')[0].firstChild.textContent;
			output += buildOutputCell(ids[i], titles[i]);
		}
	output += "</ul>";
	document.getElementById('result').innerHTML = output;
}
}

function buildOutputCell(id, data)
{
cellHTML = "<li onclick='getNews(" + id + ")'>" + data + "</li>";
return cellHTML;
}

function getNews(id)
{
	
}