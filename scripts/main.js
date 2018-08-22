(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var RemoteDataStore = App.RemoteDataStore;
    var CheckList = App.CheckList;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('MyTruck', remoteDS);


    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);


    //We pass in the "deliverOrder" function to the clickListener to handle both items at once..
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(
     function (data) {
         return myTruck.createOrder.call(myTruck, data)
                .then(function () {
                        checkList.addRow.call(checkList, data);
                    }
                );

        }
    );


    console.log(formHandler);

    myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
