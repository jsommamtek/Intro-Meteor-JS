if (Meteor.isClient) {
   console.log('I am the client');

   var img_data = [
      {
         img_src:'k2.jpg',
         img_alt:'a big mountain called k2 is here'
      },
      {
         img_src:'inspired.jpg',
         img_alt:'a little inspiration'
      },
      {
         img_src:'giants.png',
         img_alt:'my favorite football team'
      }
   ];

   // Bind the helper function to the 'images' template
   Template.images.helpers({images:img_data});

   // Bind and handle click event on images
   Template.images.events({
      'click .js-image': function(event){
         //console.log(event);
         $(event.target).css('width', '50px');
      }
   });

}

if (Meteor.isServer) {
   console.log('I am the server');
}
