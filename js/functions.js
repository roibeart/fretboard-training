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

var getNewRandomNote = function(options){
    var note = getRandomElement(notes);
    note.accidental = (options.accidentals_included) ? getRandomElement(["", "♯", "♭"]) : "";
    if (
        (note.accidental == "♯" && (note.latin == "Si" || note.latin == "Mi"))
        || (note.accidental == "♭" && (note.latin == "Do" || note.latin == "Fa"))
    ) {
        note.accidental = "";
    }
    var string = getRandomElement(options.strings);

    return {
        note: note,
        string: string
    }
}

var getExercise = function(options, exercisesCollector){
    var exercise = null;
    switch (options.training_type){
        case 'note_on_all_strings':
            var lastExercise = exercisesCollector.getLastExercise();
            console.log(lastExercise);
            var strings = options.strings.sort();
            strings.reverse(); // inverti l'array per partire dalla corda 6
            // Scorri tutte le corde fin quando non trovi la posizione di quella dell'ultimo esercizio
            var i = 0;
            while ((lastExercise != null) && lastExercise.string != strings[i]){
                i++;
            }

            // Se è il primo esercizio o
            // se per questa nota sono state già considerate tutte le corde selezionate,
            // allora genera una nuova nota, ripartendo dalla corda più alta
            if (lastExercise == null || i == strings.length -1)
            {
                exercise = getNewRandomNote(options);
                exercise.string = strings[0];
            } else {
                // Altrimenti procedi con la stessa nota per la corda successiva
                exercise = {
                    note: lastExercise.note,
                    string: options.strings[i+1]
                }
            }
            break;
        case 'note_on_single_string':
        default:
            exercise = getNewRandomNote(options);
    }

    exercisesCollector.addExercise(exercise);
    return exercise;
}

class ExercisesCollector {
    exercises;
    constructor() {
        this.exercises = [];
    }
    addExercise(exercise){
        this.exercises.push(exercise);
    }
    getLastExercise(){
        var result = null;
        if (this.exercises.length > 0){
            result = this.exercises[this.exercises.length - 1];
        }
        return result;
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