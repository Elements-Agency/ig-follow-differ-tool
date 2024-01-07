var followers_text = false;
var following_text = false;

function numberFormat(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayResults(resultsObj) {
    if (!resultsObj || !resultsObj.results) {
        return;
    }

    const results = resultsObj.results;
    var table = document.getElementById('results-table');

    // remove preexisting rows from table
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    // remove hide class results id
    var resultsElem = document.getElementById('results');
    resultsElem.classList.remove('hide');

    // update results count
    var totalCount = document.getElementById('total-count');
    totalCount.innerHTML = numberFormat(resultsObj.total);
    var followersCount = document.getElementById('followers-count');
    followersCount.innerHTML = numberFormat(resultsObj.followers.length);
    var followingCount = document.getElementById('following-count');
    followingCount.innerHTML = numberFormat(resultsObj.following.length);


    for (var i=0, max=results.length; i<max; i++) {
        var row = table.insertRow();

        var user = row.insertCell();
        var followers = row.insertCell();
        var following = row.insertCell();

        user.innerHTML = '<a href="https://instagram.com/' + results[i].user + '">' + results[i].user + '</a>';
        followers.innerHTML = results[i].followers ? 'Yes' : 'No';
        following.innerHTML = results[i].following ? 'Yes' : 'No';
    }
}

function readFile(file) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith('text/html')) {
      console.log('File is not html.', file.type, file);
      return;
    }

    // Check if the right files are selected
    if (file.type && (!file.name.startsWith('followers_1.html') && !file.name.startsWith('following.html'))) {
        console.log('File is not followers_1.html or following.html.');
        return;
    }
  
    const reader = new FileReader();

    // loading handlers
    if (file.name.startsWith('followers_1.html')) {
        reader.addEventListener('load', (event) => {
            followers_text = event.target.result;

            displayResults(compare(followers_text, following_text));
        });
    }

    if (file.name.startsWith('following.html')) {
        reader.addEventListener('load', (event) => {
            following_text = event.target.result;

            displayResults(compare(followers_text, following_text));
        });
    }

    reader.readAsText(file);
}

(function() {
    const fileSelector = document.getElementById('file-selector');

    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;

        readFile(fileList[0]);
        readFile(fileList[1]);
    });
})();