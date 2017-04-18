
(function () {
    var calculator;

    calculator = new RatingCalculator(
        28.7,
        35,
        [new Match(12.0, true), new Match(18.7, true), new Match(25.9, false), new Match(38.4, false), new Match(33.8, false), new Match(39.8, false), new Match(18.7, false)],
        1.2
    );

    assert(13 === calculator.getContestWeight());
    assert(48 === calculator.getClosingWeight());
    assert(-9 === calculator.getClosingContribution());
    assert(-2.7 === RatingCalculator.round(calculator.getClosingRatingDelta()));
    assert(26.0 === RatingCalculator.round(calculator.getClosingRating()));


    calculator = new RatingCalculator(
        26.0,
        48,
        [
            new Match(18.5, false), new Match(37.4, false), new Match(43.0, false), new Match(25.8, false), new Match(53.4, false), new Match(43.3, true),
            new Match(29.1, false), new Match(38.6, true), new Match(32.6, false), new Match(24.2, true), new Match(20.5, true)],
        1.2
    );

    assert(20 === calculator.getContestWeight());
    assert(68 === calculator.getClosingWeight());
    assert(6 === calculator.getClosingContribution());
    assert(1.8 === RatingCalculator.round(calculator.getClosingRatingDelta()));
    assert(27.8 === RatingCalculator.round(calculator.getClosingRating()));


    calculator = new RatingCalculator(
        0.0,
        0,
        [
            new Match(10.4, false), new Match(6.3, false), new Match(6.3, false), new Match(10.6, true), new Match(13.0, true), new Match(0, true), new Match(0, true)],
        1.0
    );

    assert(12 === calculator.getClosingWeight());
    assert(8.0 === RatingCalculator.round(calculator.getClosingRating()));


    calculator = new RatingCalculator(
        10.8,
        8,
        [
            new Match(0.2, true), new Match(0.7, true), new Match(8.9, false), new Match(1.7, true), new Match(2.1, true), new Match(0.2, true),
            new Match(0.2, true), new Match(5.5, false), new Match(4.5, true), new Match(2.1, false), new Match(15.7, true), new Match(14.8, false),
            new Match(0.2, false), new Match(1.7, false), new Match(13.8, true), new Match(20.4, false), new Match(8.9, false), new Match(0, true), new Match(23.4, false)
        ],
        1.0
    );

    assert(28 === calculator.getClosingWeight());
    assert(6.5 === RatingCalculator.round(calculator.getClosingRating()));
})();

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
