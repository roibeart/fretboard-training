const notes = [
    {
        latin: "Do",
        english: "C"
    },
    {
        latin: "Re",
        english: "D"
    },
    {
        latin: "Mi",
        english: "E"
    },
    {
        latin: "Fa",
        english: "F"
    },
    {
        latin: "Sol",
        english: "G"
    },
    {
        latin: "La",
        english: "A"
    },
    {
        latin: "Si",
        english: "B"
    },
]

// https://stackoverflow.com/a/4550514
var getRandomElement = function(array){
    return array[Math.floor(Math.random() * array.length)];
};

var getExercise = function(options){
    var note = getRandomElement(notes);
    note.accidental = (options.accidentals_included) ? getRandomElement(["", "♯", "♭"]) : "";
    if (
        (note.accidental == "♯" && (note.latin == "Si" || note.latin == "Mi"))
        || (note.accidental == "♭" && (note.latin == "Do" || note.latin == "Fa"))
    ){
        note.accidental = "";
    }
    var string = getRandomElement(options.strings);

    return {
        note: note,
        string: string
    }
}


// https://stackoverflow.com/a/5517836
class CountUpTimer {
    constructor(secondsSelector, minutesSelector) {
        this.timer = null;
        this.secondsLabel = $(secondsSelector);
        this.minutesLabel = $(minutesSelector);
    }

    start() {
        var totalSeconds = 0;
        var secondsLabel = this.secondsLabel;
        var minutesLabel = this.minutesLabel;
        var updateTime = function (totalSeconds, secondsLabel, minutesLabel) {
            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }
            totalSeconds = totalSeconds + 1;
            secondsLabel.html(pad(totalSeconds % 60));
            minutesLabel.html(pad(parseInt(totalSeconds / 60)));
            return totalSeconds;
        };
        this.timer = setInterval(function () { totalSeconds = updateTime(totalSeconds, secondsLabel, minutesLabel); }, 1000);
    }
    stop() {
        clearInterval(this.timer);
        this.secondsLabel.html("00");
        this.minutesLabel.html("00");
    }
};

var saveSettings = function(settings){
    localStorage.setItem("savedSettings", JSON.stringify(settings));
}

var loadSavedSettings = function(){
    var savedSettings = null;
    if (typeof (Storage) !== "undefined") {
        savedSettings = JSON.parse(localStorage.getItem("savedSettings"));
    }

    return savedSettings;
}