(function (window) {

  'use strict';
  var App = window.App || {};

  function Truck(truckID, db) {
    this.truckID = truckID;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order){
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  }

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function () {

    //So this is fucked... the print orders function has context of "this"
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');

    //But the forEach doesn't for some reason that I don't quite get..
    customerIdArray.forEach(function (id) {
        console.log(this.db.get(id));
        //adding the bind passed the context of this into the function implicitly.
      }.bind(this));

  };

  App.Truck = Truck;
  window.App = App;
})(window);
