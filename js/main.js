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
    if (options['enable_vibration']){
        window.navigator.vibrate(200);
    }
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
        var countUpTimer = new CountUpTimer(".timer-text .seconds", ".timer-text .minutes");
        countUpTimer.start();

        showExerciseView(options);
        
        var autoplayTimer;
        if (options.bpm != 0){
            var milliseconds = (60 / options.bpm) * 1000;
            autoplayTimer = setInterval(function(){showExerciseView(options)}, milliseconds);
            $("#training-view .next-button").hide();
        } else {
            $("#training-view .next-button").show().click(function () {
                showExerciseView(options);
            });
        }

        $("#training-view .stop-button").click(function () {
            clearInterval(autoplayTimer);
            countUpTimer.stop();
            showSettingsView();
            StepsCounter.resetCounter();
            noSleep.disable();
        });
    }

});