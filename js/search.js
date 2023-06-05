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

document.getElementById("img_mask").addEventListener("click", ()=> searchInput.focus() );

document.querySelector(".home__logo-containerrr").addEventListener("click", ()=> searchInput.focus() );

document.querySelector(".home__direct-access-row").addEventListener("click", ()=> searchInput.focus() );

searchEngineMenuOptions = [
	
	{"Baidu" : "https://www.baidu.com/s?ie=utf-8&wd="},

	{"Bing" : "https://www.bing.com/search?q="},

	{"Duckduckgo" : "https://duckduckgo.com/?q="},

	{"Google" : "https://www.google.com/search?q="},

	{"Qwant" : "https://www.qwant.com/?q="},

	{"Yandex" : "https://yandex.com/search/?text="},

	{"Yandex-r" : "https://yandex.ru/search/?text="}
];

switch (localStorage.getItem("search_engines") ) {

	case null:

	break;

	default:

		cachedSearchEngines = localStorage.getItem("search_engines");

		cachedSEArray = cachedSearchEngines.split(",");

		cachedSEArray.forEach(e => {

			cachedSE = e.split();

			cachedSESplit = cachedSE[0].split(";;;");

			cachedSESplit[0];

			cachedSESplit[1];

			newSEObject = JSON.parse('{ "' + cachedSESplit[0] + '" : "' + cachedSESplit[1] + '" }');

			searchEngineMenuOptions.push(newSEObject);
		});

	break;
}

searchEngineMenu = document.getElementById("s_engine");

function createOptions (name) {

	let option = document.createElement("option");

	option.setAttribute("value", name);

	name == "Google" ? option.setAttribute("selected", "true") : false;

	searchEngineMenu.appendChild(option);

	option.innerText = name;
}

searchEngineMenuOptions.forEach(e => {

	optionName = Object.keys(e);

	createOptions(optionName[0]);
});

searchEngineMenu.addEventListener("input", ()=> localStorage.setItem("searchEngine", searchEngineMenu.value) );

switch ( localStorage.getItem("searchEngine") ) {

	case null:

	break;

	default:

		searchEngineMenu.value = localStorage.getItem("searchEngine");

	break;
}

resultsBoxC = document.querySelector(".results_box_container");

results = document.querySelector(".results_box");

links = document.querySelectorAll('.result');

currentURL = window.location.href;

function liveSearch() {

	let search_query = searchInput.value !== " " ? searchInput.value : "";

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

				switch ( links[i].textContent.toLowerCase().includes( search_query.toLowerCase() ) ) {

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

searchInput.addEventListener('input', () => liveSearch() );

resultsBoxC.addEventListener("click", ()=>{

	searchInput.value = "";

	setTimeout( () => {

		liveSearch();

		searchInput.focus();
	}, 250);
});

directAccessRow = document.querySelector(".home__direct-access-row");

function updateHistory() {

	switch ( localStorage.getItem("history") ) {

		case null:

		break;

		default:

			userHistory = localStorage.getItem("history");

			inputs = userHistory.split(';;;');

			switch (userHistory == "noHistory") {

				case false:

					directAccessRow.innerHTML = "";

					for (let i = 0; i < inputs.length; i++) {

						let element = inputs[i];

						let shortcut = document.createElement("a");

						for (let i = 0; i < searchEngineMenuOptions.length; i++) {

							let e = searchEngineMenuOptions[i];

							let sEMOKey = Object.keys(e);

							switch ( element.includes( sEMOKey[0] ) ) {

								case false:

								break;

								default:

									elementEngine = Object.values(e);

									elementLink = element.replace(sEMOKey[0] + ": ", elementEngine[0]);
			
								break;
							}
						}

						shortcut.setAttribute("href", elementLink);

						shortcut.setAttribute("title", "Acceso directo");

						shortcut.setAttribute("class", "direct-access");

						shortcut.setAttribute("target", "_blank");

						directAccessRow.appendChild(shortcut);

						let icon = document.createElement("img");

						icon.setAttribute("src", "./img/android-icon-192x192.png");

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

function openTab(sEngine, array) {

	switch (sEngine) {

		case 0:

			searchEngine = "";

		break;

		default:

			for (let i = 0; i < searchEngineMenuOptions.length; i++) {

				let e = searchEngineMenuOptions[i];

				switch ( searchEngineMenu.value == Object.keys(e) ) {

					case false:

					break;

					default:

						searchEngine = Object.values(e)[0];

					break;
				}
			}

			switch ( localStorage.getItem("history") ) {

				case null:

					localStorage.setItem('history', searchEngineMenu.value + ": " + array);

				break;

				default:

					switch (userHistory == "noHistory") {

						case false:

							userHistory = userHistory + ";;;" + searchEngineMenu.value + ": " + array;

							inputs = userHistory.split(";;;");

							switch (inputs.length < 6) {

								case false:

									inputs.shift();

									newHistory = "";

									inputs.forEach(e => {

										newHistory == "" ? newHistory = e : newHistory += ";;;" + e;
									});

									localStorage.setItem('history', newHistory);

								break;

								default:

									localStorage.setItem('history', userHistory);

								break;
							}

						break;
					}

				break;
			}

			array = encodeURIComponent(array);

		break;
	}

	searchInput.value = "";

	liveSearch();

	directAccess.style.display = "block";

	setTimeout( () => {

		window.open(searchEngine + array);
	}, 250);

	updateHistory();
}

function redirect(array) {

	switch ( array.includes("http") ) {

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

	switch ( document.getElementById(keyWords) ) {

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

			switch ( voiceText.includes('.') && !voiceText.includes(' ') ) {

				case false:

					openTab(1, voiceText);

				break;

				default:

					redirect(voiceText);

				break;
			}

		break;
	}
});