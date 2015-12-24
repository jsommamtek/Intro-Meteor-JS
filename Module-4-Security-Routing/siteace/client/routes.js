Router.configure({
   layoutTemplate: 'AppLayout'
});

Router.route('/', function () {
   this.render('navbar', {
      to: 'navbar'
   });
  this.render('addWebsite', {
     to: 'modal'
  });
  this.render('listWebsites', {
     to: 'main'
  });
});