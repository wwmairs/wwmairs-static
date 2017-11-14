
var sent = getUrlParameter('sent');
var modal = document.getElementById('theModal');
var message = document.getElementById('modalMessage');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
if (sent == 'true') {
    modalMessage.innerHTML = "Thanks! I'll get back to you soon on that one.";
    modal.style.display = "block";
} else if (sent == 'false') {
    modalMessage.innerHTML = "Whoops! Something went wrong with my scripts.";
    modal.style.display = "block";
} else {

}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
