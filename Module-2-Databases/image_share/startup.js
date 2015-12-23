if (Meteor.isServer) {
   Meteor.startup(function () {
      if (Images.find().count() === 0) {
         for (var i = 1; i <= 22; i++) {
            Images.insert(
               {
                  img_src: 'img_' + i + '.jpg',
                  img_alt: 'img_' + i + '.jpg'
               }
               );
         }
         console.log(Images.find().count());
      }
   });
}