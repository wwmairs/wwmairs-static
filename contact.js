
var sent = getUrlParameter('sent');
var modal = modal = document.getElementById('theModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (even.target == modal) {
        modal.style.display = "none";
    }
}
if (sent == 'true') {
    modal.style.display = "block";
} else if (sent == 'false') {
    modal.style.display = "block";
} else {

}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};