// https://stackoverflow.com/a/4550514
var getRandomElement = function(array){
    return array[Math.floor(Math.random() * array.length)];
};

var getNewRandomNote = function(options, excludedNote){
    var note;
    var string;
    while (
        // Evita di mostrare la nota excludedNote
        (excludedNote && (!note || (excludedNote.note.english == note.english && excludedNote.note.accidental === note.accidental)) && (!string || excludedNote.string == string))
        // Evita di mostrare la nota excludedNote (nel caso non sia definita la corda)
        || (excludedNote && !excludedNote.string && (!note || (excludedNote.note.english == note.english && excludedNote.note.accidental === note.accidental)))
        // Caso in cui excludedNote non è definito
        || (!excludedNote && !note && !string)
    )
    {
        note = getRandomElement(notes);
        note.accidental = (options.accidentals_included) ? getRandomElement(["", "♯", "♭"]) : "";
        if (
            (note.accidental == "♯" && (note.latin == "Si" || note.latin == "Mi"))
            || (note.accidental == "♭" && (note.latin == "Do" || note.latin == "Fa"))
        ) {
            note.accidental = "";
        }
        string = getRandomElement(options.strings);
    }

    return {
        note: note,
        string: string,
        isNewRound: true,
        isLastOfRound: true // di default la nota è la prima e l'ultima dell'esercizio (poi cambia a seconda della tipologia di esercizio)
    }
}

var getExercise = function(options, exercisesCollector){
    var exercise = null;
    var lastExercise = exercisesCollector.getLastExercise();

    switch (options.training_type){
        case 'note_on_all_strings':
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
            if (lastExercise == null || i == strings.length - 1)
            {
                if (lastExercise){
                    lastExercise.string = null; // corda impostata a null, per fare in modo che getNewRandomNote non ritorni una nota uguale alla precedente
                }
                exercise = getNewRandomNote(options, lastExercise);
                exercise.string = strings[0];
                exercise.isLastOfRound = (strings.length == 1); // È ultimo round solo se per la sessione è stata impostata una sola corda
            } else {
                // Altrimenti procedi con la stessa nota per la corda successiva
                exercise = {
                    note: lastExercise.note,
                    string: options.strings[i+1],
                    isNewRound: false,
                    isLastOfRound: (i+1 == strings.length - 1)
                }
            }
            break;
        case 'note_on_single_string':
        default:
            exercise = getNewRandomNote(options, lastExercise);
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
            // clona l'oggetto
            result = jQuery.extend(true, {}, this.exercises[this.exercises.length - 1]);
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
    getTotalSeconds(){
        return parseInt(this.secondsLabel.text()) + (parseInt(this.minutesLabel.text()) * 60);
    }
    stop() {
        clearInterval(this.timer);
        this.secondsLabel.html("00");
        this.minutesLabel.html("00");
    }
};

var getRoundedNumber = function(number){
    // https://stackoverflow.com/a/11832950
    return Math.round((number + Number.EPSILON) * 100) / 100;
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

// https://github.com/0xfe/vexflow/issues/616
var showNoteFigure = function(selector, exercise, clef){
    var note = noteFiguresMap[exercise.string + "-" + exercise.note.english].vexflow_note;

    if (!clef){
        clef = "treble";
    }

    var accidental = exercise.note.accidental;
    if (accidental){
        if (accidental == "♭"){
            accidental = "b";
        } else if (accidental == "♯"){
            accidental = "#";
        }
    }

    var div = $(selector).html('')[0];

    VF = Vex.Flow;
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(120, 150);
    var context = renderer.getContext();
    var stave = new VF.Stave(10, 10, 100);
    stave.addClef(clef);
    stave.setContext(context).draw();
    // new Vex.Flow.StaveNote({ clef: clef, keys: ["d/3"], duration: "q" })
    var staveNote = new VF.StaveNote({ clef: clef, keys: [note], duration: "q", auto_stem: true });
    if (accidental){
        staveNote.addAccidental(0, new VF.Accidental(accidental));
    }
    var notes = [
        staveNote
    ];

    var voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables(notes);
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);
    voice.draw(context, stave);
}