/// Routes
Router.configure({
   layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
     to: 'navbar'
  });
  this.render('welcome', {
     to: 'main'
  });
});

Router.route('/images', function () {
  this.render('navbar', {
     to: 'navbar'
  });
  this.render('addImage', {
     to: 'modal'
  });
  this.render('listImages', {
     to: 'main'
  });
});

Router.route('/showimage/:_id', function () {
  this.render('navbar', {
     to: 'navbar'
  });
  this.render('showImage', {
     to: 'main',
     data: function () {
        return Images.findOne({ _id: this.params._id});
     }
  });
});
