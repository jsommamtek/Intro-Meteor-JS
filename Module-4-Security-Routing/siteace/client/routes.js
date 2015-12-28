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

Router.route('/sitedetail/:_id', function () {
   this.render('navbar', {
      to: 'navbar'
   });
   this.render('showWebsiteDetail', {
      to: 'main',
      data: function () {
         return Websites.findOne({ _id: this.params._id });
      }
   });
});