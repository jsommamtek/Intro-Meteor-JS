Images = new Mongo.Collection('images');
console.log(Images.find().count());

if (Meteor.isClient) {
   console.log('I am the client');

   // Bind the helper function to the 'images' template
   Template.images.helpers({ images: Images.find({}, { sort: { 'created_on': -1, 'rating': -1 } }) });

   // Bind and handle click event on images
   Template.images.events({
      'click .js-image': function (event) {
         $(event.target).css('width', '50px');
      },
      'click .js-del-image': function (event) {
         var imgId = this._id;

         $('#' + imgId).hide('slow', function () {
            Images.remove({ '_id': imgId });
         });
      },
      'click .js-rate-image': function (event) {
         var rating = $(event.currentTarget).data('userrating');
         console.log('you clicked on the stars: ' + rating);
         var imgId = this.ratingId;
         console.log(imgId);

         Images.update({ '_id': imgId }, { $set: { 'rating': rating } });
      },
      'click .js-show-image-form': function (event) {
         $('#imageAddForm').modal('show');
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
            created_on: new Date()
         });
         $('#imageAddForm').modal('hide');
         return false;
      }
   });
}
