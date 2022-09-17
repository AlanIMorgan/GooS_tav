searchInput = document.querySelector(".google-search");

resultsBoxC = document.querySelector(".results_box_container");

links = document.querySelectorAll('.result');

currentURL = window.location.href;

function liveSearch() {

	let search_query = searchInput.value;
	
	//Use innerText if all contents are visible
	//Use textContent for including hidden elements

	for (var i = 0; i < links.length; i++) {

		if (search_query.length > 0 && links[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {

			links[i].classList.add("actual");

			resultsBoxC.classList.remove("hidden");
		}
		
		else if (search_query.length < 1) {

			resultsBoxC.classList.add("hidden");
		}
		
		else {

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

	liveSearch();
});

document.querySelector(".home__form").addEventListener("submit", (e)=>{

	e.preventDefault();

	let voiceText = document.querySelector(".google-search").value;

	if (voiceText.length > 0) { 

		if (voiceText.includes(' ')) { 
		
			window.open("https://www.google.com/search?q=" + voiceText);

			document.querySelector(".google-search").value = "";
		}
		
		else {
			
			if (voiceText.includes('.')) {
				
				reduce();

				function reduce() {

					if (voiceText.includes('://')) {
						
						link = voiceText.split('://');

						redirect();
					} 
					
					else {
						
						link = [0, voiceText];

						redirect();
					}
				}

				function redirect() {

					if (!!link[1] && !/^https?:\/\//i.test(link[1])) {
					
						url = 'http://' + link[1];

						redir = confirm("Estás llendo a: "+voiceText);
	
						if (redir == true) {
						
							window.open(url);

							document.querySelector(".google-search").value = "";
						}
					} 
				}
			}

			else {

				if (voiceText.toLowerCase() == 'bookmarks') {

					if (currentURL.includes('index.html')) {

						updatedURL = currentURL.replace('index.html', 'bookmarks/bookmarks.html');

						window.open(updatedURL);
					}

					else {

						window.open(currentURL + 'bookmarks/bookmarks.html');
					}
				}

				else {
		
					window.open("https://www.google.com/search?q=" + voiceText);

					document.querySelector(".google-search").value = "";
				}
			}
		}
	}
});