

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

/////
// template helpers
/////

// helper function that returns all available websites
Template.listWebsites.helpers({
   websites:function(){
      return Websites.find({});
   }
});

/////
// template events
/////

Template.listWebsiteItem.events({

   "click .js-upvote":function(event){
      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Up voting website with id " + website_id);
      // put the code in here to add a vote to a website!

      return false;  // prevent the button from reloading the page
   },

   "click .js-downvote":function(event){

      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;
      console.log("Down voting website with id "+website_id);

      // put the code in here to remove a vote from a website!

      return false;  // prevent the button from reloading the page
   }
});

Template.addWebsite.events({

   "click .js-toggle-website-form":function(event){
      $("#addWebsite").toggle('slow');
   },

   "submit .js-save-website-form":function(event){

      // here is an example of how to get the url out of the form:
      var url = event.target.url.value;
      console.log("The url they entered is: "+url);

      //  put your website saving code in here!


      return false;  // stop the form submit from reloading the page
   }
});
