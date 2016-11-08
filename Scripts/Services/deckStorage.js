angular.module('app').service('deckStorage', function ($q) {
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        chrome.storage.sync.get('deck', function(keys) {
            if (keys.deck != null) {
                _this.data = keys.deck;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({deck: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var deck = {
            id: id,
            content: newContent,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(deck);
        this.sync();
    }

    this.remove = function(deck) {
        this.data.splice(this.data.indexOf(deck), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});