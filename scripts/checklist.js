(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector){
        if(!selector){
            throw new Error('No Checklist Selector provided');
        }

        this.$element = $(selector);

        if (this.$element.length ===0){
            throw new Error('Could not find element with selector: ' + selector);
        }
    }


    //The objective of this call is to call the truck order function and remove the row at the same time...
    // "FN" is passed in when set the listener...  and then we execute it here..
    CheckList.prototype.addClickHandler = function (fn) {

        //Fire the listener when needed
        this.$element.on('click', 'input', function (event) {

            //The value of the checkbox is the email address
            var email = event.target.value;
            //remove the proper row
            this.removeRow(email);
            //execute deliverOrder on the truck
            fn(email);

        }.bind(this));
    };

    CheckList.prototype.addRow = function(CoffeeOrder){

        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);

        //Create a new instance of a row user the coffee order info
        var rowElement = new Row(CoffeeOrder);

        //Add the new row instance $element property to the checklist
        this.$element.append(rowElement.$element);
    }

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="'+email+'"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    }

    function Row(coffeeOrder){
        var $newDiv = $('<div></div>',{
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $newLabel = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';

        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $newLabel.append($checkbox);
        $newLabel.append(description);
        $newDiv.append($newLabel);

        this.$element = $newDiv;
    }

    App.CheckList = CheckList;
    window.App = App;

})(window);