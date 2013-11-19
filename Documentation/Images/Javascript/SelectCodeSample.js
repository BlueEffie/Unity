var langgory;
var category;
var p;

function setLanguage(indexl) {
	langgory = indexl;
	$(".sigBlockJS").css("display", indexl == 0 ? "block" : "none");
	$(".sigBlockCS").css("display", indexl == 1 ? "block" : "none");
	$(".sigBlockBoo").css("display", indexl == 2 ? "block" : "none");
	
	$(".codeExampleJS").css("display", indexl == 0 ? "block" : "none");
	$(".codeExampleCS").css("display", indexl == 1 ? "block" : "none");
	$(".codeExampleBoo").css("display", indexl == 2 ? "block" : "none");
	setCookieState('exampleLang', indexl + "");
}

function getLanguage() {
    return getCookieState('exampleLang');
}

function setCategory(indexc) {
	category = indexc;
    $(".classRuntime").css("display", indexc == 0 ? "block" : "none");
    $(".enumRuntime").css("display", indexc == 1 ? "block" : "none");
    $(".attrRuntime").css("display", indexc == 2 ? "block" : "none");
    $(".classEditor").css("display", indexc == 3 ? "block" : "none");
    $(".enumEditor").css("display", indexc == 4 ? "block" : "none");
    $(".attrEditor").css("display", indexc == 5 ? "block" : "none");
	setCookieState('indexCategory', indexc + "");
}

function getCategory() {
    return getCookieState('indexCategory');
}


function setCookieState(cName, value) {
    var exDate = new Date();
    exDate.setDate(exDate.getDate() + 365);
    document.cookie = cName + "=" + escape(value) + ";expires=" + exDate.toGMTString();
}


function getCookieState(cName) {
    if (document.cookie.length > 0) {
        cStart = document.cookie.indexOf(cName + "=");

        if (cStart != -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);

            if (cEnd == -1) {
                cEnd = document.cookie.length;
            }

            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }

    return 0;
}