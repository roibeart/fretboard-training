if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

var loadSettingsFormDefaults = function(){
    var savedSettings = loadSavedSettings();
    if (!$.isEmptyObject(savedSettings)) {
        if (savedSettings.training_type) {
            $('select[name="training_type"] option[value="' + savedSettings.training_type + '"]').prop("selected", true);
        }
        for (element in savedSettings.strings){
            $('input[name="strings[]"][value="' + savedSettings.strings[element] + '"]').prop("checked", true);
        }
        if (savedSettings.accidentals_included){
            $('input[name="accidentals_included"]').prop("checked", true);
        }
        if (savedSettings.bpm) {
            $('input[name="bpm"]').val(savedSettings.bpm);
            $('input[name="enable_vibration"]').prop("checked", (savedSettings.enable_vibration == "1" ));
        }
    }
}

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
    completedSteps: 0,
    incrementCounter: function(){
        this.count++;
    },
    incrementCompletedSteps: function(){
        this.completedSteps++;
    },
    resetCounter: function(){
        this.count = 0;
        this.completedSteps = 0;
    }
}

var showSettingsView = function (){
    $(".view").hide();
    $("#settings-view").css({'display': 'flex'});
}

var canHighlight = true;
var showExerciseView = function (options, exercisesCollector) {
    $(".view").hide();
    var exercise = getExercise(options, exercisesCollector);
    var highlightColor = '#cedddf';
    var vibrationLength = 100;
    if (exercise.isNewRound){
        StepsCounter.incrementCounter();
        highlightColor = '#abdfe8';
        vibrationLength = 200;
    }
    if (exercise.isLastOfRound){
        // Per convenzione, considera un esercizio completato quando si arriva all'ultimo del round
        StepsCounter.incrementCompletedSteps();
    }
    $(".counter-text").html("Esercizio "+StepsCounter.count);
    showNoteFigure("#note-figure", exercise);
    $(".note-text").html(exercise.note.latin + exercise.note.accidental + " | " + exercise.note.english + exercise.note.accidental);
    $(".string-text").html("corda " + exercise.string);
    $("#training-view").css({'display': 'flex'});
    if (canHighlight){
        canHighlight = false;
        $("#training-view").effect("highlight", { color: highlightColor}, 400, function(){ canHighlight = true; });
    }
    if (options['enable_vibration']){
        window.navigator.vibrate(vibrationLength);
    }
}

var showSummaryView = function (totalTime, totalExercises) {
    
    function buildDefaultSummary(totalTime, totalExercises) {
        var templateContents = $("#tpl-defaut-summary-screen").prop("content");
        var view = $('#summary-view .summary-wrapper').html(templateContents);
        view.find('.total-time').html(totalTime);
        view.find('.total-exercises').html(totalExercises);
    }

    buildDefaultSummary(totalTime, totalExercises);
    $(".view").hide();
    $("#summary-view").css({ 'display': 'flex' });
}

var noSleep = new NoSleep();

$(function(){

    loadSettingsFormDefaults();

    showSettingsView();

    $('#bpmInput').on('input change', function(){
        var label;
        if ($(this).val() == 0){
            label = "Off <span class='note'>sposta il pallino per attivare l'autoplay</span>";
            $(".vibration-settings").hide();
            $('#enable_vibration-check').prop("disabled", true);
        } else {
            $(".vibration-settings").show();
            $('#enable_vibration-check').prop("disabled", false);
            var seconds = (60 / $(this).val());
            // https://stackoverflow.com/a/11832950
            seconds = Math.round((seconds + Number.EPSILON) * 100) / 100;
            var secondsString = (seconds == 1) ? "secondo" : seconds + " secondi";
            label = $(this).val() +" bpm <span class='note'>una nota ogni " + secondsString + "</span>";
        }
        $('label[for=bpmInput]').html(label);
    });
    $('#bpmInput').trigger("change");

    $('#settings-form .start-button').on('click tap', function(event){
        event.preventDefault();
        var data = getFormData($('#settings-form'));
        if (data.strings){
            selectedOptions = data;
            saveSettings(data);
            noSleep.enable();
            initTraining(data);
        }
    });

    var initTraining = function(options){
        var exercisesCollector = new ExercisesCollector();
        var countUpTimer = new CountUpTimer(".timer-text .seconds", ".timer-text .minutes");
        countUpTimer.start();

        showExerciseView(options, exercisesCollector);
        
        var autoplayTimer;
        if (options.bpm != 0){
            var milliseconds = (60 / options.bpm) * 1000;
            autoplayTimer = setInterval(function () { showExerciseView(options, exercisesCollector)}, milliseconds);
            $("#training-view .next-button").hide();
        } else {
            $("#training-view .next-button").show().off().click(function () {
                showExerciseView(options, exercisesCollector);
            });
        }

        $("#training-view .stop-button").off().click(function () {
            var totalTime = $('.timer-text').text();
            var totalExercises = StepsCounter.completedSteps;
            clearInterval(autoplayTimer);
            countUpTimer.stop();
            StepsCounter.resetCounter();
            noSleep.disable();
            showSummaryView(totalTime, totalExercises);
        });

        $("#summary-view .finish-button").off().click(function(){
            showSettingsView();
        });
        
    }

});