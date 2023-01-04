searchInput = document.querySelector(".google-search");

resultsBoxC = document.querySelector(".results_box_container");

results = document.querySelector(".results_box");

links = document.querySelectorAll('.result');

currentURL = window.location.href;

function liveSearch() {

	let search_query = searchInput.value;
	
	//Use innerText if all contents are visible
	//Use textContent for including hidden elements

	for (i = 0; i < links.length; i++) {

		if (search_query.length > 0) {

			if (links[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {
	
				links[i].classList.add("actual");
	
				resultsBoxC.classList.remove("hidden");
			}

			else {
	
				links[i].classList.remove("actual");

				if (document.querySelectorAll('.actual').length < 1) {

					resultsBoxC.classList.add("hidden");
				}
			}
		}
		
		else {

			resultsBoxC.classList.add("hidden");

			links[i].classList.remove("actual");
		}
	}
}

//A little delay
let typingTimer;               
let typeInterval = 500;  

searchInput.addEventListener('input', () => {

	clearTimeout(typingTimer);
	
	typingTimer = setTimeout(liveSearch, typeInterval);
});

document.getElementById('form-btn').addEventListener("click", liveSearch);

resultsBoxC.addEventListener("click", ()=>{

	searchInput.value = "";

	setTimeout(() => {

		liveSearch();
	}, 250);
});

function createLink(path, tag) {

	let site = document.createElement("a");

	site.setAttribute("href", path);

	// site.setAttribute("target", "_blank");

	site.setAttribute("class", "result actual");

	results.appendChild(site);
	
	site.innerText = tag;
	
	resultsBoxC.classList.remove("hidden");
}

function reduce(array) {

	if (array.includes("http") || array.includes("file:")) {

		openTab(0, array);
	}
	
	else {

		redirect(array);
	}
}

function redirect(array) {

	if (!!array && !/^https?:\/\//i.test(array)) {
	
		url = 'http://' + array;

		redir = confirm("Estás llendo a: " + array);

		if (redir == true) {

			openTab(0, url);
		}
	} 
}

function openTab(google, array) {

	switch (google) {

		case 0:

			query = "";

			break;

		case 1:

		default:

			query = "https://www.google.com/search?q=";
			
			break;
	}

	searchInput.value = "";

	setTimeout(() => {

		window.open(query + array);
	}, 250);
}

document.querySelector(".home__form").addEventListener("submit", (e)=>{

	e.preventDefault();

	let voiceText = searchInput.value;

	if (voiceText.length > 0) { 

		if (voiceText.includes(' ')) {

			openTab(1, voiceText);
		}
		
		else {
			
			if (voiceText.includes('.')) {
				
				reduce(voiceText);
			}

			else {

				if (voiceText.toLowerCase() == 'bkmrks') {

					createLink("bookmarks/bookmarks.html", "Bookmarks");
				}

				else if (voiceText.toLowerCase() == 'krk') {

					createLink("karaoke/", "Karaoke");
				}

				else if (voiceText.toLowerCase() == 'mtrx') {

					createLink("matrix/", "Matrix");
				}

				else {

					openTab(1, voiceText);
				}
			}
		}
	}
});