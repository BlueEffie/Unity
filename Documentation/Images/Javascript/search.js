function PerformSearch(index) {
	var query=index.replace(/^[\s.]+|[\s.]+$/g,'').toLowerCase();
	var terms = query.split(/[\s.]+/);
	var score = new Object();
	var min_score = terms.length;
	var found_common = new Array();
	for (var i = 0; i < terms.length; i++){
		var term=terms[i];
		if(common[term]) {
			found_common.push(term);
			min_score --;
		}

		if(searchIndex[term]) {
			for(var j = 0; j < searchIndex[term].length; j++) {
				var page=searchIndex[term][j];
				if(! score[page] )
					score[page]=0;
				++score[page];
			}
		}
	}
	var results = new Array();
	for (var page in score) {
		// ignore partial matches
		if(score[page] >= min_score) {
			results.push(page);
			
			var placement;
			// Adjust scores for better matches
			for (var i = 0; i < terms.length; i++){
				var term=terms[i];
				if( (placement=info[page].title.toLowerCase().indexOf(term)) > -1) {
					score[page] += 50;
					if(placement==0 || info[page].title[placement-1]=='.')
						score[page] += 500;
					if(placement+term.length==info[page].title.length || info[page].title[placement+term.length]=='.')
						score[page] += 500;
				}	
				else if( (placement=info[page].summary.toLowerCase().indexOf(term)) > -1)
					score[page] += ((placement<10)?(20-placement):10);
			}				

			if (info[page].title.toLowerCase() == query )
				score[page] += 10000;
			else if ((placement=info[page].title.toLowerCase().indexOf(query)) > -1)
				score[page] += ((placement<100)?(200-placement):100);
			else if ((placement=info[page].summary.toLowerCase().indexOf(query)) > -1)
				score[page] += ((placement<25)?(50-placement):25);
		}
	}
	
	results=results.sort(function (a,b) {
		if (score[b]==score[a]) { // sort alphabetically by title if score is the same
			var x = info[a].title.toLowerCase();
			var y = info[b].title.toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		else { // else by score descending
			return score[b]-score[a] 
		}
	});
	
	if (results.length > 0) {
		if (p.redirect && ( results.length == 1 || p.redirect <= score[results[0]]-score[results[1]] )) {
			document.location=info[results[0]].url+".html";
			return;
		}

		var str = "Your search for <q><i>"+index+"</i></q> resulted in "+results.length+" matches:<ul>";
		for (i in results) {
			var j=info[results[i]];
			str += '<li class="searchres"><a href=\'./' + j.url + '.html\'>'+j.title+'</a>';

			if (p.show_score)
				str += '<i>Score: '+score[results[i]]+'</i>';
			str += '<br/>'+j.summary+'</li>';
		}
		document.getElementById("mainContainer").innerHTML = str + '</ul>';
	} else
		document.getElementById("mainContainer").innerHTML="Your search for <q><i>"+index+"</i></q> did not result in any matches. Please try again with a wider search";
		
	return false;
}
