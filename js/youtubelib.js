/*jslint unparam: true, regexp: true */
/*global angular, USER_NAME:true, document*/
(function () {
    'use strict';

    // Declare app level module which depends on filters, and services
    var youtubelib = angular.module('youtubelib', ["ngAnimate", "youtubelib.services", "youtubelib.directives"]).
        config(function ($sceDelegateProvider) {
            // allow AngularJS to access youtube, vimeo and localhost
            // for more info, check: http://blog.jongallant.com/2013/09/scedelegate-plicy-insecurl.html#.Ulq2BHiJQ9c
            $sceDelegateProvider.resourceUrlWhitelist([/\.*/]);
        });

    youtubelib.controller("LibraryCtrl", function ($scope, UserLibrary, YoutubeSearch) {
        // initialize model
        $scope.htmlEmbededVideo = "";
        $scope.shouldShowVideoClass = "hide";
        $scope.shouldShowSearchClass = "hide";
        $scope.currentVideo = {};
        $scope.criteria = {
            firstNResults: 5
        };
        UserLibrary.getLibrary(USER_NAME, function (library) {
            USER_NAME = library.name;
            $scope.library = library;
        });

        $scope.showVideo = function (video) {
            // sets the current video to show
            $scope.currentVideo = video;
            $scope.currentVideo.url = "http://www.youtube.com/embed/" + video.id;

            $scope.shouldShowVideoClass = "show";
            $scope.shouldShowSearchClass = "hide";
        };

        $scope.showSearch = function () {
            // empty previous results, if any
            $scope.searchResults = [];

            $scope.shouldShowVideoClass = "hide";
            $scope.shouldShowSearchClass = "show";
        };

        $scope.search = function () {
            YoutubeSearch.search($scope.criteria, function (resultItems) {
                $scope.searchResults = resultItems;
            });
        };

        $scope.addVideo = function (videoId) {
            var video = {
                id: videoId,
                title: document.getElementById("title-" + videoId).value
            };

            UserLibrary.addVideo(USER_NAME, video, function (library) {
                // workaround to update library while dragging&dropping videos to the list
                $scope.$apply(function(scope) { scope.library = library; });
            });
        };

        $scope.removeVideo = function (videoId) {
            UserLibrary.removeVideo(USER_NAME, videoId, function (library) {
                $scope.library = library;
            });
        };
    });
}());