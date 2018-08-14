(function (window) {
  'use strict';
  // Essentially making a singleton in JS... Get the Window.App or make a new one. The array in JS has functions which
  //  work out of the box. (Add, delete, return... )
  var App = window.App || {};

  function DataStore(){
    this.data = {};
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
  };

 DataStore.prototype.get = function (key) {
   return this.data[key];
  };

 DataStore.prototype.getAll = function () {
   return this.data;
 };

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
  };


App.DataStore = DataStore;
window.App = App;
})(window);
