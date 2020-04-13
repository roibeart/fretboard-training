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

var showSettingsView = function (){
    $("#training-view").hide();
    $("#settings-view").css({'display': 'flex'});
}

var showExerciseView = function (options) {
    $("#settings-view").hide();
    var exercise = getExercise(options);
    $(".note-text").html(exercise.note.latin + exercise.note.accidental + " | " + exercise.note.english + exercise.note.accidental);
    $(".string-text").html("corda " + exercise.string);
    $("#training-view").css({'display': 'flex'});
}

$(function(){
    showSettingsView();

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
        $("#training-view .next-button").click(function(){
            showExerciseView(options);
        });
        $("#training-view .stop-button").click(function () {
            showSettingsView();
        });
    }

});