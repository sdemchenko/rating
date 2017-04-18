

function Match(opponentRating, iWon) {
    this.iWon = iWon;
    this.opponentRating = opponentRating;

    this.toString = function () {
        return "[their rating " + this.opponentRating + " - I " + (this.iWon ? "won" : "lost") + "]";
    }
}


function RatingCalculator(myInitialRating, myInitialWeight, myMatches, contestFactor) {

    /* Instance methods */

    this.getContribution = function (match) {
        if (match.iWon) {
            if (match.opponentRating <= 0) {
                return 0;
            }
            if (this.initialRating >= match.opponentRating) { // I won a weaker contestant
                if (this.initialRating - match.opponentRating <= 2.0) {
                    return 2;
                } else if (this.initialRating - match.opponentRating <= 20.0) {
                    return 1;
                } else {
                    return 0; // huge difference, so I get nothing
                }
            } else { // I won a stronger contestant
                return Math.round((match.opponentRating - this.initialRating + 5.0) / 3.0);
            }
        } else {
            if (this.initialRating <= 0) {
                return 0;
            }
            if (this.initialRating <= match.opponentRating) {  // I lost to a stronger contestant
                if (match.opponentRating - this.initialRating <= 2.0) {
                    return -2;
                } else if (match.opponentRating - this.initialRating <= 20.0) {
                    return -1;
                } else {
                    return 0; // huge difference, so I lose nothing
                }
            } else { // I lost to a weaker contestant
                return -Math.round((this.initialRating - match.opponentRating + 5.0) / 3.0);
            }
        }
    };

    this.getClosingContribution = function () {
        var contribution = 0;
        for (var i = 0; i < this.matches.length; i++) {
            contribution += this.getContribution(this.matches[i]);
        }
        return contribution;
    };

    this.getClosingWeight = function () {
        return this.initialWeight + this.getContestWeight();
    };

    this.getClosingRating = function () {
        return Math.max(0, this.initialRating + this.getClosingRatingDelta());
    };

    this.getClosingRatingDelta = function () {
        if (RatingCalculator.round(this.initialWeight) === 0 && RatingCalculator.round(this.getContestWeight()) === 0) {
            return 0;
        }
        return this.contestFactor * this.getClosingContribution() * 10 / Math.min(40, this.initialWeight + this.getContestWeight());
    };

    this.getContestWeight = function () {
        var weight = 0;
        for (var i = 0; i < this.matches.length; i++) {
            weight += Math.abs(this.getContribution(this.matches[i]));
        }
        return Math.min(20, weight);
    };

    /** Base rating ('опорный рейтинг'). */
    this.getBaseRating = function () {
        var minimumRatingILostTo = 0;
        var maximumRatingIWon = 0;
        var iWonAtLeastOnce = false;
        var iLostAtLeastOnce = false;
        for (var i = 0; i < this.matches.length; i++) {
            if (this.matches[i].iWon) {
                if (iWonAtLeastOnce) {
                    maximumRatingIWon = Math.max(this.matches[i].opponentRating, maximumRatingIWon);
                } else {
                    maximumRatingIWon = this.matches[i].opponentRating;
                    iWonAtLeastOnce = true;
                }
            } else {
                if (iLostAtLeastOnce) {
                    minimumRatingILostTo = Math.min(this.matches[i].opponentRating, minimumRatingILostTo);
                } else {
                    minimumRatingILostTo = this.matches[i].opponentRating;
                    iLostAtLeastOnce = true;
                }

            }
        }
        if (iWonAtLeastOnce) {
            return iLostAtLeastOnce ? Math.min(minimumRatingILostTo, maximumRatingIWon) : maximumRatingIWon;
        } else {
            return 0;
        }
    };

    this.toString = function () {
        return "RatingCalculator[" +
            "\n    initialRating: " + this.initialRating +
            "\n    initialWeight: " + this.initialWeight +
            "\n    matches: " + this.matches +
            "\n    contestFactor: " + this.contestFactor +
            "\n    getContestWeight: " + this.getContestWeight() +
            "\n    getClosingWeight: " + this.getClosingWeight() +
            "\n    getClosingContribution: " + this.getClosingContribution() +
            "\n    getClosingRatingDelta: " + RatingCalculator.round(this.getClosingRatingDelta()) +
            "\n    getClosingRating: " + RatingCalculator.round(this.getClosingRating()) +
            "\n]";
    };

    /* Static methods */
    RatingCalculator.round = function (rating) {
        return Math.round(rating * 10) / 10;
    };


    /* Instance initialization */
    this.matches = myMatches;
    this.contestFactor = contestFactor;
    if (myInitialRating <= 0) {
        this.initialRating = this.getBaseRating();
        this.initialWeight = 0;
    } else {
        this.initialRating = myInitialRating;
        this.initialWeight = myInitialWeight;
    }

}


