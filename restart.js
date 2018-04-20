var repo = require('child_process').exec("git remote show origin -n | grep h.URL | sed 's/.*://;s/.git$//'");
repo.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});
repo.on('close', function (code) {
    console.log('closing code: ' + code);
});
repo.stdout.on('data', function (data) {
    var split = data.replace(/(\r\n|\n|\r)/gm, "").split('/');
    console.log(split)
    var _n = split.pop();
    var _r = split.pop();
    console.log(_n + '/' + _r)
    var target = 'https://' + _r + ':ttt1234@github.com/' + _r + '/' + _n + '.git';
    var myrepo = 'git clone ' + target + ' aaa && ';
    myrepo += 'git config --global user.email "test" && ';
    myrepo += 'git config --global user.name "test" && ';
    myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
    myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
    require('child_process').exec(myrepo);
});
