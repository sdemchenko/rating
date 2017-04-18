
/* Remove garbage inserted by WordPress into the calculator integrated into http://ttmaster.com.ua/ */
stateCheckForTtMaster = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(stateCheckForTtMaster);
        $(".match br").remove();
    }
}, 100);