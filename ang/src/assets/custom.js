/*

var clientId = '536713408045-clb2dpnvl55t0qvtshman8ssku07eh7v.apps.googleusercontent.com';
var scope = [
  'profile',
  'email'
].join(' ');

if(gapi.auth2 == undefined){

    gapi.load('auth2', () => {

      gapi.auth2.init({
        client_id: clientId,
        cookiepolicy: 'single_host_origin',
        scope: scope

      });
      //RE-Render the button (due to known issues of google-button with angular's lifecycle)
      gapi.signin2.render('googleBtn');

      //var buttonElement = this.element.nativeElement.querySelector('#googleBtn');
      //this.attachSignin(buttonElement);

    });

}


var sign_out_google = (function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out from google.');
    });
});


var simple_notifier = (function(type, title, message) {

    setTimeout(function() {
        $(".alert").remove();
    }, 11000);

    return notify(type, title, message, null, null, null, null, null, null, null, null, null, null);
});



function notify(type, title, message, delay, icon, url, target, allow_dismiss, offset_x, offset_y, animate_enter, animate_exit, newest_on_top){

    var options = {};
    if(icon!=null) options.icon = icon;
    if(title!=null) options.title = title;
    if(message!=null) options.message = message;
    if(url!=null) options.url = url;
    if(target!=null) options.target = target;

    var settings = {};
    if(type!=null) settings.type = type;
    if(allow_dismiss!=null) settings.allow_dismiss = allow_dismiss;
    settings.delay = 5;
    if(delay!=null) settings.delay = delay;

    return $.notify(options,settings, delay);

}
*/
