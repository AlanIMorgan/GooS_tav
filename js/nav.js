navMenu = document.querySelector(".nav__li-submenu-ul");

newSiteModal = document.getElementById("new_site_modal");

const sharingSite = window.location.search;

const urlParams = new URLSearchParams(sharingSite);

switch (urlParams.get('link')) {

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

bckgrndInpt.addEventListener("input", changeBackground);

switch (localStorage.getItem("bckgrnd")) {

    case " ":
    case "":
    case null:

        resetBackground();

    break;

    default:

        bckgrndInpt.value = localStorage.getItem("bckgrnd");

        changeBackground();
    break;
}

function isEmptyOrSpaces (str) {

    return str == null || str.match(/^\s*$/) !== null;
}

function changeBackground() {

    imgUrl = bckgrndInpt.value;

    switch ( isEmptyOrSpaces(imgUrl) || !imgUrl.includes("http") ) {

        case false:

            homeImg.src = imgUrl;

            document.getElementById("img_mask").classList.remove("img_mask");

            document.getElementById("home__bckgrnd").classList.remove("home__bckgrnd");

            localStorage.setItem("bckgrnd", imgUrl);

        break;

        default:

            localStorage.setItem("bckgrnd", imgUrl);

            toExport();

            resetBackground();

        break;
    }
}

function resetBackground() {

    homeImg.src = "";

    document.getElementById("img_mask").classList.add("img_mask");

    document.getElementById("home__bckgrnd").classList.add("home__bckgrnd");
}


document.getElementById("random_wpp").addEventListener("click", ()=>{

    resolution = window.innerWidth + "x" + window.innerHeight;
    
    switch ( bckgrndInpt.value.includes("&lasttry=") ) {

        case false:

            fetch("https://source.unsplash.com/random/" + resolution + "/?night&lasttry=0")

            .then(response => {

                bckgrndInpt.value = response.url + "&lasttry=0";

                changeBackground();
            })

            .catch(err => console.log('Solicitud fallida', err));
        break;

        default:

            bckgrndValueSplit = bckgrndInpt.value.split("lasttry=");

            lasttry = parseInt( bckgrndValueSplit[1] ) + 1;

            fetch("https://source.unsplash.com/random/" + resolution + "/?night&lasttry=" + lasttry)

            .then(response => {

                bckgrndInpt.value = response.url + "&lasttry=" + lasttry;

                changeBackground();
            })

            .catch(err => console.log('Solicitud fallida', err));

        break;
    }
});

// Nickname

nickName = document.getElementById("nick_sttng");

searchInpt = document.getElementById("google-search");

nickName.addEventListener("blur", changeNick);

switch (localStorage.getItem("user")) {

    case " ":
    case "":
    case null:

        searchInpt.placeholder = "¡Hola, extraño! Intenta buscar películas, música, libros, etc...";

    break;

    default:

        nickName.value = localStorage.getItem("user");

        changeNick();

    break;
}

function changeNick() {

    nick = nickName.value;

    switch ( isEmptyOrSpaces(nick) ) {

        case false:

            resetNick();

            localStorage.setItem("user", nick);

        break;

        default:

            searchInpt.placeholder = "¡Hola, " + nick + "! Intenta buscar películas, música, libros, etc...";

            localStorage.setItem("user", nick);

        break;
    }
}

function resetNick() {

    searchInpt.placeholder = "¡Hola, extraño!";
}

// Menus

navBtn = document.getElementById('nav_btn');
navListBtn = document.getElementById('nav_btn-list');
profileNavBtn = document.getElementById('nav_profile_btn');
resultsBoxC = document.querySelector(".results_box_container");
results = document.querySelector(".results_box");
profileNavMenu = document.querySelector(".nav__submenu-profile");
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

            localStorage.setItem("clock", "false");
        
            location.reload();

        break;

        default:

            localStorage.setItem("clock", "true");
        
            location.reload();

        break;
    }
} );

switch ( localStorage.getItem("clock") ) {

    case null:

    break;

    default:

        isClockTrue = localStorage.getItem("clock") == "true";

        if (isClockTrue) {

            clockSttng.checked = true;

            createClock();
        }

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

        if (hrs == "00"|| 00 || 0) {

            hrs = 12;
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

// Show/hide history

historySttng = document.getElementById("history_sttng");

switch (localStorage.getItem("history")) {

    case null:

    break;

    default:

        switch (localStorage.getItem("history") == "noHistory") {
            
            case false:

            break;
            
            default:

                historySttng.checked = false;

            break;
        }

    break;
}

historySttng.addEventListener("click", showHideHistory);

function showHideHistory() {

    setTimeout(()=>{

        switch (historySttng.checked) {

            case false:

                localStorage.setItem("history", "noHistory");

                location.reload();

            break;

            default:

                localStorage.removeItem("history");

                location.reload();

            break;
        }
    }, 125);
}

addSearchEngine = document.getElementById("add_search_engine");

SearchEngineModal = document.getElementById("new_search_engine_modal");

addSearchEngine.addEventListener("click", ()=>{

    window.scrollTo(0, 0);
    SearchEngineModal.classList.replace("hidden", "new_search_engine_modal-form");
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

    console.log(newSEName + ";;;" + newSELink);

    switch ( localStorage.getItem("search_engines") ) {

        case null:

            localStorage.setItem("search_engines", newSEName + ";;;" + newSELink);

            location.reload();

        break;

        default:

            cachedSearchEngines = localStorage.getItem("search_engines");

            localStorage.setItem("search_engines", cachedSearchEngines + "," + newSEName + ";;;" + newSELink);

            location.reload();

        break;
    }
});

// Export / import profile settings

function toExport() {

    content = JSON.stringify(localStorage);

    exportConfig = document.getElementById("export_config");

    exportConfig.href = "data:application/octet-stream," + encodeURIComponent(content);

    exportConfig.download = nickName.value + "_" + "gsconf.json";
}

toExport();

importConfig = document.getElementById("import_config");

importConfig.addEventListener("input", ()=>{

    file = importConfig.files[0];

    const reader = new FileReader();

    reader.addEventListener("load", ()=>{

        val = reader.result;

        switch ( val.includes("{") && val.includes("}") ) {

            case false:

            break;

            default:

                profile = JSON.parse(val);

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

    switch (file) {

        case null:

        break;

        default:

            reader.readAsText(file);
        break;
    }
});

deleteConfig = document.getElementById("delete_config");

deleteConfig.addEventListener("click", ()=>{

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

// Shortcuts menu

function element(etiqueta, atributo, valor, texto) {

    let newElement = document.createElement(etiqueta);

    if (atributo != "") {

        newElement.setAttribute(atributo, valor);}

    if (etiqueta == "div") {

        newElement.setAttribute("class", "nav__submenu-element-section");
    }

    navMenu.appendChild(newElement);

    if (etiqueta !== "a") {

        newElement.innerText = texto;
    }

    else {

        let newAnchor = document.createElement("div");

        newAnchor.setAttribute("class", "nav__submenu-element");

        newElement.appendChild(newAnchor);

        let newAnchorName = document.createElement("p");

        newAnchorName.setAttribute("title", texto);

        newAnchor.appendChild(newAnchorName);
        
        newAnchorName.innerText = texto;
    }
}

element("button", "class", "mas-de-google", "Añadir sitio");

masSites = document.querySelector(".mas-de-google");

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

element("a", "href", "matrix/index.html", "Salvapantallas");

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

    words.innerText = keyWords;

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

switch ( localStorage.getItem("bookmarks") ) {

    case null:

        enlace("./", "Aquí aparecerán tus sitios", ".", userLinks);

    break;

    default:

        bookmarks = localStorage.getItem("bookmarks");

        sites = bookmarks.split(',');

        for (let i = 0; i < sites.length; i++) {

            let e = sites[i];

            switch (e.length > 9) {

                case false:

                break;

                default:

                    ePrprts = e.split(';;;');

                    enlace(ePrprts[0], ePrprts[1], ePrprts[2], userLinks);

                break;
            }
        }

        deleteBtns = document.getElementsByClassName("delete_site");

        for (let i = 0; i < deleteBtns.length; i++) {

            deleteBtns[i].addEventListener("click", ()=>{

                dataSets = deleteBtns[i].dataset.address + ";;;" + deleteBtns[i].dataset.site + ";;;" + deleteBtns[i].dataset.keywords;

                dataSetsSplitted = dataSets.split(";;;");

                let conf = window.confirm("Estás a punto de borrar: " + dataSetsSplitted[1]);

                switch (conf) {

                    case false:

                    break;

                    default:

                        splittedBkmrks = bookmarks.split(dataSets);

                        switch (splittedBkmrks[0].length > 9) {

                            case false:

                                bkmrksUpdated = splittedBkmrks[1];

                            break;

                            default:

                                switch (splittedBkmrks[1].length > 9) {

                                    case false:

                                        bkmrksUpdated = splittedBkmrks[0];

                                    break;

                                    default:

                                        bkmrksUpdated = splittedBkmrks[0] + splittedBkmrks[1];

                                    break;
                                }

                            break;
                        }

                        bkmrksFixed = bkmrksUpdated.replace(",,", ",");

                        switch (bkmrksFixed.length > 9) {

                            case false:

                                localStorage.removeItem("bookmarks");

                            break;

                            default:

                                localStorage.setItem("bookmarks", bkmrksFixed);

                            break;
                        }

                        window.location.reload();

                    break;
                }
            });
        }

    break;
}

function addSite() {

    let newSiteName = document.getElementById("site_name").value;

    let newSiteLink = document.getElementById("site_link").value;

    let newSiteKw = document.getElementById("site_keywords").value;

    switch ( isEmptyOrSpaces(newSiteName) || isEmptyOrSpaces(newSiteLink) || isEmptyOrSpaces(newSiteKw) ) {

        case false:

            siteName = document.getElementById("site_name").value;

            siteLink = document.getElementById("site_link").value;

            siteKeywords = document.getElementById("site_keywords").value.toLowerCase();

            enlace(siteLink, siteName, siteKeywords, userLinks);

            newBookmark = [

                siteLink + ";;;" + siteName + ";;;" + siteKeywords
            ];

			switch (localStorage.getItem("bookmarks")) {

				case null:

					localStorage.setItem("bookmarks", newBookmark);

                    location.reload();

				break;

				default:

                    sites.push(newBookmark);

                    localStorage.setItem("bookmarks", sites);

                    location.reload();

				break;
			}

            closeSiteForm();

            document.getElementById("site_name").value = "";

            document.getElementById("site_link").value = "";

            document.getElementById("site_keywords").value = "";

        break;

        default:

            window.alert("Por favor, asegúrate de rellenar todos los campos");

        break;
    }
}

//    Extra elements    //

// enlace("conway/index.html", "Conway's game of life", userLinks);

// enlace("pac-man/index.html", "Pac-Man", userLinks);

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

enlace("https://www.adobe.com/mx/acrobat/online/compress-pdf.html", "Adobe Acrobat Compressor", "comprimir pdf reducir documentos documents docs", extraLinks);

enlace("https://www.amazon.com/", "Amazon", "tienda shopping comprar compras e-commerce e commerce ecommerce ecomerce comercio", extraLinks);

enlace("https://express.adobe.com/", "Adobe Express", "photoshop diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://web.airdroid.com/", "AirDroid", "android mobile devices smartphones manager dispositivos móviles celulares teléfonos telefonos remote control access acceso remoto remota llamadas mensajes calls sms find encontrar transferir send enviar pc computer computadora share screen compartir pantalla files archivos apps applications aplicaciones apks notificaciones notifications", extraLinks);

enlace("https://webcast.airdroid.com", "AirDroid Cast", "android mobile devices smartphones dispositivos móviles celulares teléfonos telefonos remote access acceso remoto share screen compartir pantalla", extraLinks);

enlace("https://alphacoders.com/", "Alpha Coders", "images imagenes imágenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://www.artistapirata.com/", "Artista Pirata", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", extraLinks);

enlace("https://www.artstation.com", "ArtStation", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://Baidu.com/", "Baidu", "buscar search búsqueda", extraLinks);

enlace("https://bandcamp.com/", "Bandcamp", "escuchar listen música musica", extraLinks);

enlace("https://www.base-search.net/", "BASE", "Bielefeld Academic Search Engine buscar búsqueda escuela school scholar escuela ensayos books libros documentos docs pdfs tareas académicos academicos", extraLinks);

enlace("https://becasmexico.org/becas-para-universitarios/", "Becas México", "", extraLinks);

enlace("https://becassubes.com/", "Becas SUBES", "", extraLinks);

enlace("https://www.behance.net/", "Behance", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://www.bing.com/", "Bing", "buscar search búsqueda", extraLinks);

enlace("https://www.bioline.org.br/", "Bioline", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos health salud medicine medicina enfermedades epidemiología biología biologia biologic medio ambiente biodiversidad biodiversity", extraLinks);

enlace("https://www.canva.com/", "Canva", "diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://chat.openai.com/", "ChatGpt", "inteligencia artificial intelligence ia ai búsqueda buscar search", extraLinks);

enlace("https://sur.ly/o/cinefiliamalversa.blogspot.com.ar/AA000014?pageviewId=desktop-302e36363034343030302031363638383031373733203438303533313335", "Cinéfila Malversa", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://cloudconvert.com/", "CloudConvert", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://convertio.co/", "Convertio", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://www.deepl.com/es/translator", "Deepl", "translate languages traducir idiomas", extraLinks);

enlace("https://www.deviantart.com", "DeviantArt", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://dialnet.unirioja.es/", "Dialnet", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://discord.com/", "Discord", "gaming gameplays videocalls videollamadas videoconferencias video-conferencias reuniones virtuales redes sociales networks", extraLinks);

enlace("https://duckduckgo.com/", "Duckduckgo", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.espaebook2.com/", "ERIC", "Education Resources Information Center buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.espaebook2.com/", "EspaEbook", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.ebiblioteca.org/lecturas/", "eBiblioteca", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.facebook.com/", "Facebook", "redes sociales networks", extraLinks);

enlace("https://fakeupdate.net/", "Fake Update Screens", "actualización actualizacion falsa", extraLinks);

enlace("https://gatonplayseries.com/", "GatonPlaySeries", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://github.com/AlanIMorgan/GooS_tav", "GitHub", "code código codigo deveopers programación programacion", extraLinks);

enlace("https://gnula2.org/", "Gnula2", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("http://gnula.me", "Gnula.me", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://gnula.nu/", "Gnula", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://goostav.vercel.app/", "GooS_tav", "goostav buscar search búsqueda busqueda vercel", extraLinks);

enlace("https://www.guitars101.com/", "Guitars 101", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://igram.live/", "iGram", "instagram downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://www.iloveimg.com/", "I love IMG", "editar edición recortar convertir imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.ilovepdf.com/", "I love PDF", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://imgur.com", "Imgur", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://app.inferkit.com/demo", "InferKit", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://archive.org/", "Internet Archive", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://www.instagram.com/", "Instagram", "redes sociales networks photos gallery galería álbum album pics pictures images imágenes", extraLinks);

enlace("https://app.keeweb.info/", "KeeWeb", "password manager administrador contraseñas", extraLinks);

enlace("https://kupdf.net/", "KUPDF", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://labahia.epizy.com/", "La Bahía Del Naufragio", "buscar búsqueda search academic school scholar escuela documentos documents docs pdfs tareas ensayos académicos academicos download free books descargar libros gratis filosofía epizy bahia piracy piratería pirateria", extraLinks);

enlace("https://www.last.fm/es/user/XaMadness", "Last.fm", "escuchar listen música musica recomendaciones recommendations", extraLinks);

enlace("https://libgen.li/", "Library Genesis", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.linkedin.com/in/alanmorgan-a/", "LinkedIn", "redes sociales networks trabajos empleos jobs oficios", extraLinks);

enlace("https://www.locopelis.com/", "LocoPelis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.malavida.com", "Malavida", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://www.maztr.com/audiotageditor", "Maztr", "música musica metadata tags editor mp3", extraLinks);

enlace("https://mega.nz/", "Mega", "almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.megadiscografiascompletas.com/", "Mega Discografías", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.messenger.com/", "Messenger", "facebook redes sociales network mensajería mensajeria intantánea intantanea", extraLinks);

enlace("https://mirandogratis.com/chungking-express.html", "Mirando Gratis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://mqs.link/", "MQS Albums Download", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://tavasci3-musicrewind.blogspot.com/", "Music Rewind", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.napster.com", "Napster", "escuchar listen música musica", extraLinks);

enlace("https://www.newgrounds.com/", "Newgrounds", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales juegos games comunidades redes sociales networks", extraLinks);

enlace("https://normas-apa.org/", "Normas APA", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://sites.google.com/cuaad.udg.mx/habilidadesentics/objetos-virtuales-de-aprendizaje/normas-apa?authuser=0", "Normas APA - Google For Education", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://onedrive.live.com/", "OneDrive", "microsoft office 365 almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.newocr.com/", "Free Online OCR", "optical characters reader lector óptico caracteres", extraLinks);

enlace("https://outlook.live.com/", "Outlook", "microsoft office 365 correo electrónico mail email e-mail", extraLinks);

enlace("https://outlook.office.com/", "Outlook (institucional)", "microsoft office 365 correo electrónico empresarial mail email e-mail", extraLinks);

enlace("https://jspaint.app/", "PaintJS", "", extraLinks);

enlace("https://pcwonderland.com/", "PC Wonderland", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", extraLinks);

enlace("https://www.pdfdrive.com/", "PDF Drive", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.bajarpelisgratis.com/", "Pelis Gratis", "ver películas peliculas series completas gratis watch full free movies download descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://photocall.tv", "Photocall tv", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://www.pinterest.com.mx/", "Pinterest", "imágenes imagenes images img pics pictures photos fotos wallpapers arte digital artists artistas digitales", extraLinks);

enlace("https://www.pixiv.net/", "Pixiv", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://poesiamexa.wordpress.com", "Poesía Mexa", "", extraLinks);

enlace("https://www.qrcode-monkey.com/", "QRCode Monkey", "", extraLinks);

enlace("https://quillbot.com/", "QuillBot", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://www.qwant.com/", "Qwant", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.random.org/widgets/", "Random", "", extraLinks);

enlace("https://redalyc.org/", "Redalyc", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.reddit.com/", "Reddit", "redes sociales network", extraLinks);

enlace("https://www.refseek.com/", "Refseek", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

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

enlace("https://seriespapaya.club/", "Series Papaya", "ver películas peliculas series completas gratis watch full free download movies descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://www.shazam.com/", "Shazam", "escuchar listen música musica", extraLinks);

enlace("https://snapinsta.io/", "SnapInsta", "instagram youtube downloader descargar música musica vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://open.spotify.com/", "Spotify", "escuchar listen música musica", extraLinks);

enlace("https://link.springer.com/", "Springer Link", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://soundcloud.com/", "Soundcloud", "escuchar listen música musica", extraLinks);

enlace("https://subes.becasbenitojuarez.gob.mx/", "SUBES", "becas", extraLinks);

enlace("https://teams.microsoft.com/_#/school/teams-grid/General?ctx=teamsGrid", "Teams", "academic school scholar escuela tareas homework", extraLinks);

enlace("https://web.telegram.org/k/", "Telegram", "redes sociales network mensajerías mensajerias intantáneas intantaneas", extraLinks);

enlace("https://www.televisiongratishd.com/", "Televisión gratis", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://thepiratebay.org/index.html", "The Pirate Bay", "torrents magnet descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles ver películas peliculas series watch full movies cinema escuchar listen música musica", extraLinks);

enlace("https://weather.com/", "The Weather Channel", "pronóstico pronostico el clima", extraLinks);

enlace("https://www.tiktok.com/", "TikTok", "redes sociales network vídeos videos", extraLinks);

enlace("https://tinypng.com/", "TinyPNG", "comprimir compressor imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.tumblr.com/", "Tumblr", "redes sociales network", extraLinks);

enlace("https://www.tvconexion.com/", "TV Conexion HD", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://mobile.twitter.com/", "Twitter", "redes sociales network tuits", extraLinks);

enlace("https://www.typingclub.com/", "TypingClub", "utilities tools herramientas learn aprender escribir write", extraLinks);

enlace("https://www.urbandictionary.com/", "Urban Dictionary", "buscar search búqueda busqueda diccionario qué significa que significa", extraLinks);

enlace("https://www.vepelis.com/", "VePelis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://verpeliculasonline.org/", "Vision", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://victorraulrr.info/", "Victor RaulRR", "descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.virustotal.com/", "VirusTotal", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://vocalremover.org/", "Vocal Remover and Isolation", "inteligencia artificial intelligence ia ai música musica audio", extraLinks);

enlace("https://wallhaven.cc/", "Wallhaven", "images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://wallhere.com/", "Wallhere", "images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://web.whatsapp.com/", "WhatsApp", "redes sociales network mensajería mensajeria intantánea intantanea", extraLinks);

enlace("https://www.office.com/launch/word?auth=2", "Word", "microsoft office 365 ofimática documents docs", extraLinks);

enlace("https://www.worldcat.org/", "WorldCat", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://x2download.app/", "X2Download.app", "facebook youtube downloader descargar música musica vídeos videos reels", extraLinks);

enlace("https://xodo.com/", "Xodo", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://yandex.com/", "Yandex", "buscar search búsqueda", extraLinks);

enlace("https://yandex.com/images/", "Yandex Images", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://yandex.ru/images", "Yandex Images (ruso)", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", extraLinks);

enlace("https://z-lib.org/", "ZLibrary", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://ya.ru/", "Яндекс (Yandex ruso)", "buscar search búsqueda", extraLinks);