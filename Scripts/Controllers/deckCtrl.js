'use strict';

angular.module('app').controller('deckCtrl', function ($scope, deckStorage) {

    $scope.deckStorage = deckStorage;

    $scope.$watch('deckStorage.data', function() {
        $scope.deckList = $scope.deckStorage.data;
    });

    $scope.deckStorage.findAll(function(data){
        $scope.deckList = data;
        $scope.$apply();
    });

    $scope.add = function() {
        deckStorage.add($scope.newContent);
        $scope.newContent = '';
    }

    $scope.remove = function(deck) {
        deckStorage.remove(deck);
    }

    $scope.removeAll = function() {
        deckStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        deckStorage.sync();
    }

});