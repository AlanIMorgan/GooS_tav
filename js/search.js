switch (localStorage.getItem("bookmarks")) {

	case null:

	break;

	default:

		bookmarks = localStorage.getItem("bookmarks");

		sites = bookmarks.split(',');

		for (let i = 0; i < sites.length; i++) {

			let e = sites[i];

			ePrprts = e.split(';;;');
		}

	break;
}

searchForm = document.querySelector(".home__form");
searchInput = document.querySelector(".google-search");

function showForm() {

    searchForm.classList.toggle("hidden");

    searchInput.focus();
    
	searchInput.value = "";
	
	window.addEventListener("resize", ()=>{

		scroll(0, 500);
	});

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

				directAccess = document.querySelector(".home__direct-access-row");
				
				directAccess.style.display = "block";

			break;

			default:

				directAccess.style.display = "none";

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

directAccessRow = document.querySelector(".home__direct-access-row");

function updateHistory() {

	switch (localStorage.getItem("history")) {

		case null:

		break;

		default:

			userHistory = localStorage.getItem("history");

			inputs = userHistory.split(',');

			switch (userHistory == "noHistory") {

				case false:
			
					directAccessRow.innerHTML = "";

					for (let i = 0; i < inputs.length; i++) {

						const element = inputs[i];

						let shortcut = document.createElement("a");

						shortcut.setAttribute("href", "https://www.google.com/search?q=" + element);

						shortcut.setAttribute("title", "Acceso directo");

						shortcut.setAttribute("class", "direct-access");

						shortcut.setAttribute("target", "_blank");

						directAccessRow.appendChild(shortcut);

						let icon = document.createElement("img");

						icon.setAttribute("src", "https://www.google.com/favicon.ico");

						icon.setAttribute("class", "direct-access__img");

						shortcut.appendChild(icon);

						let info = document.createElement("div");

						info.setAttribute("class", "direct-access__info");

						shortcut.appendChild(info);

						info.innerText = element;
					}

				break;
			}

		break;
	}
}

updateHistory();

function openTab(google, array) {

	switch (google) {

		case 0:

			query = "";

		break;

		default:

			query = "https://www.google.com/search?q=";

			inputs = [];

			switch (localStorage.getItem("history")) {

				case null:
					
					localStorage.setItem('history', array);

				break;

				default:

					userHistory = localStorage.getItem("history");
		
					inputs = userHistory.split(',');

					switch (userHistory == "noHistory") {

						case false:

							inputs.push(array);
				
							switch (inputs.length < 6) {
				
								case false:
				
									inputs.shift();
				
								break;
							}
							
							localStorage.setItem('history', inputs);

						break;
					}

				break;
			}

			array = encodeURIComponent(array);

		break;
	}

	searchInput.value = "";

	directAccess.style.display = "block";

	setTimeout(() => {

		window.open(query + array);
	}, 250);

	updateHistory();
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

	switch (document.getElementById(keyWords)) {

		case null:

			let site = document.createElement("a");
		
			site.setAttribute("href", path);
		
			site.setAttribute("id", keyWords);
		
			site.setAttribute("class", "result actual");
		
			results.appendChild(site);
			
			site.innerText = tag;
		
			let words = document.createElement("span");
		
			words.setAttribute("class", "key_words");
		
			site.appendChild(words);
			
			words.innerText = keyWords;
			
			resultsBoxC.classList.remove("hidden");
		
			links = document.querySelectorAll('.result');

		break;
	}
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
			}

		break;
	}
});