
function deleteMatch(el) {
    if ($(".match").length > 1) {
        $(el).parent().remove();
    }
}

function addMatch() {
    var lastMatch = $(".match:last");
    var lastMatchClone = lastMatch.clone();
    lastMatchClone.find("input[name='opponentName']").val('');
    lastMatchClone.find("input[name='opponentRating']").val('0.0');
    lastMatchClone.find("input[name='iWon']").prop("checked", "checked");
    lastMatch.after(lastMatchClone);
}

function fixDecimalPointLocale(val) {
    return +(val.replace(",", "."));
}

function calculateRating() {
    var matches = [];
    $(".match").each(function () {
        matches.push(new Match(
            fixDecimalPointLocale($(this).find("input[name='opponentRating']").val()),
            $(this).find("input[name='iWon']").prop("checked"))
        );
    });

    var rating = new RatingCalculator(
        fixDecimalPointLocale($("#initialRating").val()),
        fixDecimalPointLocale($("#initialWeight").val()),
        matches,
        fixDecimalPointLocale($("#contestFactor").val())
    );

    $("#initialRating").val(RatingCalculator.round(rating.initialRating));
    $("#initialWeight").val(RatingCalculator.round(rating.initialWeight));
    $("#closingRating").val(RatingCalculator.round(rating.getClosingRating()));
    $("#closingRatingDelta").val(RatingCalculator.round(rating.getClosingRatingDelta()));
    $("#closingWeight").val(rating.getClosingWeight());
}

/* Create a few opponents more to spare the user extra clicks. */
stateCheck = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        for (var i = 0; i < 5; i++) {
            addMatch();
        }
    }
}, 100);