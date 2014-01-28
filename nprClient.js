var xmlhttp;

window.onload = function()
{
    //Open Connection to NPR server for Topic List
    //
    //
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processData;
    xmlhttp.open("get", "http://api.npr.org/list?id=3218", false);
    xmlhttp.send();
}

function processData()
{
if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
	//Get the ids, titles and infos from the XML and build each list item
    //
    //
    var ids;
	var titles;
	var info;
	var output ="<ul>";
	
    //Loop through the items nodes in the XML
    var theXML = xmlhttp.responseXML.documentElement.getElementsByTagName('item');
	var numItems = theXML.length;
	for(var i=0; i< numItems; i++)
		{
			ids= theXML[i].getAttribute('id');
			titles= theXML[i].getElementsByTagName('title')[0].firstChild.textContent;
			info= theXML[i].getElementsByTagName('additionalInfo')[0].firstChild.textContent;
			output += buildOutputCell(ids, titles, info);
		}
	output += "</ul>";
	
    //Add the constructed output to the UI
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
    //Second XMLHTTP Request to get the selected news category XML
    //
    //
    var url = "http://api.npr.org/query?id=" + id + "&output=RSS&apiKey=MDEzMDc4Mjg4MDEzOTA4NjIzNTZkYzEwYw001";
    console.log(url);
    xmlhttp.onreadystatechange = processNewStory;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    
}

function processNewStory()
{
    //Process and display stories
    //
    //
    if(xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var output = "";
        var storyXML = xmlhttp.responseXML.documentElement;
        console.log(storyXML);
        var image = storyXML.getElementsByTagName('image')[0].getElementsByTagName('url')[0].firstChild.nodeValue;
        document.getElementById('catImage').src = image;
        var title = storyXML.getElementsByTagName('title')[0].firstChild.nodeValue;
        output += "<h2>" + title + "</h2>";
        output += "<p><em>" + storyXML.getElementsByTagName('copyright')[0].firstChild.nodeValue + "</em></p>";
        var stories =  storyXML.getElementsByTagName('item');
        var numStories = stories.length;
        for(var i=0; i < numStories; i++)
        {
            var title = stories[i].getElementsByTagName('title')[0].firstChild.nodeValue;
            var description = stories[i].getElementsByTagName('description')[0].firstChild.nodeValue;
            var pubDate = stories[i].getElementsByTagName('pubDate')[0].firstChild.nodeValue;
            var link = stories[i].getElementsByTagName('link')[0].firstChild.nodeValue;
            output += makeStories(title, description, pubDate, link);
        }
        document.getElementById("result").innerHTML = output;
        
    }
}

function makeStories(title,description,pubDate, link)
{
    var storyOutput = "<h3>" + title + "</h3>";
    storyOutput += "<p id='description'>" + description;
    storyOutput += "<a href='" + link + "'>&nbsp;More...</a></p>";
    storyOutput += "<p id='pubdate'>" + pubDate + "</p>"; 
    return storyOutput;
}
