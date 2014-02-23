$(document).ready(function() {
    $('#message').fadeOut(3000);
});
function validateForm() {
    $('#Post').removeAttr("style");
    $('#Title').removeAttr("style");
    $('#Type').removeAttr("style");
    var auth = $('#Author').val();
    var post = $('#Post').val();
    var title = $('#Title').val();
    var type = $('#Type').val();
    if (auth.length >= 5 && post.length >= 200 && title.length >= 3
            && /^GENERAL|TECH$/.test(type) === true) {
        return true;
    } else {
        if(/^GENERAL|TECH$/.test(type) === false) {
            $('#Type').attr("style", "border-color:red");
        }
        if (post.length < 200) {
            $('#Post').attr("style", "border-color:red");
        }
        if (title.length < 3) {
            $('#Title').attr("style", "border-color:red");
        }
    }
    return false;
}

function clearForm() {
    $('#Post').removeAttr("style");
    $('#Title').removeAttr("style");
    $('#Type').removeAttr("style");
    return true;
}