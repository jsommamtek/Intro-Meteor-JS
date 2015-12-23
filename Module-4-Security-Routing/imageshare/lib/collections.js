Images = new Mongo.Collection('images');

//console.log(Images.find().count());

// setup security for images collection

Images.allow({
   // insert: function(userId, doc) {
   //    if (Meteor.user()) {
   //       if (userId !== doc.createdBy) {
   //          return false;
   //       } else { // user ids don't match
   //          return true;
   //       }
   //    } else { //user is not logged in
   //       return false;
   //    }
   // },

  insert:function(userId, doc){
    if (Meteor.isServer){
      console.log("insert on server");
    }
    if (Meteor.isClient){
      console.log("insert on client");
    }
    if (Meteor.user()){
      return true;
    } else {
      return false;
    }
  },


   update: function(userId, doc) {
      if (Meteor.user()) {
         return true;
      } else {
         return false;
      }
   },
   remove: function(userId, doc) {
      if (Meteor.user()) {
         if (userId !== doc.createdBy) {
            return false;
         } else { // user ids don't match
            return true;
         }
      } else { //user is not logged in
         return false;
      }   }
});

