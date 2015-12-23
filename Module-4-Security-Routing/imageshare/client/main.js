//console.log('I am the client');

//console.log(Meteor.user());

/// Infinite scroll
Session.set('imgLimit', 6);

var lastScrollTop = 0;

$(window).scroll (function (event) {

   // Test if we are near the bottom of the window
   if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

      // where are we in the page?
      var scrollTop = $(this).scrollTop();

      // test if we are going down
      if (scrollTop > lastScrollTop) {

         //console.log(new Date());

         // yes we are heading down...
         Session.set("imgLimit", Session.get("imgLimit") + 3);
      }

      // Reset the new last scroll top
      lastScrollTop = scrollTop;
   }
});

/// Configure accounts form fields
Accounts.ui.config({
   passwordSignupFields: 'USERNAME_AND_EMAIL'
});

/// Common helper functions
GetUserName = function(userId) {
   var user = Meteor.users.findOne({ _id: userId})
   if (user) {
      return user.username;
   } else {
      return 'anonymous';
   }
}

/// Bind the helper functions for the 'images' template
Template.listImages.helpers({
   images: function () {
      if (Session.get('userImgFilter')) {

         return Images.find(
            {
               createdBy: Session.get('userImgFilter')
            },
            {
               sort: { 'createdOn': -1, 'rating': -1 },
               limit: Session.get('imgLimit')
            });

      } else {

         return Images.find({},
            {
               sort: { 'createdOn': -1, 'rating': -1 },
               limit: Session.get('imgLimit')
            });
      }
   },

   filteringImages: function () {
      return (Session.get('userImgFilter')) ? true : false;
   },

   getUserName: function (userId) {
      return GetUserName(userId);
   },

   getFilteredUserName: function () {
      if (Session.get('userImgFilter')) {
         return GetUserName(Session.get('userImgFilter'));
      }
   }
});

Template.body.helpers({username: function() {
   if (Meteor.user()) {
      return Meteor.user().username;
   }
}});

/// Bind and handle click event on listImages template
Template.listImages.events({

   'click .js-image': function (event) {
      //$(event.target).css('width', '50px');
   },

   'click .js-del-image': function (event) {
      var imgId = this._id;

      $('#' + imgId).hide('slow', function () {
         Images.remove({ '_id': imgId });
      });
   },

   'click .js-rate-image': function (event) {
      var rating = $(event.currentTarget).data('userrating');
      var imgId = this.ratingId;

      if (Meteor.user()) {
         Images.update({ '_id': imgId }, { $set: { 'rating': rating } });
      }
   },

   'click .js-show-image-form': function (event) {
      console.log('add image button was clicked');
      $('#addImage').modal('show');
   },

   'click .js-set-usr-img-filter': function (event) {
      Session.set('userImgFilter', this.createdBy);
   },

   'click .js-remove-usr-img-filter': function (event) {
      Session.set('userImgFilter', null);
   }
});

/// Bind and handle submit event on addImage template
Template.addImage.events({
   'submit .js-add-image': function (event) {
      var imgSrc, imgAlt;

      imgSrc = event.target.imgSrc.value;
      imgAlt = event.target.imgAlt.value;

      Images.insert({
         img_src: imgSrc,
         img_alt: imgAlt,
         createdOn: new Date(),
         createdBy: Meteor.user()._id
      });
      $('#addImage').modal('hide');
      return false;
   }
});