const navMenu = document.getElementById("sites_list");
const newSiteModal = document.getElementById("new_site_modal");
const siteNameInpt = document.getElementById("site_name");
const siteLinkInpt = document.getElementById("site_link");
const siteKeywrdsInpt = document.getElementById("site_keywords");

const sharingSite = window.location.search;

const urlParams = new URLSearchParams(sharingSite);

if (urlParams.get('link') != null){

    sharedSiteLink = urlParams.get("link");

    navMenu.classList.add("nav__li-submenu-ul_list");

    newSiteModal.classList.replace("hidden", "new_site_modal-form");

    siteLinkInpt.value = sharedSiteLink;

    siteNameInpt.focus();
}

// Background

homeImg = document.getElementById("home_img").getElementsByTagName("img")[0];

bckgrndInpt = document.getElementById("bckgrnd_sttng");

bckgrndInpt.addEventListener("input", ()=>{changeBackground(bckgrndInpt.value); location.reload();});

localStorage.getItem("bckgrnd") != null ?

    changeBackground(localStorage.getItem("bckgrnd") ) :

homeImg.src = "";

function isEmptyOrSpaces (str) {

    return str == null || str.match(/^\s*$/) !== null;
}

function changeBackground (url){

    switch (url.includes("http") ){

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

    .catch(err => console.log('Solicitud fallida', err) );
});

// Nickname

const nickName = document.getElementById("nick_sttng");

const searchInpt = document.getElementById("google-search");

nickName.addEventListener("blur", ()=>{

    newNick = nickName.value;

    if (isEmptyOrSpaces(newNick) ){

        localStorage.removeItem("user");

        return location.reload();
    }

    if (newNick != localStorage.getItem("user") ){

        localStorage.setItem("user", nick);

        return location.reload();
    }

    return
});

switch (localStorage.getItem("user") ){

    case null:

        searchInpt.placeholder = "¿Buscas películas, música o libros?";

    break;

    default:

        nickName.value = localStorage.getItem("user");

        searchInpt.placeholder = "¡Hola, " + nickName.value + "!";

    break;
}

// Menus

const navBtn = document.getElementById('nav_btn');
const navListBtn = document.getElementById('nav_btn-list');
const profileNavBtn = document.getElementById('nav_profile_btn');
const resultsBoxC = document.getElementById("results_box_container");
const results = document.getElementById("results_box");
const profileNavMenu = document.getElementById("profile_menu");
const fullScreenBtn = document.getElementById("full_screen_btn");
const home = document.querySelector(".home");

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

function showHideNav(){

    navMenu.classList.toggle("block");
    navMenu.classList.remove("hide");
    navMenu.classList.remove("nav__li-submenu-ul_list");

    profileNavMenu.classList.replace("block", "hide");
}

// CLOCK

const clockSttng = document.getElementById("clock_sttng");

clockSttng.addEventListener("input", ()=>{

    if (clockSttng.checked){

        localStorage.setItem("clock", "true");

        return location.reload();
    }

    localStorage.removeItem("clock");

    return location.reload();
} );

if (localStorage.getItem("clock") != null){

    clockSttng.checked = true;

    createClock();
}

const clockContainer = document.getElementById("clock");

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

const today = new Date();

currentMonth = today.getMonth();
currentYear = today.getFullYear();

const selectYear = document.getElementById("year");

selectYear.addEventListener("input", jump);

const selectMonth = document.getElementById("month");

selectMonth.addEventListener("input", jump);

selectYear.value = currentYear;

selectMonth.value = selectMonth;

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const monthAndYear = document.getElementById("monthAndYear");

function next(){

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    
    currentMonth = (currentMonth + 1) % 12;
    
    showCalendar(currentMonth, currentYear);
}

function previous(){

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    
    showCalendar(currentMonth, currentYear);
}

function jump(){

    currentYear = parseInt(selectYear.value);

    currentMonth = parseInt(selectMonth.value);

    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year){

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

    for (let i = 0; i < 6; i++){ // creates a table row

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
function daysInMonth(iMonth, iYear){

    return 32 - new Date(iYear, iMonth, 32).getDate();
}

let firstDay = (new Date(year, month) ).getDay();

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

// FAVORITES

const favoritesSttng = document.getElementById("favorites_sttng");
const favoritesRow = document.getElementById("favorites_menu");

if (localStorage.getItem("hideFavorites") ){

    favoritesRow.classList.add("hidden");

    favoritesSttng.checked = false;
}else{

    favoritesRow.classList.remove("hidden");

    if (favoritesRow.scrollWidth > favoritesRow.clientWidth){

        favoritesRow.style.justifyContent = "flex-start";
    }
}

favoritesSttng.addEventListener("click", ()=>{

    favoritesSttng.checked ? localStorage.setItem("hideFavorites", "true") : localStorage.removeItem("hideFavorites");

    location.reload();
});

const deleteFavorites = document.getElementById("delete_favorites");

if (localStorage.getItem("favorites") != null){

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

        if (deleteFavorites.value == "all"){

            let favoritesAlert = confirm("¿Estás seguro de que quieres quedarte sin favoritos?");

            if (favoritesAlert){

                localStorage.removeItem("favorites");

                return location.reload();
            }

            return deleteFavorites.value = '';
        }

        let favoriteAlert = confirm("Estás apunto de eliminar: " + deleteFavorites.value);

        if (favoriteAlert){

            favs.splice(favs.indexOf(deleteFavorites.value), 1 );

            newFavs = favs.join(";;;");

            newFavs.length > 0 ? localStorage.setItem("favorites", newFavs) : localStorage.removeItem("favorites");

            return location.reload();
        }

        return deleteFavorites.value = '';
    });
}

// HISTORY

const historySttng = document.getElementById("history_sttng");

if (localStorage.getItem("history") == "noHistory"){

    historySttng.checked = false;
}

historySttng.addEventListener("click", ()=>{

    if (historySttng.checked){

        localStorage.removeItem("history");

        return location.reload();
    }

    localStorage.setItem("history", "noHistory");

    return location.reload();
});

// SEARCH ENGINES

const addSearchEngine = document.getElementById("add_search_engine");
const SearchEngineModal = document.getElementById("new_search_engine_modal");

addSearchEngine.addEventListener("click", ()=>{

    SearchEngineModal.classList.replace("hidden", "new_search_engine_modal-form");

    window.scrollTo(0, 0);

    profileNavMenu.classList.add("ovrflw_hddn");

    document.getElementById("search_engine_name").focus();
});

const cancelSearchEngine = document.getElementById("cancel-search_engine");

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

const addSEBtn = document.getElementById("cache_search_engine");

addSEBtn.addEventListener("click", ()=>{

    const newSEName = document.getElementById("search_engine_name").value;
    const newSELink = document.getElementById("search_engine_link").value;

    cachedSearchEngines = '';

    if (localStorage.getItem("search_engines") ){

        cachedSearchEngines = localStorage.getItem("search_engines") + ',';
    }

    localStorage.setItem("search_engines", cachedSearchEngines + newSEName + ";;;" + newSELink);

    return location.reload();
});

const deleteSearchEngines = document.getElementById("delete_search_engines");
const searchEngineMenu = document.getElementById("s_engine");

if (localStorage.getItem("search_engines") != null){

    let searchEngines = localStorage.getItem("search_engines");

    engines = searchEngines.split(",");

    engines.forEach(e => {

        if (e.length > 0) {

            let option = document.createElement("option");

            option.setAttribute("value", e);

            deleteSearchEngines.appendChild(option);

            option.innerText = e.split(";;;")[0];
        }
    });

    deleteSearchEngines.addEventListener("input", ()=>{

        if (deleteSearchEngines.value == "all"){

            let enginesAlert = confirm("¿Estás seguro de que quieres borrar tus buscadores?");

            if (enginesAlert){

                localStorage.removeItem("search_engines");

                localStorage.removeItem("searchEngine");

                return location.reload();
            }

            return deleteSearchEngines.value = '';
        }

        let engineAlert = confirm("Estás apunto de eliminar: " + deleteSearchEngines.value.split(";;;")[0]);

        if (engineAlert){

            engines.splice(engines.indexOf(deleteSearchEngines.value), 1 );

            newEngines = engines.join(",");

            newEngines.length > 0 ? localStorage.setItem("search_engines", newEngines) : localStorage.removeItem("search_engines");

            localStorage.removeItem("searchEngine");

            return location.reload();
        }

        return deleteSearchEngines.value = '';
    });
}

// PROFILE SETTINGS

const profileSttngs = document.getElementById("profile_settings");
const exportConfigBtn = document.getElementById("export_config");
const importConfig = document.getElementById("import_config");
const deleteConfigBtn = document.getElementById("delete_config");
const importConfigLabel = document.getElementById("import_config_label");
const moveToProfileBttns = ()=> profileNavMenu.scrollTo(0, profileNavMenu.scrollHeight);

importConfigLabel.addEventListener("dragover", (e)=> e.preventDefault() );

importConfigLabel.addEventListener("drop", (e)=>{

    e.preventDefault();

    item = e.dataTransfer.items[0];

    if (item.kind === "file") {

        file = item.getAsFile();

        toHandleConfigFile(file);
    }
});

importConfig.addEventListener("input", ()=>{

    file = importConfig.files[0];

    toHandleConfigFile(file);
});

deleteConfigBtn.addEventListener("click", ()=>{

    conf = window.confirm("¡Estás a punto de eliminar tu configuración!");

    if (conf){

        localStorage.clear();

        return location.reload();
    }

    return
});

profileSttngs.addEventListener("input", ()=>{

    switch (profileSttngs.value){

        case "export":

            content = JSON.stringify(localStorage);

            encryptedData = CryptoJS.AES.encrypt(content, "GooStav"); // "GooStav" is the passphrase

            exportConfigBtn.href = "data:application/octet-stream," + encodeURIComponent(encryptedData.toString() );

            exportConfigBtn.download = nickName.value + "_" + "gsconf.json";

            exportConfigBtn.style.display = "inline-block";

            moveToProfileBttns();
        break;

        case "import":

            importConfigLabel.style.display = "inline-block";

            moveToProfileBttns();
        break;

        case "delete":

            deleteConfigBtn.style.display = "inline-block";

            moveToProfileBttns();
        break;
    }
});

function toHandleConfigFile(file){

    reader = new FileReader();

    reader.addEventListener("load", ()=>{

        val = reader.result;

        if (isEmptyOrSpaces(val) == false){

            decryptedData = CryptoJS.AES.decrypt(val, "GooStav");

            dataString = decryptedData.toString(CryptoJS.enc.Utf8);

            profile = JSON.parse(dataString);

            profileKeys = Object.keys(profile);

            profileValues = Object.values(profile);

            localStorage.clear();

            for (let i = 0; i < profileKeys.length; i++) {

                localStorage.setItem(profileKeys[i], profileValues[i]);
            }

            return location.reload();
        }
    });

    reader.readAsText(file);

    return
}

// SHORTCUTS MENU

function element(etiqueta, atributo, valor, texto){

    let newElement = document.createElement(etiqueta);

    atributo != "" ? newElement.setAttribute(atributo, valor) : false;

    etiqueta == "div" ? newElement.setAttribute("class", "nav__submenu-element-section") : false;

    navMenu.appendChild(newElement);

    if (etiqueta == 'a'){

        let newAnchor = document.createElement("div");

        newAnchor.setAttribute("class", "nav__submenu-element");

        newElement.appendChild(newAnchor);

        let newAnchorName = document.createElement("p");

        newAnchorName.setAttribute("title", texto);

        newAnchor.appendChild(newAnchorName);

        newAnchorName.innerText = texto;

        return
    }

    newElement.innerText = texto;

    return
}

element("button", "class", "mas-de-google", "Añadir sitio");

masSites = document.querySelector(".mas-de-google");

masSites.style.display = "inline-block";

masSites.addEventListener("click", ()=>{

    window.scrollTo(0, 0);

    newSiteModal.classList.replace("hidden", "new_site_modal-form");

    navMenu.classList.add("ovrflw_hddn");

    return siteNameInpt.focus();
});

cancel = document.getElementById("cancel");

cancel.addEventListener("click", closeSiteForm);

function closeSiteForm(){

    siteNameInpt.value = "";

    siteLinkInpt.value = "";

    siteKeywrdsInpt.value = "";

    newSiteModal.classList.replace("new_site_modal-form", "hidden");

    return navMenu.classList.remove("ovrflw_hddn");
}

newSiteModal.addEventListener("keydown", (e)=>{

    if (e.key == "Tab"){

        return e.preventDefault();
    }

    return
});

const addSiteBtn = document.getElementById("cache_site");

addSiteBtn.addEventListener("click", addSite);

element("a", "href", "chess/index.html", "Ajedrez");
element("a", "href", "calculator/index.html", "Calculadora");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");

const linksGroup = document.getElementsByClassName("nav__submenu-element-section");

const userLinks = linksGroup[0];

userLinks.classList.add("user_links");

const googleLinks = linksGroup[1];
const extraLinks = linksGroup[2];

function enlace(address, text, keyWords, zone){

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

    if (zone == userLinks){

        let del = document.createElement("span");

        del.setAttribute("class", "delete_site");

        del.setAttribute("data-address", address);

        del.setAttribute("data-site", text);

        del.setAttribute("data-keywords", keyWords);

        zone.appendChild(del);

        del.innerText = "x";
    }
    return
}

enlace("", "", "", userLinks);

userLinks.getElementsByTagName("a")[0].style = "display: none !important;";

if (localStorage.getItem("bookmarks") == null){

    enlace("./", "Aquí verás tus sitios", "", userLinks);
}else{

    bookmarks = localStorage.getItem("bookmarks");

    sites = bookmarks.split(',');

    sites.forEach(e =>{

        ePrprts = e.split(";;;");

        e.length > 8 ? enlace(ePrprts[0], ePrprts[1], ePrprts[2], userLinks) : false;
    });

    userLinks.addEventListener("click", (e)=>{

        if (e.target.className == "delete_site"){

            dataSets = [

                e.target.dataset.address,
                e.target.dataset.site,
                e.target.dataset.keywords
            ]

            let conf = window.confirm("Estás a punto de borrar: " + dataSets[1]);

            if (conf){

                sites.splice(sites.indexOf(dataSets.join(";;;") ), 1);

                sites.length > 0 ? localStorage.setItem("bookmarks", sites.toString() ) : localStorage.removeItem("bookmarks");

                return window.location.reload();
            }
        }
        return
    });
}

function addSite(){

    if (isEmptyOrSpaces(siteNameInpt.value) || isEmptyOrSpaces(siteLinkInpt.value) || isEmptyOrSpaces(siteKeywrdsInpt.value) ){

        return window.alert("Por favor, asegúrate de rellenar todos los campos");
    }

    newBookmark = [

        siteLinkInpt.value,

        siteNameInpt.value,

        siteKeywrdsInpt.value.replace(',', '').toLowerCase()
    ];

    enlace(newBookmark[0], newBookmark[1], newBookmark[2], userLinks);

    newBookmark = newBookmark.join(";;;");

    if (localStorage.getItem("bookmarks") == null){

        localStorage.setItem("bookmarks", newBookmark);

        return location.reload();
    }

    sites.push(newBookmark);

    localStorage.setItem("bookmarks", sites);

    return location.reload();
}

//    GOOGLE LINKS    //

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

enlace("https://www.youtube.com/", "YouTube", "ver watch vídeos videos música", googleLinks);

enlace("https://about.google/intl/es-419/products/", "Más de Google", "mas", googleLinks);

//    USER LINKS    //

enlace("https://123apps.com/", "123Apps", "utilities tools herramientas pdf word excel converter convertir conversión editar edición recortar imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img videos vídeos ecualizar audio equalizer eq ppt font tipografía files archivos ebook libros extractor extraer", extraLinks);

enlace("https://9xbuddy.xyz/", "9xbuddy", "movies downloader descargar vídeos videos películas peliculas piratería pirateria piracy", extraLinks);

enlace("https://www.academia.edu/", "Academia.edu", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://www.elacervo.com/directores", "Acervo Fílmico Digital", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.adobe.com/mx/acrobat/online/compress-pdf.html", "Adobe Acrobat Compressor", "comprimir pdf reducir documentos documents docs", extraLinks);

enlace("https://www.alamy.com/", "Alamy", "download descargar vídeos videos imágenes 360-degree imagenes pics pictures fotos photos buscar búsqueda search creative content contenido creativo vectors vectores artists artistas artes", extraLinks);

enlace("https://allcalidad.re/", "AllCalidad", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

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

enlace("https://sur.ly/o/cinefiliamalversa.blogspot.com.ar/AA000014?pageviewId=desktop-302e36363034343030302031363638383031373733203438303533313335", "Cinéfila Malversa", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://cinestentativos.com/", "CinesTentativos", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://ciudadseva.com/", "Ciudad Seva", "escritor Luis López Lopez Nieves biblioteca digital library cuentos poemas minicuentos aforismo teatro arte", extraLinks);

enlace("https://cloudconvert.com/", "CloudConvert", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://convertio.co/", "Convertio", "utilities tools herramientas pdf word excel converter convertir conversión imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img mp4 mp3 videos vídeos audio ppt files archivos ebook libros", extraLinks);

enlace("https://cuevana3.ch/", "Cuevana3", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.deepl.com/es/translator", "Deepl", "translate languages traducir idiomas", extraLinks);

enlace("https://www.deviantart.com", "DeviantArt", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://dialnet.unirioja.es/", "Dialnet", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://discord.com/", "Discord", "gaming gameplays videocalls videollamadas videoconferencias video-conferencias reuniones virtuales redes sociales networks", extraLinks);

enlace("https://duckduckgo.com/", "Duckduckgo", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.ebiblioteca.org/lecturas/", "eBiblioteca", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.ecosia.org/", "Ecosia", "buscar search búsqueda", extraLinks);

enlace("https://www.espaebook2.com/", "ERIC", "Education Resources Information Center buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.espaebook2.com/", "EspaEbook", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://excalidraw.com/", "Excalidraw", "whiteboard pizarra pizarrón pizarron diagramas dibujar drawing", extraLinks);

enlace("https://f-droid.org/en/packages/", "F-Droid", "descargar software libre open source gratis free download apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.facebook.com/", "Facebook", "redes sociales networks", extraLinks);

enlace("https://fdown.net/", "FDOWN", "facebook downloader descargar vídeos videos", extraLinks);

enlace("https://fakeupdate.net/", "Fake Update Screens", "actualización actualizacion falsa", extraLinks);

enlace("https://gatonplayseries.com/", "GatonPlaySeries", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://github.com/AlanIMorgan/GooS_tav", "GitHub", "code código codigo deveopers programación programacion", extraLinks);

enlace("https://gnula2.org/", "Gnula2", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("http://gnula.me", "Gnula.me", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://gnula.nu/", "Gnula", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://goostav.vercel.app/", "GooS_tav", "goostav buscar search búsqueda busqueda vercel", extraLinks);

enlace("https://www.guitars101.com/", "Guitars 101", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://hollymoviehd.cc/", "HollyMovieHD", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://igram.live/", "iGram", "instagram downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://www.iloveimg.com/", "I love IMG", "editar edición recortar convertir imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.ilovepdf.com/", "I love PDF", "editar edición convertir pdf word documentos documents docs", extraLinks);

enlace("https://www.bing.com/images/create", "Image Creator from Bing", "inteligencia artificial intelligence ia ai images imagenes img pics pictures photos fotos wallpapers jpg jpeg png webp", extraLinks);

enlace("https://imgur.com", "Imgur", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://app.inferkit.com/demo", "InferKit", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://archive.org/", "Internet Archive", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", extraLinks);

enlace("https://www.instagram.com/", "Instagram", "redes sociales networks photos gallery galería álbum album pics pictures images imágenes", extraLinks);

enlace("https://it-tools.tech/", "IT Tools", "utilities tools herramientas pdf converter convertir conversión font tipografía files archivos", extraLinks);

enlace("https://app.keeweb.info/", "KeeWeb", "password manager administrador contraseñas", extraLinks);

enlace("https://kupdf.net/", "KUPDF", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.last.fm/es/user/XaMadness", "Last.fm", "escuchar listen música musica recomendaciones recommendations", extraLinks);

enlace("https://libgen.li/", "Library Genesis", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.linkedin.com/in/alanmorgan-a/", "LinkedIn", "redes sociales networks trabajos empleos jobs oficios", extraLinks);

enlace("https://www.locopelis.com/", "LocoPelis", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://ww1.m4uhd.tv/", "M4uHD", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://www.malavida.com", "Malavida", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://www.maztr.com/audiotageditor", "Maztr", "música musica metadata tags editor mp3", extraLinks);

enlace("https://mega.nz/", "Mega", "almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.megadiscografiascompletas.com/", "Mega Discografías", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.mercadolibre.com.mx/", "Mercado Libre", "tienda shopping comprar compras e-commerce e commerce ecommerce ecomerce comercio", extraLinks);

enlace("https://www.messenger.com/", "Messenger", "facebook redes sociales network mensajería mensajeria intantánea intantanea", extraLinks);

enlace("https://mirandogratis.com/chungking-express.html", "Mirando Gratis", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://movieparadise.org/", "Moviesparadise", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://mqs.link/", "MQS Albums Download", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://tavasci3-musicrewind.blogspot.com/", "Music Rewind", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", extraLinks);

enlace("https://www.napster.com", "Napster", "escuchar listen música musica", extraLinks);

enlace("https://www.newgrounds.com/", "Newgrounds", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales juegos games comunidades redes sociales networks", extraLinks);

enlace("https://normas-apa.org/", "Normas APA", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://sites.google.com/cuaad.udg.mx/habilidadesentics/objetos-virtuales-de-aprendizaje/normas-apa?authuser=0", "Normas APA - Google For Education", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", extraLinks);

enlace("https://novamovie.net/", "Novamovie", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://ok.ru/", "Одноклассники", "redes sociales network vídeos videos ver watch películas peliculas completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://onedrive.live.com/", "OneDrive", "microsoft office 365 almacenamiento nube cloud storage almacenar", extraLinks);

enlace("https://www.newocr.com/", "Free Online OCR", "optical characters reader lector óptico caracteres", extraLinks);

enlace("https://outlook.live.com/", "Outlook", "microsoft office 365 correo electrónico mail email e-mail hotmail", extraLinks);

enlace("https://outlook.office.com/", "Outlook (institucional)", "microsoft office 365 correo electrónico empresarial mail email e-mail hotmail", extraLinks);

enlace("https://jspaint.app/", "PaintJS", "", extraLinks);

enlace("https://pastedownload.com/", "PasteDownload", "facebook youtube downloader descargar música musica vídeos videos reels", extraLinks);

enlace("https://pcwonderland.com/", "PC Wonderland", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", extraLinks);

enlace("https://www.pdfdrive.com/", "PDF Drive", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", extraLinks);

enlace("https://www.bajarpelisgratis.com/", "Pelis Gratis", "ver watch películas peliculas series completas gratis full free movies download descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://pelisplay.info/", "Pelisplus", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://photocall.tv", "Photocall tv", "ver watch canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://www.pinterest.com.mx/", "Pinterest", "imágenes imagenes images img pics pictures photos fotos wallpapers arte digital artists artistas digitales", extraLinks);

enlace("https://www.pixiv.net/", "Pixiv", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", extraLinks);

enlace("https://pixlr.com/", "Pixlr", "diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", extraLinks);

enlace("https://poesiamexa.wordpress.com", "Poesía Mexa", "", extraLinks);

enlace("https://www.qrcode-monkey.com/", "QRCode Monkey", "", extraLinks);

enlace("https://quillbot.com/", "QuillBot", "inteligencia artificial intelligence ia ai", extraLinks);

enlace("https://www.qwant.com/", "Qwant", "buscar search búsqueda privacidad privacy", extraLinks);

enlace("https://www.rae.es/biblioteca-digital", "RAE (biblioteca digital)", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs académicos academicos download free descargar gratis", extraLinks);

enlace("https://www.random.org/widgets/", "Random", "", extraLinks);

enlace("https://rarefilmm.com/", "Rarefilmm", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://redalyc.org/", "Redalyc", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://www.reddit.com/", "Reddit", "redes sociales network", extraLinks);

enlace("https://www.refseek.com/", "Refseek", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://rentry.co/megathread", "Piracy megathread on Rentry.co", "torrents magnet descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles ver watch películas peliculas series full movies cinema escuchar listen música musica", extraLinks);

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

enlace("https://seriespapaya.club/", "Series Papaya", "ver watch películas peliculas series completas gratis full free download movies descargar cinema piracy piratería pirateria", extraLinks);

enlace("https://www.shazam.com/", "Shazam", "escuchar listen música musica", extraLinks);

enlace("https://snapinsta.io/", "SnapInsta", "instagram youtube downloader descargar música musica vídeos videos imágenes imagenes pics pictures fotos photos reels", extraLinks);

enlace("https://open.spotify.com/", "Spotify", "escuchar listen música musica", extraLinks);

enlace("https://spotifymate.com/", "SpotifyMate", "downloader descargar música musica", extraLinks);

enlace("https://link.springer.com/", "Springer Link", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", extraLinks);

enlace("https://somosmovies.com/", "SomosMovies", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://soundcloud.com/", "Soundcloud", "escuchar listen música musica", extraLinks);

enlace("https://ww1.streamm4u.ws/#", "StreamM4u", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://teams.microsoft.com/", "Teams", "academic school scholar escuela tareas homework", extraLinks);

enlace("https://telegram.org/", "Telegram", "redes sociales network mensajerías mensajerias intantáneas intantaneas", extraLinks);

enlace("https://web.telegram.org/k/", "Telegram web", "redes sociales network mensajerías mensajerias intantáneas intantaneas", extraLinks);

enlace("https://www.televisiongratishd.com/", "Televisión gratis", "ver watch canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://thepiratebay.org/index.html", "The Pirate Bay", "torrents magnet descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles ver watch películas peliculas series full movies cinema escuchar listen música musica", extraLinks);

enlace("https://weather.com/", "The Weather Channel", "pronóstico pronostico el clima", extraLinks);

enlace("https://www.tiktok.com/", "TikTok", "redes sociales network vídeos videos", extraLinks);

enlace("https://tinypng.com/", "TinyPNG", "comprimir compressor imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", extraLinks);

enlace("https://www.tumblr.com/", "Tumblr", "redes sociales network", extraLinks);

enlace("https://www.tvconexion.com/", "TV Conexion HD", "ver watch canales televisión gratis watch tv free television channels piatería pirateria piracy", extraLinks);

enlace("https://x.com/", "X (Twitter)", "redes sociales network tuits", extraLinks);

enlace("https://twittervid.com/", "Twitter Vid", "twitter downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos", extraLinks);

enlace("https://www.typingclub.com/", "TypingClub", "utilities tools herramientas learn aprender escribir write", extraLinks);

enlace("https://www.urbandictionary.com/", "Urban Dictionary", "buscar search búqueda busqueda diccionario definición definicion qué significa que significa", extraLinks);

enlace("https://www.vepelis.com/", "VePelis", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://verpeliculasonline.org/", "Vision", "ver watch películas peliculas series completas gratis full free movies cinema piracy piratería pirateria", extraLinks);

enlace("https://victorraulrr.info/", "Victor RaulRR", "descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android celulares smartphones teléfonos telefonos mobiles móviles moviles", extraLinks);

enlace("https://www.virustotal.com/", "VirusTotal", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android descargar programas gratis full free download apps apks", extraLinks);

enlace("https://vocalremover.org/", "Vocal Remover watch and Isolation", "inteligencia artificial intelligence ia ai música musica audio", extraLinks);

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