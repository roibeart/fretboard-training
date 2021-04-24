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
];

const noteFiguresMap = {
    "6-E": {
        vexflow_note: "E/3",
        midi_number: 40
    },

    "6-F": {
        vexflow_note: "F/3",
        midi_number: 41
    },
    "6-F#": {
        vexflow_note: "F#/3",
        midi_number: 42
    },


    "6-Gb": {
        vexflow_note: "Gb/3",
        midi_number: 42
    },
    "6-G": {
        vexflow_note: "G/3",
        midi_number: 43
    },
    "6-G#": {
        vexflow_note: "G#/3",
        midi_number: 44
    },

    "6-Ab": {
        vexflow_note: "Ab/3",
        midi_number: 44
    },
    "6-A": {
        vexflow_note: "A/3",
        midi_number: 45
    },
    "6-A#": {
        vexflow_note: "A#/3",
        midi_number: 46
    },

    "6-Bb": {
        vexflow_note: "Bb/3",
        midi_number: 46
    },
    "6-B": {
        vexflow_note: "B/3",
        midi_number: 47
    },

    "6-C": {
        vexflow_note: "C/4",
        midi_number: 48
    },
    "6-C#": {
        vexflow_note: "C#/4",
        midi_number: 49
    },

    "6-Db": {
        vexflow_note: "Db/4",
        midi_number: 49
    },
    "6-D": {
        vexflow_note: "D/4",
        midi_number: 50
    },
    "6-D#": {
        vexflow_note: "D#/4",
        midi_number: 51
    },


    "5-A":{
        vexflow_note: "A/3",
        midi_number: 45
    },
    "5-A#": {
        vexflow_note: "A#/3",
        midi_number: 46
    },

    "5-Bb": {
        vexflow_note: "Bb/3",
        midi_number: 46
    },
    "5-B":{
        vexflow_note: "B/3",
        midi_number: 47
    },

    "5-C":{
        vexflow_note: "C/4",
        midi_number: 48
    },
    "5-C#":{
        vexflow_note: "C#/4",
        midi_number: 49
    },

    "5-Db":{
        vexflow_note: "Db/4",
        midi_number: 49
    },
    "5-D":{
        vexflow_note: "D/4",
        midi_number: 50
    },
    "5-D#":{
        vexflow_note: "D#/4",
        midi_number: 51
    },

    "5-Eb":{
        vexflow_note: "Eb/4",
        midi_number: 51
    },
    "5-E":{
        vexflow_note: "E/4",
        midi_number: 52
    },

    "5-F":{
        vexflow_note: "F/4",
        midi_number: 53
    },
    "5-F#":{
        vexflow_note: "F#/4",
        midi_number: 54
    },

    "5-Gb":{
        vexflow_note: "Gb/4",
        midi_number: 54
    },
    "5-G":{
        vexflow_note: "G/4",
        midi_number: 55
    },


    "4-D":{
        vexflow_note: "D/4",
        midi_number: 50
    },
    "4-D#": {
        vexflow_note: "D#/4",
        midi_number: 51
    },

    "4-Eb":{
        vexflow_note: "Eb/4",
        midi_number: 51
    },
    "4-E":{
        vexflow_note: "E/4",
        midi_number: 52
    },

    "4-F":{
        vexflow_note: "F/4",
        midi_number: 53
    },
    "4-F#":{
        vexflow_note: "F#/4",
        midi_number: 54
    },

    "4-Gb":{
        vexflow_note: "Gb/4",
        midi_number: 54
    },
    "4-G":{
        vexflow_note: "G/4",
        midi_number: 55
    },
    "4-G#":{
        vexflow_note: "G#/4",
        midi_number: 56
    },

    "4-Ab":{
        vexflow_note: "Ab/4",
        midi_number: 56
    },
    "4-A":{
        vexflow_note: "A/4",
        midi_number: 57
    },
    "4-A#":{
        vexflow_note: "A#/4",
        midi_number: 58
    },

    "4-Bb":{
        vexflow_note: "B/4",
        midi_number: 58
    },
    "4-B":{
        vexflow_note: "B/4",
        midi_number: 59
    },

    "4-C":{
        vexflow_note: "C/5",
        midi_number: 60
    },
    "4-C#":{
        vexflow_note: "C#/5",
        midi_number: 61
    },


    "3-G":{
        vexflow_note: "G/4",
        midi_number: 55
    },
    "3-G#":{
        vexflow_note: "G#/4",
        midi_number: 56
    },

    "3-Ab":{
        vexflow_note: "Ab/4",
        midi_number: 56
    },
    "3-A":{
        vexflow_note: "A/4",
        midi_number: 57
    },
    "3-A#":{
        vexflow_note: "A#/4",
        midi_number: 58
    },

    "3-Bb":{
        vexflow_note: "Bb/4",
        midi_number: 58
    },
    "3-B":{
        vexflow_note: "B/4",
        midi_number: 59
    },

    "3-C":{
        vexflow_note: "C/5",
        midi_number: 60
    },
    "3-C#":{
        vexflow_note: "C#/5",
        midi_number: 61
    },

    "3-Db":{
        vexflow_note: "Db/5",
        midi_number: 61
    },
    "3-D":{
        vexflow_note: "D/5",
        midi_number: 62
    },
    "3-D#":{
        vexflow_note: "D#/5",
        midi_number: 63
    },

    "3-Eb":{
        vexflow_note: "Eb/5",
        midi_number: 63
    },
    "3-E":{
        vexflow_note: "E/5",
        midi_number: 64
    },

    "3-F":{
        vexflow_note: "F/5",
        midi_number: 65
    },
    "3-F#":{
        vexflow_note: "F#/5",
        midi_number: 66
    },


    "2-B":{
        vexflow_note: "B/4",
        midi_number: 59
    },
    
    "2-C":{
        vexflow_note: "C/5",
        midi_number: 60
    },
    "2-C#":{
        vexflow_note: "C#/5",
        midi_number: 61
    },


    "2-Db":{
        vexflow_note: "Db/5",
        midi_number: 61
    },
    "2-D":{
        vexflow_note: "D/5",
        midi_number: 62
    },
    "2-D#":{
        vexflow_note: "D#/5",
        midi_number: 63
    },

    "2-Eb":{
        vexflow_note: "Eb/5",
        midi_number: 63
    },
    "2-E":{
        vexflow_note: "E/5",
        midi_number: 64
    },
    
    "2-F":{
        vexflow_note: "F/5",
        midi_number: 65
    },
    "2-F#":{
        vexflow_note: "F#/5",
        midi_number: 66
    },

    "2-Gb":{
        vexflow_note: "G#/5",
        midi_number: 66
    },
    "2-G":{
        vexflow_note: "G/5",
        midi_number: 67
    },
    "2-G#":{
        vexflow_note: "G#/5",
        midi_number: 68
    },

    "2-Ab": {
        vexflow_note: "Ab/5",
        midi_number: 68
    },
    "2-A":{
        vexflow_note: "A/5",
        midi_number: 69
    },


    "1-E":{
        vexflow_note: "E/5",
        midi_number: 64
    },

    "1-F":{
        vexflow_note: "F/5",
        midi_number: 65
    },
    "1-F#":{
        vexflow_note: "F#/5",
        midi_number: 66
    },

    "1-Gb":{
        vexflow_note: "Gb/5",
        midi_number: 66
    },
    "1-G":{
        vexflow_note: "G/5",
        midi_number: 67
    },
    "1-G#":{
        vexflow_note: "G#/5",
        midi_number: 68
    },

    "1-Ab":{
        vexflow_note: "Ab/5",
        midi_number: 68
    },
    "1-A":{
        vexflow_note: "A/5",
        midi_number: 69
    },
    "1-A#":{
        vexflow_note: "A#/5",
        midi_number: 70
    },

    "1-Bb":{
        vexflow_note: "Bb/5",
        midi_number: 70
    },
    "1-B":{
        vexflow_note: "B/5",
        midi_number: 71
    },

    "1-C":{
        vexflow_note: "C/6",
        midi_number: 72
    },
    "1-C#":{
        vexflow_note: "C#/6",
        midi_number: 73
    },

    "1-Db":{
        vexflow_note: "Db/6",
        midi_number: 73
    },
    "1-D":{
        vexflow_note: "D/6",
        midi_number: 74
    },

};