formBtn = document.getElementById('form-btn');
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
form = document.querySelector(".home__form");
input = document.querySelector(".google-search");

navBtn.addEventListener("click", showHideNav);
navListBtn.addEventListener("click", showHideListNav);
formBtn.addEventListener("click", showForm);
profileNavBtn.addEventListener("click", showHideProfileNav);
home.addEventListener("click", hideMenus);

document.documentElement.addEventListener('keyup', (e)=>{

    if (e.key == "|") {

        showForm();
    }
});

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

function hideMenus() {

    navMenu.classList.add("hide");
    profileNavMenu.classList.add("hide");
    
    navMenu.classList.remove("block");
    navMenu.classList.remove("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
}

function showForm() {

    form.classList.toggle("hidden");
    input.focus();
    input.value = "";
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

function enlace(address, text, zone) {

    let newLink = document.createElement("a");

    newLink.setAttribute("href", address);

    newLink.setAttribute("target", "_blank");

    let result = document.createElement("a");

    result.setAttribute("href", address);

    result.setAttribute("target", "_blank");

    result.setAttribute("class", "result");

    results.appendChild(result);
    
    result.innerText = text;

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

// Extra links

enlace("chess/index.html", "Chess", extraLinks);

enlace("conway/index.html", "Conway's game of life", extraLinks);

enlace("https://google-simulator.vercel.app/", "Google", extraLinks);

enlace("karaoke/index.html", "Karaoke", extraLinks);

enlace("https://labahia.epizy.com/", "La Bahía Del Naufragio", extraLinks);

enlace("matrix/index.html", "Matrix", extraLinks);

enlace("msg/index.html", "W", extraLinks);

enlace("http://burgersrestaurant.epizy.com/google/ocr/index.html", "OCR", extraLinks);

// Google links

enlace("https://www.google.com/", "Búsqueda", googleLinks);

enlace("https://myaccount.google.com/", "Cuenta", googleLinks);

enlace("https://docs.google.com/", "Google Docs", googleLinks);

enlace("https://photos.google.com/", "Fotos", googleLinks);

enlace("https://mail.google.com/mail/u/0/#all", "Gmail", googleLinks);

enlace("https://www.google.com/imghp", "Images", googleLinks);

enlace("https://www.google.com/maps/", "Mapas", googleLinks);

enlace("https://news.google.com/", "Noticias", googleLinks);

enlace("https://g.co/kgs/VGAksf", "Pac-Man Doodle", googleLinks);

enlace("https://play.google.com/store/", "Play Store", googleLinks);

enlace("https://docs.google.com/spreadsheets", "Sheets", googleLinks);

enlace("https://translate.google.com/", "Traductor", googleLinks);


enlace("https://www.youtube.com/", "YouTube", googleLinks);

// User links

enlace("https://www.adobe.com/mx/acrobat/online/compress-pdf.html", "Adobe Acrobat Compressor", userLinks);

enlace("https://web.airdroid.com/", "AirDroid", userLinks);

enlace("https://webcast.airdroid.com", "AirDroid Cast", userLinks);

enlace("https://alphacoders.com/", "Alpha Coders", userLinks);

enlace("https://www.artistapirata.com/", "Artista Pirata", userLinks);

enlace("https://www.artstation.com", "ArtStation", userLinks);

enlace("http://webserver1.siiaa.siu.buap.mx/", "Autoservicios BUAP", userLinks);

enlace("https://www.base-search.net/", "Bielefeld Academic Search Engine", userLinks);

enlace("https://becasmexico.org/becas-para-universitarios/", "Becas México", userLinks);

enlace("http://becassubes.com/", "Becas SUBES", userLinks);

enlace("https://www.behance.net/", "Behance", userLinks);

enlace("http://www.bioline.org.br/", "Bioline", userLinks);

enlace("https://accesoqr.buap.mx/", "BUAP QR", userLinks);

enlace("https://www.canva.com/", "Canva", userLinks);

enlace("https://www.chess.com/", "Chess", userLinks);

enlace("https://www.deviantart.com", "DeviantArt", userLinks);

enlace("https://diep.io/", "Diep io", userLinks);

enlace("https://discord.com/", "Discord", userLinks);

enlace("https://www.espaebook2.com/", "EspaEbook", userLinks);

enlace("https://www.ebiblioteca.org/lecturas/", "eBiblioteca", userLinks);

enlace("https://extract.me/es/", "Extractme", userLinks);

enlace("https://www.ezyzip.com/open-extract-rar-file-online.html", "EzyZip", userLinks);

enlace("https://www.facebook.com/", "Facebook", userLinks);

enlace("https://gatonplayseries.com/", "GatonPlaySeries", userLinks);

enlace("https://github.com/AlanIMorgan", "GitHub", userLinks);

enlace("https://gnula2.org/", "Gnula2", userLinks);

enlace("https://www.guitars101.com/", "Guitars 101", userLinks);

enlace("https://igram.io/", "iGram", userLinks);

enlace("https://www.iloveimg.com/", "I love IMG", userLinks);

enlace("https://www.ilovepdf.com/", "I love PDF", userLinks);

enlace("https://imgur.com", "Imgur", userLinks);

enlace("https://app.inferkit.com/demo", "InferKit", userLinks);

enlace("https://www.instagram.com/", "Instagram", userLinks);

enlace("https://kupdf.net/", "KUPDF", userLinks);

enlace("https://www.last.fm/es/user/XaMadness", "Last.fm", userLinks);

enlace("https://libgen.li/", "Library Genesis", userLinks);

enlace("https://www.linkedin.com/in/alanmorgan-a/", "LinkedIn", userLinks);

enlace("https://www.malavida.com", "Malavida", userLinks);

enlace("https://mega.nz/", "Mega", userLinks);

enlace("https://www.megadiscografiascompletas.com/", "Mega Discografías", userLinks);

enlace("https://mqs.link/", "MQS Albums Download", userLinks);

enlace("http://tavasci3-musicrewind.blogspot.com/", "Music Rewind", userLinks);

enlace("https://www.napster.com", "Napster", userLinks);

enlace("https://www.newgrounds.com/", "Newgrounds", userLinks);

enlace("https://normas-apa.org/", "Normas APA", userLinks);

enlace("https://correobuap-my.sharepoint.com/personal/alan_morgana_alumno_buap_mx/_layouts/15/onedrive.aspx?", "OneDrive", userLinks);

enlace("https://www.onlineocr.net/", "Online OCR", userLinks);

enlace("https://outlook.live.com/", "Outlook", userLinks);

enlace("https://oxxopremia.oxxo.com/", "Oxxo Premia", userLinks);

enlace("pac-man/index.html", "Pac-Man", userLinks);

enlace("https://jspaint.app/", "PaintJS", userLinks);

enlace("https://pastedownload.com/25/", "PasteDownload", userLinks);

enlace("https://pcwonderland.com/", "PC Wonderland", userLinks);

enlace("http://www.pdfdrive.com/", "PDF Drive", userLinks);

enlace("http://www.bajarpelisgratis.com/", "Pelis Gratis", userLinks);

enlace("https://photocall.tv", "Photocall tv", userLinks);

enlace("https://www.pinterest.com.mx/", "Pinterest", userLinks);

enlace("https://www.pixiv.net/", "Pixiv", userLinks);

enlace("https://poesiamexa.wordpress.com", "Poesía Mexa", userLinks);

enlace("https://quillbot.com/", "QuillBot", userLinks);

enlace("https://www.random.org/widgets/", "Random", userLinks);

enlace("https://www.reddit.com/", "Reddit", userLinks);

enlace("https://www.refseek.com/", "Refseek", userLinks);

enlace("http://repec.org/", "RePEc", userLinks);

enlace("https://sci-hub.se/", "Sci-Hub", userLinks);

enlace("https://www.science.gov/", "Science.gov", userLinks);

enlace("https://www.scimagojr.com/", "SCImago", userLinks);

enlace("https://sclouddownloader.net/", "ScloudDownloader", userLinks);

enlace("https://www.scopus.com/", "Scopus", userLinks);

enlace("https://www.scribbr.es/detector-de-plagio/generador-apa/", "Scribbr APA generator", userLinks);

enlace("https://seriespapaya.club/", "Series Papaya", userLinks);

enlace("https://open.spotify.com/", "Spotify", userLinks);

enlace("https://link.springer.com/", "Springer Nature", userLinks);

enlace("https://soundcloud.com/", "Soundcloud", userLinks);

enlace("https://steamcommunity.com/app/431960/workshop/", "Steam", userLinks);

enlace("https://steamunlocked.net/", "Steam Unlocked", userLinks);

enlace("http://subes.becasbenitojuarez.gob.mx/", "SUBES", userLinks);

enlace("https://www.typingclub.com/", "TypingClub", userLinks);

enlace("https://teams.microsoft.com/_#/school/teams-grid/General?ctx=teamsGrid", "Teams", userLinks);

enlace("https://web.telegram.org/k/", "Telegram", userLinks);

enlace("http://www.neogeofun.com/kof2002", "The King Of Fighters", userLinks);

enlace("https://www.tiktok.com/", "TikTok", userLinks);

enlace("https://tinypng.com/", "TinyPNG", userLinks);

enlace("https://www.tumblr.com/", "Tumblr", userLinks);

enlace("https://twitter.com/", "Twitter", userLinks);

enlace("https://www.urbandictionary.com/", "Urban Dictionary", userLinks);

enlace("https://victorraulrr.info/", "Victor RaulRR", userLinks);

enlace("https://www.virustotal.com/", "VirusTotal", userLinks);

enlace("https://vocalremover.org/", "Vocal Remover and Isolation", userLinks);

enlace("https://web.whatsapp.com/", "WhatsApp", userLinks);

enlace("https://www.worldcat.org/", "WorldCat", userLinks);

enlace("https://www.office.com/launch/word?auth=2", "Word", userLinks);

enlace("https://z-lib.org/", "ZLibrary", userLinks);