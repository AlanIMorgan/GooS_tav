const argumentInput = document.getElementById("argument_input");

const conjBtn = document.getElementById("conj_btn");

const disjBtn = document.getElementById("disj_btn");

const substitBtn = document.getElementById("substit_btn");

const implicBtn = document.getElementById("implic_btn");

const bicondiBtn = document.getElementById("bicondi_btn");

const opParentBtn = document.getElementById("op_parent_btn");

const cloParenBtn = document.getElementById("clo_paren_btn");

const premises_menu_btn = document.getElementById("premises_menu_btn");

const negaBtn = document.getElementById("nega_btn");

const delBtn = document.getElementById("del_btn");

const solutionBtn = document.getElementById("solution_btn");

const controlsMenu = document.getElementById("controls_menu");

const premisesMenu = document.getElementById("premises_menu");

const secuente = document.querySelector(".secuente");

const groupingSymbols = {

    '{' : '}',

    '(' : ')',

    '[' : ']'
};

const openingGroupingSymbols = Object.keys(groupingSymbols);

const closingGroupingSymbols = Object.values(groupingSymbols);

const premises = ['T', '┴', 'p', 'q', 'r', 's', 'u', 'w', 'x', 'y', 'z'];

const connectives = ['^', 'v', '<', '>', '='];

openingBrackets = [];

closingBrackets = [];

groups = [];

argumentConnectives = [];

argument = '';

function checkInput() {

    switch (argumentInput.value.length > 0) {

        case false:

            disableBtn(delBtn);

            disableBtn(conjBtn);

            disableBtn(disjBtn);

            disableBtn(substitBtn);

            disableBtn(implicBtn);

            disableBtn(bicondiBtn);

            disableBtn(cloParenBtn);

            enableBtn(negaBtn);

            enableBtn(opParentBtn);

            enableBtn(premises_menu_btn);
        break;

        default:

            switch (argument.length > 0) {

                case false:

                    let lastInputSymbol = argumentInput.value.split(' ')[argumentInput.value.split(' ').length - 1];

                    switch (!premises.includes(lastInputSymbol) && !closingGroupingSymbols.includes(lastInputSymbol) ) {

                        case false:

                            disableBtn(opParentBtn);

                            disableBtn(premises_menu_btn);

                            disableBtn(negaBtn);
                        break;

                        default:

                            enableBtn(opParentBtn);

                            enableBtn(premises_menu_btn);

                            enableBtn(negaBtn);
                        break;
                    }

                    lastInputSymbol == '¬' ? disableBtn(negaBtn) : false;

                    let lastGroupDivision = argumentInput.value.split(groups[groups.length - 1]);

                    switch (premises.includes(lastInputSymbol) || closingGroupingSymbols.includes(lastInputSymbol) && openingBrackets.length > 0 && !argumentConnectives.length > 0) {

                        case false:

                            switch (groups.length > 0 && !openingBrackets.length > 0 && lastInputSymbol != '¬' && !connectives.includes(lastInputSymbol) && !premises.includes(argumentInput.value[1]) && !connectives.includes(lastGroupDivision[0][lastGroupDivision[0].length - 1]) && !connectives.includes(lastGroupDivision[0][lastGroupDivision[0].length - 3]) ) {

                                case false:

                                    disableBtn(conjBtn);

                                    disableBtn(disjBtn);

                                    disableBtn(substitBtn);

                                    disableBtn(implicBtn);

                                    disableBtn(bicondiBtn);

                                    !premises.includes(lastInputSymbol) && !closingGroupingSymbols.includes(lastInputSymbol) ? disableBtn(solutionBtn) : enableBtn(solutionBtn);
                                break;

                                default:

                                    enableBtn(conjBtn);

                                    enableBtn(disjBtn);

                                    enableBtn(substitBtn);

                                    enableBtn(implicBtn);

                                    enableBtn(bicondiBtn);
                                break;
                            }

                            disableBtn(cloParenBtn);
                        break;

                        default:

                            switch (connectives.includes(argumentInput.value[argumentInput.value.length - 3]) || connectives.includes(argumentInput.value[argumentInput.value.length - 5]) && !openingGroupingSymbols.includes(argumentInput.value[argumentInput.value.length - 3]) && argumentConnectives.length > 0) {

                                case false:

                                    switch (groups.length > 0 && connectives.includes(lastGroupDivision[0][lastGroupDivision[0].length - 1]) || connectives.includes(lastGroupDivision[0][lastGroupDivision[0].length - 3]) &&  lastGroupDivision[0][lastGroupDivision[0].length - 1] == '¬') {

                                        case false:

                                            enableBtn(conjBtn);

                                            enableBtn(disjBtn);

                                            enableBtn(substitBtn);

                                            enableBtn(implicBtn);

                                            enableBtn(bicondiBtn);

                                            disableBtn(cloParenBtn);
                                        break;

                                        default:

                                            disableBtn(conjBtn);

                                            disableBtn(disjBtn);

                                            disableBtn(substitBtn);

                                            disableBtn(implicBtn);

                                            disableBtn(bicondiBtn);

                                            switch (openingBrackets.length > 0) {

                                                case false:

                                                    disableBtn(cloParenBtn);

                                                    enableBtn(solutionBtn);
                                                break;

                                                default:

                                                    enableBtn(cloParenBtn);
                                                break;
                                            }
                                        break;
                                    }
                                break;

                                default:

                                    disableBtn(conjBtn);

                                    disableBtn(disjBtn);

                                    disableBtn(substitBtn);

                                    disableBtn(implicBtn);

                                    disableBtn(bicondiBtn);

                                    switch (openingBrackets.length > 0 && !closingGroupingSymbols.includes(lastInputSymbol) ) {

                                        case false:

                                            disableBtn(cloParenBtn);

                                            enableBtn(solutionBtn);
                                        break;

                                        default:

                                            enableBtn(cloParenBtn);
                                        break;
                                    }
                                break;
                            }
                        break;
                    }
                break;

                default:

                    disableBtn(conjBtn);

                    disableBtn(disjBtn);

                    disableBtn(substitBtn);

                    disableBtn(implicBtn);

                    disableBtn(bicondiBtn);

                    disableBtn(opParentBtn);

                    disableBtn(cloParenBtn);

                    disableBtn(premises_menu_btn);

                    disableBtn(negaBtn);

                    disableBtn(solutionBtn);
                break;
            }

            enableBtn(delBtn);

            argumentInput.size = argumentInput.value.length > 15 ? argumentInput.value.length : 15;

            argumentInput.clientWidth > secuente.clientWidth ? secuente.style.justifyContent = "flex-start" : false;
        break;
    }
}

checkInput();

setInterval(checkInput , 100);

function isForbidden(e) {

    if (e.target.classList.length > 0) {

        return e.target.className.includes("forbidden");
    }

    else {

        if (e.target.parentElement.length > 0) {

            return e.target.parentElement.className.includes("forbidden");
        }

        else {

            return e.target.parentElement.parentElement.className.includes("forbidden");
        }
    }
}

function opParentBtnFunc(){

    argumentConnectives.pop();

    switch (argumentInput.value[openingBrackets[openingBrackets.length - 1]]) {

        case '{':

            argumentInput.value += " (";
        break;

        case '(':

            argumentInput.value += " [";
        break;

        case '[':
        default:

            argumentInput.value += " {";
        break;
    }

    openingBrackets.push(argumentInput.value.length - 1);
}

function cloParenBtnFunc(){

    let lastOpeningGroupingSymbol = argumentInput.value[openingBrackets[openingBrackets.length - 1]];

    switch (lastOpeningGroupingSymbol) {

        case '{':

            argumentInput.value += " }";
        break;

        case '(':

            argumentInput.value += " )";
        break;

        case '[':

            argumentInput.value += " ]";
        break;
    }

    let group = ' ' + argumentInput.value.substr(openingBrackets[openingBrackets.length - 1]);

    argumentConnectives.pop();

    openingBrackets.pop();

    groups.push(group);
}

function addToInput(e) {

    let txt = e.target.innerText;

    let group;

    switch (txt) {

        case 'T':

            opParentBtnFunc();

            argumentInput.value += " p > p";

            cloParenBtnFunc();
        break;

        case '┴':

            opParentBtnFunc();

            argumentInput.value += " p < p";

            cloParenBtnFunc();
        break;

        default:

            connectives.includes(txt) ? argumentConnectives.push(argumentInput.value.length + 1) : false;

            argumentInput.value += ' ' + txt;
        break;
    }
}

function enableBtn(btn) {

    btn.classList.remove("forbidden");
}

function disableBtn(btn) {

    btn.classList.add("forbidden");
}

opParentBtn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            opParentBtnFunc();
        break;
    }
});

delBtn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            location.reload();
        break;
    }
});

function hidePremises() {

    controlsMenu.classList.remove("hidden_controls");

    premisesMenu.classList.remove("enabled_premises");
}

premises_menu_btn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            controlsMenu.classList.add("hidden_controls");

            premisesMenu.classList.add("enabled_premises");
        break;
    }
});

document.getElementById("cancel_btn").addEventListener("click", hidePremises);

document.querySelectorAll(".premise_btn").forEach(e =>{

    e.addEventListener("click", (e)=>{

        hidePremises();

        disableBtn(premises_menu_btn);

        disableBtn(opParentBtn);

        addToInput(e);
    });
});

[conjBtn, disjBtn, substitBtn, implicBtn, bicondiBtn].forEach(e =>{

    e.addEventListener("click", i =>{

        switch (isForbidden(i) ) {

            case false:

                addToInput(i);
            break;
        }
    });
});

cloParenBtn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            cloParenBtnFunc();
        break;
    }
});

negaBtn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            addToInput(e);

            enableBtn(premises_menu_btn);
        break;
    }
});

const section = document.querySelector(".secuente");

function newInput(value) {

    let input = document.createElement("input");

    input.setAttribute("readonly", "true");

    input.setAttribute("type", "hidden");

    input.setAttribute("id", "expressionInput");

    input.value = value;

    section.appendChild(input);
}

solutionBtn.addEventListener("click", e =>{

    switch (isForbidden(e) ) {

        case false:

            argument = argumentInput.value.replaceAll('{', '(').replaceAll('}', ')').replaceAll('[', '(').replaceAll(']', ')').replaceAll('v', 'or').replaceAll('<', 'and not').replaceAll('>', '->').replaceAll('=', '<->');

            groups.push(argument);

            newInput(argument);
        break;
    }
});

argumentInput.addEventListener("click", ()=>{

    if (argumentInput.value.length > 0) {

        argumentInput.select();

        argumentInput.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(argumentInput.value);
    }
});