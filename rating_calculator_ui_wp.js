
/* UI cleanup for the calculator integrated into http://ttmaster.com.ua/ */
stateCheckForTtMaster = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(stateCheckForTtMaster);
        /* Remove garbage inserted by WordPress */
        $(".match br").remove();
        /* Replace the first (misaligned) match with a good-looking one. */
        addMatch();
        $(".match:first").remove();
    }
}, 100);