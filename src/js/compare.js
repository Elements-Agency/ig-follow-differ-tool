function stripUsers(html) {
    if (!html) {
        return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const links = doc.getElementsByTagName("a")

    var array = [];
    for (var i=0, max=links.length; i<max; i++) {
        if (links[i].href.startsWith('https://www.instagram.com/') && !links[i].href.endsWith('/')) {
            array.push(links[i].href.split('/').pop());
        }
    }

    return array;
}

function compare(followers, following) {
    if (!followers || !following) {
        return;
    }

    followers_count = 0;
    following_count = 0;

    followers = stripUsers(followers);
    following = stripUsers(following);

    var all = [];

    for (var i=0, max=followers.length; i<max; i++) {
        all.push({
            'user': followers[i],
            'followers': true,
            'following': false
        });

        followers_count++
    }

    for (var i=0, max=following.length; i<max; i++) {
        if (all.find(element => element.user == following[i])) {
            all.find(element => element.user == following[i]).following = true;
        } else {
            all.push({
                'user': following[i],
                'followers': false,
                'following': true
            });
        }

        following_count++;
    }

    // sory all by user
    all.sort(function(a, b) {
        var userA = a.user.toUpperCase();
        var userB = b.user.toUpperCase();

        if (userA < userB) {
            return -1;
        }

        if (userA > userB) {
            return 1;
        }

        return 0;
    });

    return {
        'total': all.length,
        'followers': followers,
        'following': following,
        'results': all
    };
}