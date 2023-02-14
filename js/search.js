searchForm = document.querySelector(".home__form");
searchInput = document.querySelector(".google-search");

function showForm() {

    searchForm.classList.toggle("hidden");

    searchInput.focus();
    
	searchInput.value = "";
	
	liveSearch();
}

document.documentElement.addEventListener('keyup', (e)=>{

    switch (e.key) {

		case "|":

			showForm();

		break;
    }
});

document.getElementById('form-btn').addEventListener("click", showForm);

document.getElementById("img_mask").addEventListener("click", ()=>{

	searchInput.focus();
});

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

				switch (links[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {

					case false:
			
						links[i].classList.remove("actual");

						switch (document.querySelectorAll('.actual').length) {

							case 0:

								resultsBoxC.classList.add("hidden");
							break;
						}
					
					break;

					default:
			
						links[i].classList.add("actual");
			
						resultsBoxC.classList.remove("hidden");

					break;
				}

			break;
		}
	}
}

//A little delay
let typingTimer;               
let typeInterval = 250;  

searchInput.addEventListener('input', () => {

	clearTimeout(typingTimer);
	
	typingTimer = setTimeout(liveSearch, typeInterval);
});

resultsBoxC.addEventListener("click", ()=>{

	searchInput.value = "";

	setTimeout(() => {

		liveSearch();

		searchInput.focus();
	}, 250);
});

function openTab(google, array) {

	switch (google) {

		case 0:

			query = "";

		break;

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

	switch (array.includes("http")) {

		case false:

			url = 'http://' + array;

		break;

		default:

			url = '' + array;

		break;
	}
	
	confRedir = confirm("Estás llendo a: " + array);

	switch (confRedir) {

		case true:

			openTab(0, url);

		break;
	}
}

function createLink(path, tag, keyWords) {

	let site = document.createElement("a");

	site.setAttribute("href", path);

	site.setAttribute("class", "result actual");

	results.appendChild(site);
	
	site.innerText = tag;

    let words = document.createElement("span");

    words.setAttribute("class", "key_words");

    site.appendChild(words);
    
    words.innerText = keyWords;
	
	resultsBoxC.classList.remove("hidden");

	links = document.querySelectorAll('.result');
}

document.querySelector(".home__form").addEventListener("submit", (e)=>{

	e.preventDefault();

	let voiceText = searchInput.value;

	switch (voiceText.length > 0) {

		case true:

			switch (voiceText.includes(' ')) {

				case false:

					switch (voiceText.includes('.')) {

						case false:

							switch (voiceText.toLowerCase()) {

								case '/nsfw':

									switch (document.querySelector(".nsfw")) {

										case null:

											createLink("sites_list/sites_list.html", "NSFW Sites", "/nsfw");

										break;
									}

								break;
								
								case '/mtrx':

									switch (document.querySelector(".matrix")) {

										case null:

											createLink("matrix/index.html", "Matrix", "/mtrx");

										break;
									}
									
								break; /* 

								case '/krk':

									createLink("karaoke/", "Karaoke");

								break; */

								default:

									openTab(1, voiceText);

								break;
							}

						break;

						default:
							
							redirect(voiceText);

						break;
					}

				break;

				default:

					openTab(1, voiceText);

				break;
			} /* 

			inputs = [];

			switch (localStorage.getItem("history")) {

				case null:

				break;

				default:

					inputs.unshift(localStorage.getItem("history"));

				break;
			}

			inputs.unshift(voiceText);
			
			localStorage.setItem('history', inputs); */

		break;
	}
});