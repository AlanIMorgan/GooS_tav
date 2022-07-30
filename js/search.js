searchInput = document.querySelector(".google-search");

resultsBoxC = document.querySelector(".results_box_container");

links = document.querySelectorAll('.result');
		
function liveSearch() {

	let search_query = searchInput.value;
	
	//Use innerText if all contents are visible
	//Use textContent for including hidden elements

	for (var i = 0; i < links.length; i++) {

		if (search_query != "" && links[i].textContent.toLowerCase().includes(search_query.toLowerCase())) {

			links[i].classList.add("actual");

			resultsBoxC.classList.remove("hidden");
		}
		
		else if (search_query == "") {

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

document.querySelector(".home__form").addEventListener("submit",()=>{

	event.preventDefault();
});

document.documentElement.addEventListener("keyup",(evt)=>{

	if (evt.which == 13) {
	
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
							
							link = [0, voiceText];/* 

							console.log(link[1]); */

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
			
					window.open("https://www.google.com/search?q=" + voiceText);
	
					document.querySelector(".google-search").value = "";
				}
			}
		}
	}
});