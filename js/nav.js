navMenu = document.querySelector(".nav__li-submenu-ul");

newSiteModal = document.getElementById("new_site_modal");

const sharingSite = window.location.search;

const urlParams = new URLSearchParams(sharingSite);

switch ( urlParams.get('link') ) {

    case null:

    break;

    default:

        sharedSiteLink = urlParams.get("link");

        navMenu.classList.add("nav__li-submenu-ul_list");

        newSiteModal.classList.replace("hidden", "new_site_modal-form");

        document.getElementById("site_link").value = sharedSiteLink;

        document.getElementById("site_name").focus();

    break;
}

// Background

homeImg = document.getElementById("home_img").getElementsByTagName("img")[0];

bckgrndInpt = document.getElementById("bckgrnd_sttng");

bckgrndInpt.addEventListener("input", ()=>{changeBackground(bckgrndInpt.value); location.reload(); } );

switch (localStorage.getItem("bckgrnd") ) {

    case null:

        homeImg.src = "";

    break;

    default:

        changeBackground(localStorage.getItem("bckgrnd") );
    break;
}

function isEmptyOrSpaces (str) {

    return str == null || str.match(/^\s*$/) !== null;
}

function changeBackground (url) {

    switch (url.includes("http") ) {

        case false:

            localStorage.removeItem("bckgrnd");

            localStorage.removeItem("comp_bck");

        break;

        default:

            localStorage.setItem("bckgrnd", url);

            localStorage.removeItem("comp_bck");

            homeImg.src = url;

            document.getElementById("img_mask").style = "z-index: 1;";

        break;
    }
}

document.getElementById("random_wpp").addEventListener("click", ()=>{

    resolution = window.innerWidth + "x" + window.innerHeight;

    fetch("https://source.unsplash.com/random/" + resolution + "/?night")

    .then(response => {

        changeBackground(response.url);

        location.reload();
    })

    .catch(err => console.log('Solicitud fallida', err));
});

// Nickname

nickName = document.getElementById("nick_sttng");

searchInpt = document.getElementById("google-search");

nickName.addEventListener("blur", ()=>{changeNick(); location.reload();} );

function resetNick() {

    searchInpt.placeholder = "¿Buscas películas, música o libros?";
}

switch (localStorage.getItem("user") ) {

    case null:

        resetNick();

    break;

    default:

        nickName.value = localStorage.getItem("user");

        changeNick();

    break;
}

function changeNick() {

    nick = nickName.value;

    switch (isEmptyOrSpaces(nick) ) {

        case false:

            searchInpt.placeholder = "¡Hola, " + nick + "!";

            localStorage.setItem("user", nick);

        break;

        default:

            resetNick();

        break;
    }
}

// Menus

navBtn = document.getElementById('nav_btn');
navListBtn = document.getElementById('nav_btn-list');
profileNavBtn = document.getElementById('nav_profile_btn');
resultsBoxC = document.querySelector(".results_box_container");
results = document.querySelector(".results_box");
profileNavMenu = document.querySelector(".nav__submenu-profile");
fullScreenBtn = document.getElementById("full_screen_btn");
home = document.querySelector(".home");

navBtn.addEventListener("click", showHideNav);

navListBtn.addEventListener("click", ()=>{

    navMenu.classList.toggle("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
});

profileNavBtn.addEventListener("click", ()=>{

    profileNavMenu.classList.toggle("block");
    navMenu.classList.remove("nav__li-submenu-ul_list");
});

fullScreenBtn.addEventListener("click", ()=>{

    home.requestFullscreen();
});

home.addEventListener("click", ()=>{

    navMenu.classList.remove("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
});

function showHideNav() {

    navMenu.classList.toggle("block");
    navMenu.classList.remove("hide");
    navMenu.classList.remove("nav__li-submenu-ul_list");

    profileNavMenu.classList.replace("block", "hide");
}

// CLOCK

clockSttng = document.getElementById("clock_sttng");

clockSttng.addEventListener("input", ()=>{

    switch (clockSttng.checked) {

        case false:

            localStorage.removeItem("clock");

        break;

        default:

            localStorage.setItem("clock", "true");

        break;
    }

    location.reload();
} );

switch (localStorage.getItem("clock") ) {

    case null:

    break;

    default:

        clockSttng.checked = true;

        createClock();

    break;
}

clockContainer = document.getElementById("clock");

function createClock() {

    setInterval( ()=>{

        date = new Date();

        hrs = date.getHours();
        mins = date.getMinutes();
        secs = date.getSeconds();

        period = "AM";

        if (hrs == "00" || 0) {

            hrs = 12;

            showCalendar(currentMonth, currentYear);
        }

        else if (hrs > 12) {

            hrs = hrs - 12;

            period = "PM";
        }

        hrs = hrs < 10 ? "0" + hrs : hrs;

        mins = mins < 10 ? "0" + mins : mins;

        secs = secs < 10 ? "0" + secs : secs;

        time = `${hrs}:${mins}:${secs} ${period}`;

        clockContainer.innerText = time;

    }, 1000);
}

//CALENDAR

today = new Date();

currentMonth = today.getMonth();

currentYear = today.getFullYear();

selectYear = document.getElementById("year");

selectYear.addEventListener("input", jump);

selectMonth = document.getElementById("month");

selectMonth.addEventListener("input", jump);

selectYear.value = currentYear;

selectMonth.value = selectMonth;

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");

function next() {

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    
    currentMonth = (currentMonth + 1) % 12;
    
    showCalendar(currentMonth, currentYear);
}

function previous() {

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    
    showCalendar(currentMonth, currentYear);
}

function jump() {

    currentYear = parseInt(selectYear.value);

    currentMonth = parseInt(selectMonth.value);

    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    selectYear.value = year;

    selectMonth.value = month;

    // creating all cells
    let date = 1;

    for (let i = 0; i < 6; i++) { // creates a table row

        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) { // creating individual cells, filing them up with data

            if (i === 0 && j < firstDay) {

                cell = document.createElement("td");

                cellText = document.createTextNode("");

                cell.appendChild(cellText);

                row.appendChild(cell);
            }

            else if (date > daysInMonth(month, year)) {

                break;
            }

            else {

                cell = document.createElement("td");

                cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {

                    cell.classList.add("today"); // color today's date
                }

                cell.appendChild(cellText);

                row.appendChild(cell);

                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {

    return 32 - new Date(iYear, iMonth, 32).getDate();
}

let firstDay = (new Date(year, month)).getDay();

tbl = document.getElementById("calendar"); // body of the calendar

// clearing all previous cells
tbl.innerHTML = "";

// filing data about month and in the page via DOM
monthAndYear.innerHTML = months[month] + " " + year;

selectYear.value = year;

selectMonth.value = month;

// creating all cells
let date = 1;

for (let i = 0; i < 6; i++) { // creates a table row
    
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) { // creating individual cells, filing them up with data.

        if (i === 0 && j < firstDay) {

            cell = document.createElement("td");

            cellText = document.createTextNode("");

            cell.appendChild(cellText);

            row.appendChild(cell);
        }

        else if (date > daysInMonth(month, year)) {

            break;
        }

        else {

            cell = document.createElement("td");

            cellText = document.createTextNode(date);

            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) { // color today's date

                cell.classList.add("bg-info");
            }

            cell.appendChild(cellText);

            row.appendChild(cell);

            date++;
        }
    }

    tbl.appendChild(row); // appending each row into calendar body.
}

showCalendar(currentMonth, currentYear);

// Favorites settings

favoritesSttng = document.getElementById("favorites_sttng");

favoritesRow = document.querySelector(".home__direct-access-favorites");

function showHideFavorites() {

    switch (localStorage.getItem("hideFavorites") ) {

        case null:

            favoritesRow.classList.remove("hidden");

            favoritesRow.scrollWidth > favoritesRow.clientWidth ? favoritesRow.style.justifyContent = "flex-start" : false;
        break;

        default:

            favoritesRow.classList.add("hidden");

            favoritesSttng.checked = false;
        break;
    }
}

showHideFavorites();

favoritesSttng.addEventListener("click", ()=>{

    switch (favoritesSttng.checked) {

        case false:

            localStorage.setItem("hideFavorites", "true");
        break;

        default:

            localStorage.removeItem("hideFavorites");
        break;
    }

    location.reload();
});

deleteFavorites = document.getElementById("delete_favorites");

switch (localStorage.getItem("favorites") ) {

    case null:
    break;

    default:

        let favorites = localStorage.getItem("favorites");

        favs = favorites.split(";;;");

        favs.forEach(e => {

            if (e.length > 0) {

                let option = document.createElement("option");

                option.setAttribute("value", e);

                deleteFavorites.appendChild(option);

                option.innerText = e;
            }
        });

        deleteFavorites.addEventListener("input", ()=>{

            let delSite = deleteFavorites.value;

            switch (delSite) {

                case "":
                break;

                case "all":

                    let favoritesAlert = confirm("¿Estás seguro de que quieres quedarte sin favoritos?");

                    switch (favoritesAlert) {

                        case false:

                            deleteFavorites.value = '';
                        break;

                        default:

                            localStorage.removeItem("favorites");

                            location.reload();
                        break;
                    }
                break;

                default:

                    let favoriteAlert = confirm("Estás apunto de eliminar: " + delSite);

                    switch (favoriteAlert) {

                        case false:

                            deleteFavorites.value = '';
                        break;

                        default:

                            favs.splice(favs.indexOf(delSite), 1 );

                            newFavs = favs.join(";;;");

                            newFavs.length > 0 ? localStorage.setItem("favorites", newFavs) : localStorage.removeItem("favorites");

                            location.reload();
                        break;
                    }
                break;
            }
        });
    break;
}

// Show/hide history

historySttng = document.getElementById("history_sttng");

switch (localStorage.getItem("history") ) {

    case null:

    break;

    case "noHistory":

        historySttng.checked = false;

    break;
}

historySttng.addEventListener("click", ()=>{

    switch (historySttng.checked) {

        case false:

            localStorage.setItem("history", "noHistory");

        break;

        default:

            localStorage.removeItem("history");

        break;
    }

    location.reload();
});

addSearchEngine = document.getElementById("add_search_engine");

SearchEngineModal = document.getElementById("new_search_engine_modal");

addSearchEngine.addEventListener("click", ()=>{

    SearchEngineModal.classList.replace("hidden", "new_search_engine_modal-form");

    window.scrollTo(0, 0);

    profileNavMenu.classList.add("ovrflw_hddn");

    document.getElementById("search_engine_name").focus();
});

cancelSearchEngine = document.getElementById("cancel-search_engine");

cancelSearchEngine.addEventListener("click", ()=>{

    document.getElementById("search_engine_name").value = "";

    document.getElementById("search_engine_link").value = "";

    SearchEngineModal.classList.replace("new_search_engine_modal-form", "hidden");
    
    profileNavMenu.classList.remove("ovrflw_hddn");
});

SearchEngineModal.addEventListener('keydown', (e)=>{

    switch (e.key) {

		case "Tab":

			e.preventDefault();

		break;
    }
});

addSEBtn = document.getElementById("cache_search_engine");

addSEBtn.addEventListener("click", ()=>{

    newSEName = document.getElementById("search_engine_name").value;

    newSELink = document.getElementById("search_engine_link").value;

    switch (localStorage.getItem("search_engines") ) {

        case null:

            localStorage.setItem("search_engines", newSEName + ";;;" + newSELink);

        break;

        default:

            cachedSearchEngines = localStorage.getItem("search_engines");

            localStorage.setItem("search_engines", cachedSearchEngines + "," + newSEName + ";;;" + newSELink);

        break;
    }

    location.reload();
});

// Profile settings

profileSttngs = document.getElementById("profile_settings");

function moveToProfileBttns(){ profileNavMenu.scrollTo(0, profileNavMenu.scrollHeight) }

profileSttngs.addEventListener("input", ()=>{

    switch (profileSttngs.value) {

        case "":
        break;

        case "export":

            exportConfigBtn = document.getElementById("export_config");

			switch (localStorage.length > 0) {

				case false:
				break;

				default:

					content = JSON.stringify(localStorage);

					encryptedData = CryptoJS.AES.encrypt(content, "GooStav"); // "GooStav" is the passphrase

					exportConfigBtn.href = "data:application/octet-stream," + encodeURIComponent(encryptedData.toString() );

					exportConfigBtn.download = nickName.value + "_" + "gsconf.json";

                    exportConfigBtn.style.display = "inline-block";

                    moveToProfileBttns();
				break;
			}
        break;

        case "import":

			importConfig = document.getElementById("import_config");

			importConfig.addEventListener("input", ()=>{

				file = importConfig.files[0];

				const reader = new FileReader();

				switch (file) {

					case null:
					break;

					default:

						reader.readAsText(file);
					break;
				}

				reader.addEventListener("load", ()=>{

					val = reader.result;

					switch (isEmptyOrSpaces(val) ) {

						case false:

							decryptedData = CryptoJS.AES.decrypt(val, "GooStav");

							dataString = decryptedData.toString(CryptoJS.enc.Utf8);

							profile = JSON.parse(dataString);

							profileKeys = Object.keys(profile);

							profileValues = Object.values(profile);

							localStorage.clear();

							for (let i = 0; i < profileKeys.length; i++) {

								localStorage.setItem(profileKeys[i], profileValues[i]);
							}

							location.reload();
						break;
					}
				});
			});

            document.getElementById("import_config_label").style.display = "inline-block";

            moveToProfileBttns();
        break;

        case "delete":

            deleteConfigBtn = document.getElementById("delete_config");

            deleteConfigBtn.addEventListener("click", ()=>{

                let conf = window.confirm("¡Estás a punto de eliminar tu configuración!");

                switch (conf) {

                    case false:
                    break;

                    default:

                        localStorage.clear();

                        location.reload();
                    break;
                }
            });

            deleteConfigBtn.style.display = "inline-block";

            moveToProfileBttns();
        break;
    }
});

// Shortcuts menu

function element(etiqueta, atributo, valor, texto) {

    let newElement = document.createElement(etiqueta);

    atributo != "" ? newElement.setAttribute(atributo, valor) : false;

    etiqueta == "div" ? newElement.setAttribute("class", "nav__submenu-element-section") : false;

    navMenu.appendChild(newElement);

    switch (etiqueta == 'a') {

        case false:

            newElement.innerText = texto;

        break;

        default:

            let newAnchor = document.createElement("div");

            newAnchor.setAttribute("class", "nav__submenu-element");

            newElement.appendChild(newAnchor);

            let newAnchorName = document.createElement("p");

            newAnchorName.setAttribute("title", texto);

            newAnchor.appendChild(newAnchorName);

            newAnchorName.innerText = texto;

        break;
    }
}

element("button", "class", "mas-de-google", "Añadir sitio");

masSites = document.querySelector(".mas-de-google");

masSites.style.display = "inline-block";

masSites.addEventListener("click", ()=>{

    window.scrollTo(0, 0);
    newSiteModal.classList.replace("hidden", "new_site_modal-form");
    navMenu.classList.add("ovrflw_hddn");
    document.getElementById("site_name").focus();
});

cancel = document.getElementById("cancel");

cancel.addEventListener("click", closeSiteForm);

function closeSiteForm() {

    document.getElementById("site_name").value = "";

    document.getElementById("site_link").value = "";

    document.getElementById("site_keywords").value = "";

    newSiteModal.classList.replace("new_site_modal-form", "hidden");
    
    navMenu.classList.remove("ovrflw_hddn");
}

newSiteModal.addEventListener('keydown', (e)=>{

    switch (e.key) {

		case "Tab":

			e.preventDefault();

		break;
    }
});

addSiteBtn = document.getElementById("cache_site");

addSiteBtn.addEventListener("click", addSite);

element("a", "href", "chess/index.html", "Ajedrez");

element("a", "href", "calculator/index.html", "Calculadora");

element("hr", "class", "nav__submenu-element-section-separator", "");

element("div", "class", "nav__submenu-element-section", "");

element("hr", "class", "nav__submenu-element-section-separator", "");

element("div", "class", "nav__submenu-element-section", "");

element("hr", "class", "nav__submenu-element-section-separator", "");

element("div", "class", "nav__submenu-element-section", "");

linksGroup =  document.getElementsByClassName("nav__submenu-element-section");

userLinks = linksGroup[0];

userLinks.classList.add("user_links");

googleLinks = linksGroup[1];
extraLinks = linksGroup[2];

function enlace(address, text, keyWords, zone) {

    let newLink = document.createElement("a");

    newLink.setAttribute("href", address);

    newLink.setAttribute("target", "_blank");

    let result = document.createElement("a");

    result.setAttribute("href", address);

    result.setAttribute("target", "_blank");

    result.setAttribute("class", "result");

    results.appendChild(result);

    result.innerText = text;

    let words = document.createElement("span");

    words.setAttribute("class", "key_words");

    result.appendChild(words);

    words.innerText = keyWords + " " + address;

    let div = document.createElement("div");

    div.setAttribute("class", "nav__submenu-element");

    let p = document.createElement("p");

    p.setAttribute("title", text);

    zone.appendChild(newLink);

    newLink.appendChild(div);

    div.appendChild(p);

    p.innerText = text;

    switch (zone == userLinks) {

        case false:

        break;

        default:

            let del = document.createElement("span");

            del.setAttribute("class", "delete_site");

            del.setAttribute("data-address", address);

            del.setAttribute("data-site", text);

            del.setAttribute("data-keywords", keyWords);

            zone.appendChild(del);

            del.innerText = "x";

        break;
    }
}

switch (localStorage.getItem("bookmarks") ) {

    case null:

        enlace("./", "Aquí aparecerán tus sitios", ".", userLinks);

    break;

    default:

        bookmarks = localStorage.getItem("bookmarks");

        sites = bookmarks.split(',');

        sites.forEach(e =>{

            ePrprts = e.split(";;;");

            e.length > 8 ? enlace(ePrprts[0], ePrprts[1], ePrprts[2], userLinks) : false;
        });

        userLinks.addEventListener("click", (e)=>{

            switch (e.target.className) {

                case "delete_site":

                    dataSets = [

                        e.target.dataset.address,

                        e.target.dataset.site,

                        e.target.dataset.keywords
                    ]

                    let conf = window.confirm("Estás a punto de borrar: " + dataSets[1]);

                    switch (conf) {

                        case false:

                        break;

                        default:

                            sites.splice(sites.indexOf(dataSets.join(";;;") ), 1);

                            sites.length > 0 ? localStorage.setItem("bookmarks", sites.toString() ) : localStorage.removeItem("bookmarks");

                            window.location.reload();

                        break;
                    }

                break;
            }
        });

    break;
}

function addSite() {

    let newSiteName = document.getElementById("site_name").value;

    let newSiteLink = document.getElementById("site_link").value;

    let newSiteKw = document.getElementById("site_keywords").value;

    switch (isEmptyOrSpaces(newSiteName) || isEmptyOrSpaces(newSiteLink) || isEmptyOrSpaces(newSiteKw) ) {

        case false:

            newBookmark = [

                document.getElementById("site_link").value,

                document.getElementById("site_name").value,

                document.getElementById("site_keywords").value.replace(',', '').toLowerCase()
            ];

            enlace(newBookmark[0], newBookmark[1], newBookmark[2], userLinks);

            newBookmark = newBookmark.join(";;;");

			switch (localStorage.getItem("bookmarks") ) {

				case null:

					localStorage.setItem("bookmarks", newBookmark);

				break;

				default:

                    sites.push(newBookmark);

                    localStorage.setItem("bookmarks", sites);

				break;
			}

            closeSiteForm();

            document.getElementById("site_name").value = "";

            document.getElementById("site_link").value = "";

            document.getElementById("site_keywords").value = "";

            location.reload();

        break;

        default:

            window.alert("Por favor, asegúrate de rellenar todos los campos");

        break;
    }
}

//    Google links    //

enlace("https://www.google.com/", "Google", "buscar search búsqueda", googleLinks);

enlace("https://myaccount.google.com/", "Cuenta de google", "account sesión manage session user gestionar usuario", googleLinks);

enlace("https://classroom.google.com/", "Google Classroom", "academic school scholar escuela tareas homework", googleLinks);

enlace("https://drive.google.com/", "Drive", "google almacenamiento nube cloud storage almacenar", googleLinks);

enlace("https://docs.google.com/", "Google Documentos", "ofimática word documents docs", googleLinks);

enlace("https://photos.google.com/", "Google Fotos", "photos gallery galería álbum album pics pictures images imágenes img jpg jpeg gif png webp wallpapers", googleLinks);

enlace("https://mail.google.com/mail/u/0/#all", "Gmail", "google correo electrónico mail email e-mail", googleLinks);

enlace("https://www.google.com/imghp", "Google Imágenes", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", googleLinks);

enlace("https://www.google.com/maps/", "Mapas", "google maps adress lugares", googleLinks);

enlace("https://news.google.com/", "Noticias", "google news", googleLinks);

enlace("https://play.google.com/store/", "Play Store", "google apps aplicaciones apks juegos games applications celulares smartphones teléfonos telefonos mobiles móviles android", googleLinks);

enlace("https://scholar.google.es/", "Google Scholar", "search buscar búsqueda académica escolar academic school", googleLinks);

enlace("https://docs.google.com/spreadsheets", "Google Sheets", "docs documents documentos cálculo hojas excel contabilidad economía", googleLinks);

enlace("https://translate.google.com/", "Traductor", "google translate languages idiomas", googleLinks);

enlace("https://www.youtube.com/", "YouTube", "ver vídeos videos música", googleLinks);

enlace("https://about.google/intl/es-419/products/", "Más de Google", "mas", googleLinks);

//    User links    //

enlace("https://123apps.com/", "123Apps", "utilities tools herramientas pdf word excel converter convertir conversión editar edición recortar imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img videos vídeos ecualizar audio equalizer eq ppt font tipografía files archivos ebook libros extractor extraer", extraLinks);

enlace("https://9xbuddy.xyz/", "9xbuddy", "movies downloader descargar vídeos videos películas peliculas piratería pirateria piracy", extraLinks);

enlace("https://www.academia.edu/", "Academia.edu", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://www.elacervo.com/directores", "Acervo Fílmico Digital", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.adobe.com/mx/acrobat/online/compress-pdf.html", "Adobe Acrobat Compressor", "comprimir pdf reducir documentos documents docs", extraLinks);

enlace("https://www.alamy.com/", "Alamy", "download descargar vídeos videos imágenes 360-degree imagenes pics pictures fotos photos buscar búsqueda search creative content contenido creativo vectors vectores artists artistas artes", extraLinks);

enlace("https://www.amazon.com/", "Amazon", "tienda shopping comprar compras e-commerce e commerce ecommerce ecomerce comercio", extraLinks);

enlace("https://express.adobe.com/", "Adobe Express", "photoshop diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://web.airdroid.com/", "AirDroid", "android mobile devices smartphones manager dispositivos móviles celulares teléfonos telefonos remote control access acceso remoto remota llamadas mensajes calls sms find encontrar transferir send enviar pc computer computadora share screen compartir pantalla files archivos apps applications aplicaciones apks notificaciones notifications", extraLinks);

enlace("https://webcast.airdroid.com", "AirDroid Cast", "android mobile devices smartphones dispositivos móviles celulares teléfonos telefonos remote access acceso remoto share screen compartir pantalla", extraLinks);

enlace("https://alphacoders.com/", "Alpha Coders", "images imagenes imágenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://apkgstore.com/", "Apkgstore", "descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.artistapirata.com/", "Artista Pirata", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", extraLinks);

enlace("https://www.artstation.com", "ArtStation", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://Baidu.com/", "Baidu", "buscar search búsqueda", extraLinks);

enlace("https://bandcamp.com/", "Bandcamp", "escuchar listen música musica", extraLinks);

enlace("https://www.base-search.net/", "BASE", "Bielefeld Academic Search Engine buscar búsqueda escuela school scholar escuela ensayos books libros documentos docs pdfs tareas académicos academicos", extraLinks);

enlace("https://www.behance.net/", "Behance", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://scriptorum.humanidades.unam.mx/SitiosInteres/Catalogo", "BIBLIOTHECA SCRIPTORVM GRAECORVM ET ROMANORVM MEXICANA", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs académicos academicos download free descargar gratis", extraLinks);

enlace("https://www.bing.com/", "Bing", "buscar search búsqueda", extraLinks);

enlace("https://www.bioline.org.br/", "Bioline", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos health salud medicine medicina enfermedades epidemiología biología biologia biologic medio ambiente biodiversidad biodiversity", extraLinks);

enlace("https://www.canva.com/", "Canva", "diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://chat.openai.com/", "ChatGPT", "inteligencia artificial intelligence ia ai búsqueda buscar search", extraLinks);

enlace("https://sur.ly/o/cinefiliamalversa.blogspot.com.ar/AA000014?pageviewId=desktop-302e36363034343030302031363638383031373733203438303533313335", "Cinéfila Malversa", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://ciudadseva.com/", "Ciudad Seva", "escritor Luis López Lopez Nieves biblioteca digital library cuentos poemas minicuentos aforismo teatro arte", extraLinks);

enlace("https://cloudconvert.com/", "CloudConvert", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://convertio.co/", "Convertio", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://cuevana3.ch/", "Cuevana3", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.deepl.com/es/translator", "Deepl", "translate languages traducir idiomas", extraLinks);

enlace("https://www.deviantart.com", "DeviantArt", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://dialnet.unirioja.es/", "Dialnet", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://discord.com/", "Discord", "gaming gameplays videocalls videollamadas videoconferencias video-conferencias reuniones virtuales redes sociales networks", extraLinks);

enlace("https://duckduckgo.com/", "Duckduckgo", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.ebiblioteca.org/lecturas/", "eBiblioteca", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.espaebook2.com/", "ERIC", "Education Resources Information Center buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.espaebook2.com/", "EspaEbook", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://excalidraw.com/", "Excalidraw", "whiteboard pizarra pizarrón pizarron diagramas dibujar drawing", extraLinks);

enlace("https://f-droid.org/en/packages/", "F-Droid", "descargar software libre open source gratis free download apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.facebook.com/", "Facebook", "redes sociales networks", extraLinks);

enlace("https://fakeupdate.net/", "Fake Update Screens", "actualización actualizacion falsa", extraLinks);

enlace("https://gatonplayseries.com/", "GatonPlaySeries", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://github.com/AlanIMorgan/GooS_tav", "GitHub", "code código codigo deveopers programación programacion", extraLinks);

enlace("https://gnula2.org/", "Gnula2", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("http://gnula.me", "Gnula.me", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://gnula.nu/", "Gnula", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://goostav.vercel.app/", "GooS_tav", "goostav buscar search búsqueda busqueda vercel", extraLinks);

enlace("https://www.guitars101.com/", "Guitars 101", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://hollymoviehd.cc/", "HollyMovieHD", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://igram.live/", "iGram", "instagram downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://www.iloveimg.com/", "I love IMG", "editar edición recortar convertir imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.ilovepdf.com/", "I love PDF", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://www.bing.com/images/create", "Image Creator from Bing", "inteligencia artificial intelligence ia ai images imagenes img pics pictures photos fotos wallpapers jpg jpeg png webp", extraLinks);

enlace("https://imgur.com", "Imgur", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://app.inferkit.com/demo", "InferKit", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://archive.org/", "Internet Archive", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://www.instagram.com/", "Instagram", "redes sociales networks photos gallery galería álbum album pics pictures images imágenes", extraLinks);

enlace("https://app.keeweb.info/", "KeeWeb", "password manager administrador contraseñas", extraLinks);

enlace("https://kupdf.net/", "KUPDF", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.last.fm/es/user/XaMadness", "Last.fm", "escuchar listen música musica recomendaciones recommendations", extraLinks);

enlace("https://libgen.li/", "Library Genesis", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.linkedin.com/in/alanmorgan-a/", "LinkedIn", "redes sociales networks trabajos empleos jobs oficios", extraLinks);

enlace("https://www.locopelis.com/", "LocoPelis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://ww1.m4uhd.tv/", "M4uHD", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.malavida.com", "Malavida", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://www.maztr.com/audiotageditor", "Maztr", "música musica metadata tags editor mp3", extraLinks);

enlace("https://mega.nz/", "Mega", "almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.megadiscografiascompletas.com/", "Mega Discografías", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.messenger.com/", "Messenger", "facebook redes sociales network mensajería mensajeria intantánea intantanea", extraLinks);

enlace("https://mirandogratis.com/chungking-express.html", "Mirando Gratis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://movieparadise.org/", "Moviesparadise", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://mqs.link/", "MQS Albums Download", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://tavasci3-musicrewind.blogspot.com/", "Music Rewind", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.napster.com", "Napster", "escuchar listen música musica", extraLinks);

enlace("https://www.newgrounds.com/", "Newgrounds", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales juegos games comunidades redes sociales networks", extraLinks);

enlace("https://normas-apa.org/", "Normas APA", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://sites.google.com/cuaad.udg.mx/habilidadesentics/objetos-virtuales-de-aprendizaje/normas-apa?authuser=0", "Normas APA - Google For Education", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://novamovie.net/", "Novamovie", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://onedrive.live.com/", "OneDrive", "microsoft office 365 almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.newocr.com/", "Free Online OCR", "optical characters reader lector óptico caracteres", extraLinks);

enlace("https://outlook.live.com/", "Outlook", "microsoft office 365 correo electrónico mail email e-mail hotmail", extraLinks);

enlace("https://outlook.office.com/", "Outlook (institucional)", "microsoft office 365 correo electrónico empresarial mail email e-mail hotmail", extraLinks);

enlace("https://jspaint.app/", "PaintJS", "", extraLinks);

enlace("https://pastedownload.com/", "PasteDownload", "facebook youtube downloader descargar música musica vídeos videos reels", extraLinks);

enlace("https://pcwonderland.com/", "PC Wonderland", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", extraLinks);

enlace("https://www.pdfdrive.com/", "PDF Drive", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.bajarpelisgratis.com/", "Pelis Gratis", "ver películas peliculas series completas gratis watch full free movies download descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://photocall.tv", "Photocall tv", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://www.pinterest.com.mx/", "Pinterest", "imágenes imagenes images img pics pictures photos fotos wallpapers arte digital artists artistas digitales", extraLinks);

enlace("https://www.pixiv.net/", "Pixiv", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://pixlr.com/", "Pixlr", "diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://poesiamexa.wordpress.com", "Poesía Mexa", "", extraLinks);

enlace("https://www.qrcode-monkey.com/", "QRCode Monkey", "", extraLinks);

enlace("https://quillbot.com/", "QuillBot", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://www.qwant.com/", "Qwant", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.rae.es/biblioteca-digital", "RAE (biblioteca digital)", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs académicos academicos download free descargar gratis", extraLinks);

enlace("https://www.random.org/widgets/", "Random", "", extraLinks);

enlace("https://rarefilmm.com/", "Rarefilmm", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://redalyc.org/", "Redalyc", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.reddit.com/", "Reddit", "redes sociales network", extraLinks);

enlace("https://www.refseek.com/", "Refseek", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://rentry.co/megathread", "Piracy megathread on Rentry.co", "torrents magnet descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles ver películas peliculas series watch full movies cinema escuchar listen música musica", extraLinks);

enlace("http://repec.org/", "RePEc", "Research Papers Economics buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://saucenao.com/", "SauceNAO", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://saveinsta.app/", "SaveInsta", "instagram downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://scanapp.org/", "ScanApp", "código codigo qr code scanner reader", extraLinks);

enlace("https://sci-hub.se/", "Sci-Hub", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://scielo.org/", "Scielo", "Scientific Electronic Library Online buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.science.gov/", "Science.gov", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.scimagojr.com/", "SCImago", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://sclouddownloader.net/", "ScloudDownloader", "soundcloud downloader escuchar listen descargar música musica gratis full free piracy piratería pirateria", extraLinks);

enlace("https://www.scopus.com/", "Scopus", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.scribbr.es/detector-de-plagio/generador-apa/", "Scribbr APA generator", "academic school scholar escuela documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.sejda.com/", "Sejda", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://seriespapaya.club/", "Series Papaya", "ver películas peliculas series completas gratis watch full free download movies descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://www.shazam.com/", "Shazam", "escuchar listen música musica", extraLinks);

enlace("https://snapinsta.io/", "SnapInsta", "instagram youtube downloader descargar música musica vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://open.spotify.com/", "Spotify", "escuchar listen música musica", extraLinks);

enlace("https://spotifymate.com/", "SpotifyMate", "downloader descargar música musica", extraLinks);

enlace("https://link.springer.com/", "Springer Link", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://soundcloud.com/", "Soundcloud", "escuchar listen música musica", extraLinks);

enlace("https://ww1.streamm4u.ws/#", "StreamM4u", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://teams.microsoft.com/", "Teams", "academic school scholar escuela tareas homework", extraLinks);

enlace("https://web.telegram.org/k/", "Telegram", "redes sociales network mensajerías mensajerias intantáneas intantaneas", extraLinks);

enlace("https://www.televisiongratishd.com/", "Televisión gratis", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://thepiratebay.org/index.html", "The Pirate Bay", "torrents magnet descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles ver películas peliculas series watch full movies cinema escuchar listen música musica", extraLinks);

enlace("https://weather.com/", "The Weather Channel", "pronóstico pronostico el clima", extraLinks);

enlace("https://www.tiktok.com/", "TikTok", "redes sociales network vídeos videos", extraLinks);

enlace("https://tinypng.com/", "TinyPNG", "comprimir compressor imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.tumblr.com/", "Tumblr", "redes sociales network", extraLinks);

enlace("https://www.tvconexion.com/", "TV Conexion HD", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://x.com/", "X (Twitter)", "redes sociales network tuits", extraLinks);

enlace("https://twittervid.com/", "Twitter Vid", "twitter downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos", extraLinks);

enlace("https://www.typingclub.com/", "TypingClub", "utilities tools herramientas learn aprender escribir write", extraLinks);

enlace("https://www.urbandictionary.com/", "Urban Dictionary", "buscar search búqueda busqueda diccionario definición definicion qué significa que significa", extraLinks);

enlace("https://www.vepelis.com/", "VePelis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://verpeliculasonline.org/", "Vision", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://victorraulrr.info/", "Victor RaulRR", "descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.virustotal.com/", "VirusTotal", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://vocalremover.org/", "Vocal Remover and Isolation", "inteligencia artificial intelligence ia ai música musica audio", extraLinks);

enlace("https://wallhaven.cc/", "Wallhaven", "images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://wallhere.com/", "Wallhere", "images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://www.watermarkremover.io/", "Watermark Remover", "diseño gráfico graphic design edición editar imágenes quitar marca de agua imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://web.whatsapp.com/", "WhatsApp", "redes sociales network mensajería mensajeria intantánea intantanea", extraLinks);

enlace("https://www.office.com/launch/word?auth=2", "Word", "microsoft office 365 ofimática documents docs", extraLinks);

enlace("https://www.wordreference.com/", "Wordreference", "buscar search búqueda busqueda definición definicion diccionario sinónimos sinonimos antónimos antonimos palabras qué significa que significa", extraLinks);

enlace("https://www.worldcat.org/", "WorldCat", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://x2download.app/", "X2Download.app", "facebook youtube downloader descargar música musica vídeos videos reels", extraLinks);

enlace("https://xodo.com/", "Xodo", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://yandex.com/", "Yandex", "buscar search búsqueda", extraLinks);

enlace("https://yandex.com/images/", "Yandex Images", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://yandex.ru/images", "Yandex Images (ruso)", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://yt5s.io/en109/youtube-to-mp3", "YT5s.io", "youtube downloader descargar música musica vídeos videos", extraLinks);

enlace("https://z-lib.org/", "ZLibrary", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://ya.ru/", "Яндекс (Yandex ruso)", "buscar search búsqueda", extraLinks);