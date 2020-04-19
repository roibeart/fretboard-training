// https://stackoverflow.com/a/11339012
var getFormData = function($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        var name = n['name'];
        var value = n['value'];
        if (matches = name.match(/(.+)\[\]$/)){
            name = matches[1];
            if (!indexed_array[name]){
                indexed_array[name] = [];
            }
            indexed_array[name].push(value);
        } else {
            indexed_array[name] = value;
        }
    });

    return indexed_array;
}

var StepsCounter = {
    count: 0,
    incrementCounter: function(){
        this.count++;
    },
    resetCounter: function(){
        this.count = 0;
    }
}

var showSettingsView = function (){
    $("#training-view").hide();
    $("#settings-view").css({'display': 'flex'});
}

var showExerciseView = function (options) {
    $("#settings-view").hide();
    StepsCounter.incrementCounter();
    var exercise = getExercise(options);
    $(".counter-text").html("Esercizio "+StepsCounter.count);
    $(".note-text").html(exercise.note.latin + exercise.note.accidental + " | " + exercise.note.english + exercise.note.accidental);
    $(".string-text").html("corda " + exercise.string);
    $("#training-view").css({'display': 'flex'});
}

$(function(){
    showSettingsView();

    $('#bpmInput').on('input change', function(){
        var label;
        if ($(this).val() == 0){
            label = "Off <span class='note'>sposta il pallino per attivare l'autoplay</span>";
        } else {
            var seconds = (60 / $(this).val());
            // https://stackoverflow.com/a/11832950
            seconds = Math.round((seconds + Number.EPSILON) * 100) / 100;
            var secondsString = (seconds == 1) ? "secondo" : seconds + " secondi";
            label = $(this).val() +" bpm <span class='note'>una nota ogni " + secondsString + "</span>";
        }
        $('label[for=bpmInput]').html(label);
    });
    $('#bpmInput').trigger("change");

    $('#settings-form').on('submit', function(event){
        event.preventDefault();
        var data = getFormData($(this));
        if (data.strings){
            selectedOptions = data;
            initTraining(data);
        }
    });

    var initTraining = function(options){

        showExerciseView(options);
        
        var timer;
        if (options.bpm != 0){
            var milliseconds = (60 / options.bpm) * 1000;
            timer = setInterval(function(){showExerciseView(options)}, milliseconds);
            $("#training-view .next-button").hide();
        } else {
            $("#training-view .next-button").show().click(function () {
                showExerciseView(options);
            });
        }

        $("#training-view .stop-button").click(function () {
            clearInterval(timer);
            showSettingsView();
            StepsCounter.resetCounter();
        });
    }

});