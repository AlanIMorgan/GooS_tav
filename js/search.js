function showForm() {

    form.classList.toggle("hidden");

    input.focus();
    
	input.value = "";
	
	liveSearch();
}

document.documentElement.addEventListener('keyup', (e)=>{

    if (e.key == "|") {

        showForm();
    }
});

document.getElementById('form-btn').addEventListener("click", showForm);

searchInput = document.querySelector(".google-search");

resultsBoxC = document.querySelector(".results_box_container");

results = document.querySelector(".results_box");

links = document.querySelectorAll('.result');

currentURL = window.location.href;

function liveSearch() {

	let search_query = searchInput.value;

	for (i = 0; i < links.length; i++) {

		switch (search_query.length) {

			case 0:

				resultsBoxC.classList.add("hidden");
	
				links[i].classList.remove("actual");

			break;

			default:

				if (links[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {
		
					links[i].classList.add("actual");
		
					resultsBoxC.classList.remove("hidden");
				}

				else {
		
					links[i].classList.remove("actual");

					switch (document.querySelectorAll('.actual').length) {

						case 0:

							resultsBoxC.classList.add("hidden");
						break;
					}
				}

			break;
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

resultsBoxC.addEventListener("click", ()=>{

	searchInput.value = "";

	setTimeout(() => {

		liveSearch();
	}, 250);
});

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

function redirect(array) {

	if (array.includes("http")) {

		url = '' + array;
	}
	
	else {

		url = 'http://' + array;
	}
	
	confRedir = confirm("Estás llendo a: " + array);

	if (confRedir == true) {

		openTab(0, url);
	}
}

function createLink(path, tag) {

	let site = document.createElement("a");

	site.setAttribute("href", path);

	// site.setAttribute("target", "_blank");

	site.setAttribute("class", "result actual");

	results.appendChild(site);
	
	site.innerText = tag;
	
	resultsBoxC.classList.remove("hidden");
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
				
				redirect(voiceText);
			}

			else {

				if (voiceText.toLowerCase() == '/nsfw') {

					createLink("bookmarks/bookmarks.html", "NSFW Sites");
				}

				else if (voiceText.toLowerCase() == '/krk') {

					createLink("karaoke/", "Karaoke");
				}

				else if (voiceText.toLowerCase() == '/mtrx') {

					createLink("matrix/", "Matrix");
				}

				else {

					openTab(1, voiceText);
				}
			}
		}
	}
});