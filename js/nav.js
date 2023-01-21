if ("Notification" in window) { /* 

    document.addEventListener('click', e => {
    
        Notification.requestPermission().then(permission => {

            if (permission === "granted") {

                console.log("The user accepted");

                const notification = new Notification("¡Gracias por aceptar las notificaciones!");
            }
        });
    }); */
}

navBtn = document.getElementById('nav_btn');
navListBtn = document.getElementById('nav_btn-list');
profileNavBtn = document.getElementById('nav_profile_btn');
navMenu = document.querySelector(".nav__li-submenu-ul");
linksGroup =  document.getElementsByClassName("nav__submenu-element-section");
extraLinks = linksGroup[0];
googleLinks = linksGroup[1];
userLinks = linksGroup[2];
resultsBoxC = document.querySelector(".results_box_container");
results = document.querySelector(".results_box");
profileNavMenu = document.querySelector(".nav__submenu-profile");
home = document.querySelector(".home");

navBtn.addEventListener("click", showHideNav);
navListBtn.addEventListener("click", showHideListNav);
profileNavBtn.addEventListener("click", showHideProfileNav);
home.addEventListener("click", hideMenus);

function showHideNav() {

    navMenu.classList.toggle("block");
    navMenu.classList.remove("hide");
    navMenu.classList.remove("nav__li-submenu-ul_list");

    profileNavMenu.classList.add("hide");
    profileNavMenu.classList.remove("block");
}

function showHideListNav() {

    navMenu.classList.toggle("nav__li-submenu-ul_list");
    navMenu.classList.remove("block");

    profileNavMenu.classList.add("hide");
    profileNavMenu.classList.remove("block");
}

function showHideProfileNav() {

    profileNavMenu.classList.toggle("block");
    profileNavMenu.classList.remove("hide");

    navMenu.classList.add("hide");
    navMenu.classList.remove("block");
    navMenu.classList.remove("nav__li-submenu-ul_list");
}

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

function hideMenus() {

    navMenu.classList.add("hide");
    profileNavMenu.classList.add("hide");
    
    navMenu.classList.remove("block");
    navMenu.classList.remove("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
}

class domElement {

    constructor (etiqueta, atributo, valor, texto) {

        this.etiqueta = etiqueta;
        this.atributo = atributo;
        this.texto = texto;
        this.valor = valor;
    }

    crear() {

        let newElement = document.createElement(this.etiqueta);
        
        if (this.atributo != "") {
            
            newElement.setAttribute(this.atributo, this.valor);}

        if (this.etiqueta == "div") {

            newElement.setAttribute("class", "nav__submenu-element-section");
        }

        navMenu.appendChild(newElement);
        
        newElement.innerText = this.texto;
    }
}

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
} /* 

const extraExtraLinks = new domElement("div", "", "", "");
extraExtraLinks.crear(); */

//    Extra links    //

/* 

enlace("chess/index.html", "Chess", extraLinks);

enlace("conway/index.html", "Conway's game of life", extraLinks); */

enlace("https://goostav.vercel.app/", "GooS_tav", "buscar search búsqueda vercel", extraLinks);

enlace("https://labahia.epizy.com/", "La Bahía Del Naufragio", "buscar búsqueda search academic school scholar escuela documentos documents docs pdfs tareas ensayos académicos academicos download free books descargar libros gratis filosofía epizy bahia piracy piratería pirateria", extraLinks); /* 

enlace("pac-man/index.html", "Pac-Man", extraLinks); */

//    Google links    //

enlace("https://www.google.com/", "Google", "buscar search búsqueda", googleLinks);

enlace("https://scholar.google.es/", "Google scholar", "search buscar búsqueda académica escolar academic school", googleLinks);

enlace("https://myaccount.google.com/", "Cuenta de google", "mi sesión session user usuario", googleLinks);

enlace("https://docs.google.com/", "Google Documentos", "ofimática word documents docs", googleLinks);

enlace("https://photos.google.com/", "Google Fotos", "photos gallery galería álbum album pics pictures images imágenes img jpg jpeg gif png webp wallpapers", googleLinks);

enlace("https://mail.google.com/mail/u/0/#all", "Gmail", "google correo electrónico mail email e-mail", googleLinks);

enlace("https://www.google.com/imghp", "Google Imágenes", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", googleLinks);

enlace("https://www.google.com/maps/", "Mapas", "google maps adress lugares", googleLinks);

enlace("https://news.google.com/", "Noticias", "google news", googleLinks);

enlace("https://play.google.com/store/", "Play Store", "google apps aplicaciones apks juegos games applications celulares smartphones teléfonos telefonos mobiles móviles android", googleLinks);

enlace("https://docs.google.com/spreadsheets", "Google Sheets", "docs documents documentos cálculo hojas excel contabilidad economía", googleLinks);

enlace("https://translate.google.com/", "Traductor", "google translate languages idiomas", googleLinks);

enlace("https://www.youtube.com/", "YouTube", "ver vídeos videos música", googleLinks);

enlace("https://about.google/intl/es-419/products/", "Más de Google", "mas", googleLinks);

//    User links    //

enlace("https://123apps.com/", "123Apps", "utilities tools herramientas pdf word excel converter convertir conversión editar edición recortar imágenes imagenes images pics pictures fotos documentos documents docs jpg jpeg png gif webp img videos vídeos ecualizar audio equalizer eq ppt font tipografía files archivos ebook libros extractor extraer", userLinks);

enlace("https://www.academia.edu/", "Academia.edu", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", userLinks);

enlace("https://www.adobe.com/mx/acrobat/online/compress-pdf.html", "Adobe Acrobat Compressor", "comprimir pdf reducir documentos documents docs", userLinks);

enlace("https://express.adobe.com/", "Adobe Express", "photoshop diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", userLinks);

enlace("https://web.airdroid.com/", "AirDroid", "android mobile devices smartphones manager dispositivos móviles celulares teléfonos telefonos remote control access acceso remoto remota llamadas mensajes calls sms find encontrar transferir send enviar pc computer computadora share screen compartir pantalla files archivos apps applications aplicaciones apks notificaciones notifications", userLinks);

enlace("https://webcast.airdroid.com", "AirDroid Cast", "android mobile devices smartphones dispositivos móviles celulares teléfonos telefonos remote access acceso remoto share screen compartir pantalla", userLinks);

enlace("https://alphacoders.com/", "Alpha Coders", "images imagenes imágenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", userLinks);

enlace("https://www.artistapirata.com/", "Artista Pirata", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", userLinks);

enlace("https://www.artstation.com", "ArtStation", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", userLinks);

enlace("http://webserver1.siiaa.siu.buap.mx/", "Autoservicios BUAP", "", userLinks);

enlace("https://Baidu.com/", "Baidu", "buscar search búsqueda", userLinks);

enlace("https://bandcamp.com/", "Bandcamp", "escuchar listen música musica", userLinks);

enlace("https://www.base-search.net/", "BASE", "Bielefeld Academic Search Engine buscar búsqueda escuela school scholar escuela ensayos books libros documentos docs pdfs tareas académicos academicos", userLinks);

enlace("https://becasmexico.org/becas-para-universitarios/", "Becas México", "", userLinks);

enlace("https://becassubes.com/", "Becas SUBES", "", userLinks);

enlace("https://www.behance.net/", "Behance", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", userLinks);

enlace("https://www.bibliocatalogo.buap.mx/", "Bibliocatálogo BUAP", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs tareas ensayos académicos academicos", userLinks);

enlace("https://www.bioline.org.br/", "Bioline", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos health salud medicine medicina enfermedades epidemiología biología biologia biologic medio ambiente biodiversidad biodiversity", userLinks);

enlace("https://accesoqr.buap.mx/", "BUAP QR", "", userLinks);

enlace("https://www.canva.com/", "Canva", "diseño gráfico graphic design editar edición recortar imágenes imagenes images pics pictures fotos jpg jpeg png gif webp img", userLinks);

enlace("https://chat.openai.com/", "ChatGpt", "inteligencia artificial intelligence ia ai búsqueda buscar search", userLinks);

enlace("https://sur.ly/o/cinefiliamalversa.blogspot.com.ar/AA000014?pageviewId=desktop-302e36363034343030302031363638383031373733203438303533313335", "Cinéfila Malversa", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", userLinks);

enlace("https://www.deviantart.com", "DeviantArt", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", userLinks);

enlace("https://dialnet.unirioja.es/", "Dialnet", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://discord.com/", "Discord", "gaming gameplays videocalls videollamadas videoconferencias video-conferencias reuniones virtuales redes sociales networks", userLinks);

enlace("https://duckduckgo.com/", "Duckduckgo", "buscar search búsqueda privacidad privacy", userLinks);

enlace("https://www.espaebook2.com/", "ERIC", "Education Resources Information Center buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://www.espaebook2.com/", "EspaEbook", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", userLinks);

enlace("https://www.ebiblioteca.org/lecturas/", "eBiblioteca", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", userLinks);

enlace("https://www.facebook.com/", "Facebook", "redes sociales networks", userLinks);

enlace("https://gatonplayseries.com/", "GatonPlaySeries", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", userLinks);

enlace("https://github.com/AlanIMorgan", "GitHub", "code código codigo deveopers programación programacion", userLinks);

enlace("https://gnula2.org/", "Gnula2", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", userLinks);

enlace("https://www.guitars101.com/", "Guitars 101", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", userLinks);

enlace("https://igram.io/", "iGram", "instagram downloader descargar vídeos videos imágenes imagenes pics pictures fotos photos reels", userLinks);

enlace("https://www.iloveimg.com/", "I love IMG", "editar edición recortar convertir imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", userLinks);

enlace("https://www.ilovepdf.com/", "I love PDF", "editar edición convertir pdf word documentos documents docs", userLinks);

enlace("https://imgur.com", "Imgur", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", userLinks);

enlace("https://app.inferkit.com/demo", "InferKit", "inteligencia artificial intelligence ia ai", userLinks);

enlace("https://archive.org/", "Internet Archive", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", userLinks);

enlace("https://www.instagram.com/", "Instagram", "redes sociales networks photos gallery galería álbum album pics pictures images imágenes", userLinks);

enlace("https://kupdf.net/", "KUPDF", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", userLinks);

enlace("https://www.last.fm/es/user/XaMadness", "Last.fm", "escuchar listen música musica recomendaciones recommendations", userLinks);

enlace("https://libgen.li/", "Library Genesis", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", userLinks);

enlace("https://www.linkedin.com/in/alanmorgan-a/", "LinkedIn", "redes sociales networks trabajos empleos jobs oficios", userLinks);

enlace("https://www.malavida.com", "Malavida", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android iphone apple descargar programas gratis full free download apps apks", userLinks);

enlace("https://mega.nz/", "Mega", "almacenamiento nube cloud storage almacenar", userLinks);

enlace("https://www.megadiscografiascompletas.com/", "Mega Discografías", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", userLinks);

enlace("https://mirandogratis.com/chungking-express.html", "Mirando Gratis", "ver películas peliculas series completas gratis watch full free movies cinema piracy piratería pirateria", userLinks);

enlace("https://mqs.link/", "MQS Albums Download", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", userLinks);

enlace("https://tavasci3-musicrewind.blogspot.com/", "Music Rewind", "escuchar listen descargar música musica gratis full free download piracy piratería pirateria", userLinks);

enlace("https://www.napster.com", "Napster", "escuchar listen música musica", userLinks);

enlace("https://www.newgrounds.com/", "Newgrounds", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales juegos games comunidades redes sociales networks", userLinks);

enlace("https://normas-apa.org/", "Normas APA", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", userLinks);

enlace("https://sites.google.com/cuaad.udg.mx/habilidadesentics/objetos-virtuales-de-aprendizaje/normas-apa?authuser=0", "Normas APA - Google For Education", "academic school scholar escuela documentos documents docs tareas ensayos académicos academicos", userLinks);

enlace("https://correobuap-my.sharepoint.com/personal/alan_morgana_alumno_buap_mx/_layouts/15/onedrive.aspx?", "OneDrive", "almacenamiento nube cloud storage almacenar", userLinks);

enlace("https://www.onlineocr.net/", "Online OCR", "", userLinks);

enlace("https://outlook.live.com/", "Outlook", "correo electrónico mail email e-mail", userLinks);

enlace("https://oxxopremia.oxxo.com/", "Oxxo Premia", "", userLinks);

enlace("https://jspaint.app/", "PaintJS", "", userLinks);

enlace("https://pastedownload.com/25/", "PasteDownload", "descargar vídeos download videos", userLinks);

enlace("https://pcwonderland.com/", "PC Wonderland", "piratería pirateria piracy software pc computer computadora windows mac apple descargar programas gratis full free download", userLinks);

enlace("https://www.pdfdrive.com/", "PDF Drive", "buscar búsqueda search books ebooks libros electrónicos electronicos epub gratis free piratería pirateria piracy full free download descargar", userLinks);

enlace("https://www.bajarpelisgratis.com/", "Pelis Gratis", "ver películas peliculas series completas gratis watch full free movies download descargar cinema piracy piratería pirateria", userLinks);

enlace("https://photocall.tv", "Photocall tv", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", userLinks);

enlace("https://www.pinterest.com.mx/", "Pinterest", "imágenes imagenes images img pics pictures photos fotos wallpapers arte digital artists artistas digitales", userLinks);

enlace("https://www.pixiv.net/", "Pixiv", "diseño gráfico graphic design imágenes imagenes images img pics pictures photos fotos wallpapers arte 3d digital artists artistas digitales", userLinks);

enlace("https://poesiamexa.wordpress.com", "Poesía Mexa", "", userLinks);

enlace("https://www.qrcode-monkey.com/", "QRCode Monkey", "", userLinks);

enlace("https://quillbot.com/", "QuillBot", "inteligencia artificial intelligence ia ai", userLinks);

enlace("https://www.qwant.com/", "Qwant", "buscar search búsqueda privacidad privacy", userLinks);

enlace("https://www.random.org/widgets/", "Random", "", userLinks);

enlace("https://redalyc.org/", "Redalyc", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://www.reddit.com/", "Reddit", "redes sociales network", userLinks);

enlace("https://www.refseek.com/", "Refseek", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("http://repec.org/", "RePEc", "Research Papers Economics buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://sci-hub.se/", "Sci-Hub", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", userLinks);

enlace("https://scielo.org/", "Scielo", "Scientific Electronic Library Online buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://www.science.gov/", "Science.gov", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://www.scimagojr.com/", "SCImago", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://sclouddownloader.net/", "ScloudDownloader", "soundcloud downloader escuchar listen descargar música musica gratis full free piracy piratería pirateria", userLinks);

enlace("https://www.scopus.com/", "Scopus", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://www.scribbr.es/detector-de-plagio/generador-apa/", "Scribbr APA generator", "academic school scholar escuela documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://seriespapaya.club/", "Series Papaya", "ver películas peliculas series completas gratis watch full free download movies descargar cinema piracy piratería pirateria", userLinks);

enlace("https://open.spotify.com/", "Spotify", "escuchar listen música musica", userLinks);

enlace("https://link.springer.com/", "Springer Link", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://soundcloud.com/", "Soundcloud", "escuchar listen música musica", userLinks);

enlace("https://subes.becasbenitojuarez.gob.mx/", "SUBES", "becas", userLinks);

enlace("https://www.typingclub.com/", "TypingClub", "utilities tools herramientas learn aprender escribir write", userLinks);

enlace("https://teams.microsoft.com/_#/school/teams-grid/General?ctx=teamsGrid", "Teams", "academic school scholar escuela tareas homework", userLinks);

enlace("https://web.telegram.org/k/", "Telegram", "redes sociales network mensajerías mensajerias intantáneas intantaneas", userLinks);

enlace("https://www.televisiongratishd.com/", "Televisión gratis", "ver canales televisión gratis watch tv free television channels piatería pirateria piracy", userLinks);

enlace("https://www.tiktok.com/", "TikTok", "redes sociales network vídeos videos", userLinks);

enlace("https://tinypng.com/", "TinyPNG", "comprimir compressor imágenes imagenes images pics pictures fotos jpg jpeg png gif webp", userLinks);

enlace("https://www.tumblr.com/", "Tumblr", "redes sociales network", userLinks);

enlace("https://twitter.com/", "Twitter", "redes sociales network", userLinks);

enlace("https://www.urbandictionary.com/", "Urban Dictionary", "buscar search búqueda busqueda diccionario qué significa que significa", userLinks);

enlace("https://victorraulrr.info/", "Victor RaulRR", "descargar gratis free download piracy piratería pirateria apps aplicaciones apks juegos games completas completos android iphone apple celulares smartphones teléfonos telefonos mobiles móviles moviles", userLinks);

enlace("https://www.virustotal.com/", "VirusTotal", "piratería pirateria piracy software pc computer computadora windows mac apple mobiles móviles smartphones teléfonos telefonos celulares android iphone apple descargar programas gratis full free download apps apks", userLinks);

enlace("https://vocalremover.org/", "Vocal Remover and Isolation", "inteligencia artificial intelligence ia ai música musica audio", userLinks);

enlace("https://wallhaven.cc/", "Wallhaven", "images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", userLinks);

enlace("https://web.whatsapp.com/", "WhatsApp", "redes sociales network mensajería mensajeria intantánea intantanea", userLinks);

enlace("https://www.office.com/launch/word?auth=2", "Word", "ofimática documents docs", userLinks);

enlace("https://www.worldcat.org/", "WorldCat", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos", userLinks);

enlace("https://ya.ru/", "Яндекс (Yandex ruso)", "buscar search búsqueda", userLinks);

enlace("https://yandex.com/images/", "Yandex Images", "buscar búsqueda busqueda search images imagenes img pics pictures photos fotos wallpapers jpg jpeg png gif webp", userLinks);

enlace("https://z-lib.org/", "ZLibrary", "buscar búsqueda search academic school scholar escuela books libros documentos documents docs pdfs tareas ensayos académicos academicos download free descargar gratis piracy piratería pirateria", userLinks);