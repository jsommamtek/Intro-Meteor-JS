if (Meteor.isClient) {
  // counter starts at 0

  Template.time.helpers({
    time: function () {
      return new Date();
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
