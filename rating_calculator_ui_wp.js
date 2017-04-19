
/* UI cleanup for the calculator integrated into http://ttmaster.com.ua/ */
stateCheckForTtMaster = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(stateCheckForTtMaster);
        /* Remove garbage inserted by WordPress */
        $(".match br").remove();
        /* Replace the original (misaligned) match with a good-looking one. */
        addMatch();
        addMatch();
        $(".match:first").remove();
        $(".match:last").remove();
    }
}, 100);