Redly.Views.entryListItem = Backbone.View.extend({
  tagName: 'li',

  template: JST['entries/list_item'],

  events: {
    "click .rate-entry": "handleRating"
  },

  handleRating: function(event){
    var score = this.$('.rate-entry').raty('score');
    var entryId = this.model.id;
    $.ajax({
    type: 'POST',
    url: '/ratings',
    data: {entry_id: entryId, entry_val: score} ,
    success: function(msg) {
      if (msg == "Updated rating."){
        console.log("Updated successfully.");
      } else {
        console.log("Added rating successfully.");
      }
      },
    error: function(msg){
      console.log("Error updating rating.");
      }
    });
  },

  render: function(){
    var content = this.template({entry: this.model});
    this.$el.html(content);

    return this;
  },

  onRender: function () {
    this.$('.rate-entry').empty();
    this.$('.rate-entry').raty({
      half: true
    });
  }
});
