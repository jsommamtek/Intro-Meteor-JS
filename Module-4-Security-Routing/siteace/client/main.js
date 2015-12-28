

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
      return Websites.find({},
         {
            sort: { upVotes: -1, 'createdOn': -1 }
         });
   }
});

Template.listWebsiteItem.helpers({
   currentOwner: function (createdBy) {
      if (Meteor.user()._id === createdBy) {
         return true;
      } else {
         return false;
      }
   },
   getUserName: function (userId) {
      return GetUserName(userId);
   }
});

Template.showWebsiteDetail.helpers({
   getUserName: function (userId) {
      return GetUserName(userId);
   }
});

Template.listSiteComments.helpers({
   comments: function () {
      return Comments.find({ siteId: this._id },
         {
            sort: { 'postedDate': -1 }
         });
   },
   getUserName: function (userId) {
      return GetUserName(userId);
   }
});

//initialize all tooltips in this template
Template.listWebsiteItem.onRendered(function() {
   this.$('[data-toggle="tooltip"]').tooltip();
});

/////
// template events
/////

Template.listWebsiteItem.events({

   "click .js-upvote":function(event){
      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;

      // put the code in here to add a vote to a website!
      Websites.update({ '_id': website_id }, { $inc: { 'upVotes': 1 } });

      return false;  // prevent the button from reloading the page
   },

   "click .js-downvote":function(event){

      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;

      // put the code in here to remove a vote from a website!
      Websites.update({ '_id': website_id }, { $inc: { 'downVotes': 1 } });

      return false;  // prevent the button from reloading the page
   },
      "click .js-delete-site":function(event){

      // example of how you can access the id for the website in the database
      // (this is the data context for the template)
      var website_id = this._id;

      //  remove website
      $('#' + website_id).hide('slow', function() {
         Websites.remove({ _id: website_id });
      });

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

      var title = event.target.title.value;
      var description = event.target.description.value;

      //  put your website saving code in here!
      Websites.insert({
         title: title,
         url: url,
         description: description,
         upVotes: 0,
         downVotes: 0,
         createdOn: new Date(),
         createdBy: Meteor.user()._id
      });

      $("#addWebsite").toggle('slow');

      return false;  // stop the form submit from reloading the page
   }
});

Template.showWebsiteDetail.events({

   "submit .js-save-comment-form": function (event) {

      var comment = event.target.comment.value;
      var postedBy = Meteor.user()._id;
      var postedDate = new Date();
      var siteId = this._id;

      //  put your comment saving code in here!
      Comments.insert({
         comment: comment,
         postedBy: postedBy,
         postedDate: postedDate,
         siteId: siteId
      });

      $("#comment").val('');

      return false;  // stop the form submit from reloading the page
   }
});
