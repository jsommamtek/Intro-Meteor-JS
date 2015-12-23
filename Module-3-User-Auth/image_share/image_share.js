Images = new Mongo.Collection('images');
console.log(Images.find().count());

if (Meteor.isClient) {
   console.log('I am the client');

   console.log(Meteor.user());

   Session.set('imgLimit', 6);

   // Handle infinite scroll
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

   Accounts.ui.config({
      passwordSignupFields: 'USERNAME_AND_EMAIL'
   });

   // Common helper functions
   GetUserName = function(userId) {
      var user = Meteor.users.findOne({ _id: userId})
      if (user) {
         return user.username;
      } else {
         return 'anonymous';
      }
   }

   // Bind the helper functions for the 'images' template
   Template.images.helpers({
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

   // Bind and handle click event on images template
   Template.images.events({

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
         $('#imageAddForm').modal('show');
      },

      'click .js-set-usr-img-filter': function (event) {
         Session.set('userImgFilter', this.createdBy);
      },

      'click .js-remove-usr-img-filter': function (event) {
         Session.set('userImgFilter', null);
      }
   });

   // Bind and handle submit event on imageAddForm template
   Template.imageAddForm.events({
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
         $('#imageAddForm').modal('hide');
         return false;
      }
   });
}
