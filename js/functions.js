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