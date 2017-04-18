
function deleteMatch(el) {
    if ($(".match").length > 1) {
        $(el).parent().remove();
    }
}

function addMatch() {
    var buttonBeforeLastOpponent = $("input[name='add_opponent']");
    var divOpponentClone = buttonBeforeLastOpponent.prev().clone();
    divOpponentClone.find("input[name='opponentName']").val('');
    divOpponentClone.find("input[name='opponentRating']").val('0.0');
    divOpponentClone.find("input[name='iWon']").prop("checked", "checked");
    buttonBeforeLastOpponent.before(divOpponentClone);
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