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

        row.classList.add('user');

        if (results[i].followers && results[i].following) {
            row.classList.add('both');
        }
        if (results[i].followers) {
            row.classList.add('follower');
        }
        if (results[i].following) {
            row.classList.add('following');
        }

        var user = row.insertCell();
        var followers = row.insertCell();
        var following = row.insertCell();

        user.innerHTML = '<strong><a class="text-decoration-none" href="https://instagram.com/' + results[i].user + '">' + results[i].user + '</a></strong>';
        followers.innerHTML = results[i].followers ? '<span class="text-success"><i class="bi bi-check-circle fs-5 text"></i></span>' : '<span class="text-danger"><i class="bi bi-x-circle fs-5 text"></i></span>';
        following.innerHTML = results[i].following ? '<span class="text-success"><i class="bi bi-check-circle fs-5 text"></i></span>' : '<span class="text-danger"><i class="bi bi-x-circle fs-5 text"></i></span>';
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

function hideAll() {
    var users = document.querySelectorAll('.user');
    [].forEach.call(users, function(el) {
        el.classList.add('hide');
    });

    document.getElementById('total-btn').classList.remove('active');
    document.getElementById('followers-btn').classList.remove('active');
    document.getElementById('following-btn').classList.remove('active');
}

function showAll() {
    hideAll();

    // query select user class elements
    var users = document.querySelectorAll('.user');
    [].forEach.call(users, function(el) {
        el.classList.remove('hide');
    });

    document.getElementById('total-btn').classList.add('active');
}

function showFollowers() {
    hideAll();

    var users = document.querySelectorAll('.follower');
    [].forEach.call(users, function(el) {
        el.classList.remove('hide');
    });

    document.getElementById('followers-btn').classList.add('active');
}

function showFollowing() {
    hideAll();

    var users = document.querySelectorAll('.following');
    [].forEach.call(users, function(el) {
        el.classList.remove('hide');
    });

    document.getElementById('following-btn').classList.add('active');
}

(function() {
    const fileSelector = document.getElementById('file-selector');

    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;

        readFile(fileList[0]);
        readFile(fileList[1]);
    });

    document.getElementById('total-btn').addEventListener('click', showAll);
    document.getElementById('following-btn').addEventListener('click', showFollowing);
    document.getElementById('followers-btn').addEventListener('click', showFollowers);
})();