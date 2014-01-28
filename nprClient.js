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
	var info = new Array();
	var output ="<ul>";
	//Parse XML in to two parallel arrays
	var theXML = xmlhttp.responseXML.documentElement.getElementsByTagName('item');
	var numItems = theXML.length;
	for(var i=0; i< numItems; i++)
		{
			ids[i] = theXML[i].getAttribute('id');
			titles[i]= theXML[i].getElementsByTagName('title')[0].firstChild.textContent;
			info[i]= theXML[i].getElementsByTagName('additionalInfo')[0].firstChild.textContent;
			output += buildOutputCell(ids[i], titles[i], info[i]);
		}
	output += "</ul>";
	document.getElementById('result').innerHTML = output;
}
}

function buildOutputCell(id, data, info)
{
    cellHTML = "<li onclick='getNews(" + id + ")'>"
    cellHTML += "<h3>" + data + "</h3>";
    cellHTML += "<p>" + info + "</p>"; 
    cellHTML += "</li>";
    return cellHTML;
}

function getNews(id)
{
    var url = "http://api.npr.org/query?id=" + id + "&output=RSS&apiKey=MDEzMDc4Mjg4MDEzOTA4NjIzNTZkYzEwYw001";
    console.log(url);
    xmlhttp.onreadystatechange = processNewStory;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    
}

function processNewStory()
{
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var output = "";
        var storyXML = xmlhttp.responseXML.documentElement;
        console.log(storyXML);
        output += "<p><em>" + storyXML.getElementsByTagName('copyright')[0].firstChild.nodeValue + "</em></p>";
        var stories =  storyXML.getElementsByTagName('item');
        var numStories = stories.length;
        for(var i=0; i < numStories; i++)
        {
            var title = stories[i].getElementsByTagName('title')[0].firstChild.nodeValue;
            var description = stories[i].getElementsByTagName('description')[0].firstChild.nodeValue;
            var pubDate = stories[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
           // var contentEncoded = stories[0].getElementsByTagName('contentEncoded')[i].firstChild.nodeValue;
            var storyOutput = "<p>" + title + "</p>";
            storyOutput += "<p>" + description + "</p>";
            storyOutput += "<p>" + pubDate + "</p>";
            output += storyOutput;
            
        }
        document.getElementById("result").innerHTML = output;
        
    }
}