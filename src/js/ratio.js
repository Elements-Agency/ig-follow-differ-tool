function updateValues() {
    var iwidth = document.getElementById('iwidth').value;
    var iheight = document.getElementById('iheight').value;
    var ratio = document.getElementById('ratio').value;

    document.getElementById('owidth').setAttribute('value', (iwidth*ratio));
    document.getElementById('oheight').setAttribute('value', (iheight*ratio));
}

(function() {
    document.getElementById('iwidth').addEventListener('change', updateValues);
    document.getElementById('iheight').addEventListener('change', updateValues);
    document.getElementById('ratio').addEventListener('change', updateValues);
})();
