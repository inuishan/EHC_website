monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
monthNum = {'January':0, 'February':1, 'March':2, 'April':3, 'May':4, 'June':5, 'July':6, 'August':7, 'September':8, 'October':9, 'November':10, 'December':11};


$(document).ready(function(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();;

	fetchRecentBlogs(year, month);
	fetchComingEvents(year, month);
});

function makeBlog(title, date, author, post){
	var blog = "<article class='blogPost'>\
                      <header>\
                        	<h1>" + title + "</h1>\
                            <hr>\
                      </header>\
                      <section>\
                        	<div class='clear blogPostMeta' >\
                            	<span class='writtenDate'>" + date + "</span> , \
                                <span class='author'>" + author + "</span>\
                            </div>\
                            <div class='clear blogPostContent'>" + post + "</div>\
                            <div class='clear comment'></div>\
                            <hr/>​\
                      </section>\
                 </article>";
	return blog;
}
function putRecentBlogs(blogs){
	$('#contentWrapper #recentBlog').empty();
	for(i = 0; i < blogs.length ; i++){
		blogArticle = makeBlog(blogs[i].title, blogs[i].date, blogs[i].author, blogs[i].post);
		$('#contentWrapper #recentBlog').append(blogArticle);
	}
}

function fetchRecentBlogs(year, month){
	
	
	$.post("php/api.php", {method : 'fetchRecentBlogs', year : year , month : month},function(retData){
		//alert(retData.head.status + retData.body.username);
		if(retData.head.status == 200){//accepted
			putRecentBlogs(retData.body);
		}else if(retData.head.status == 404){//not found
			$('#contentWrapper #recentBlog').empty();
		}else if(retData.head.status == 400){//bad request
			//form not completly filled
		}
	}, "json");		
}
function makeComingEvent(id, title, time, venue, desc, year, month){
	var comingEventArticle = "<li class='dropdown'>\
								<h2><a href='/ehcwebsite/events.html#year=" + year + "&month=" + monthName[month] + "&articleID=" + id + "'>" + title + "</a><span class='bullet'></span></h2>\
								<div class='eventBody'>\
									<div class='clear'>\
										<div class='label'>Time</div><div class='colon'>-</div><div class='field'>" + time + "</div>\
									</div>\
									<div class='clear'>\
										<div class='label'>Venue</div><div class='colon'>-</div><div class='field'>" + venue + "</div>\
									</div>\
									<div class='clear'>\
										<div class='label'>Desc</div><div class='colon'>-</div><div class='field'>" + desc + "</div>\
									</div>\
								</div>\
							</li>";
	return comingEventArticle;

}

function makeComingEventsHeading(){
	$('#contentWrapper #comingEvents ul').append("<li class='dropdown'>\
                            						<h1>Coming Events</h1>\
                        							</li>");
}
function putComingEvents(comingEvents){
	$('#contentWrapper #comingEvents ul').empty();
	makeComingEventsHeading();
	for(i = 0; i < comingEvents.length ; i++){
		comingEventArticle = makeComingEvent(comingEvents[i].index, comingEvents[i].title, comingEvents[i].time, comingEvents[i].venue, comingEvents[i].desc, comingEvents[i].year, comingEvents[i].month);
		$('#contentWrapper #comingEvents ul').append(comingEventArticle);
	}

}
function fetchComingEvents(year, month){
	$.post("php/api.php", {method : 'fetchComingEvents', year : year , month : month},function(retData){
		//alert(retData.head.status + retData.body.username);
		if(retData.head.status == 200){//accepted
			putComingEvents(retData.body);
		}else if(retData.head.status == 404){//not found
			$('#contentWrapper #comingEvents ul').empty();
			makeComingEventsHeading();
		}else if(retData.head.status == 400){//bad request
			//form not completly filled
		}
	}, "json");		
	
}