/*jslint unparam: true */
(function () {
    'use strict';
    /**
        Services factories to reuse code y the app
    */

    angular.module('youtubelib.services', []).
        // service to search text on youtube
        factory("YoutubeSearch", function ($http) {
            return {
                search: function (criteria, gatherResults) {
                    var url = "https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc" +
                              "&max-results=" + criteria.firstNResults +
                              "&q=" + criteria.text;

                    $http.get(url).
                        success(function (results) {
                            gatherResults(results.data.items);
                        });
                }
            };
        }).
        // service to the backend, when the library handle happens
        factory("UserLibrary", function ($http) {
            return {
                // returns the library of a user
                getLibrary: function (user, readLibraryData) {
                    $http.get("get_library.php?user=" + user).
                        success(function (data) {
                            readLibraryData(data);
                        });
                },

                // adds a video to a user's library
                addVideo: function (user, video, readLibraryData) {
                    $http.get("add_video.php?user=" + user + "&id=" + video.id + "&title=" + video.title).
                        success(function (data) {
                            readLibraryData(data);
                        });
                },

                // removes a video from a user's library
                removeVideo: function (user, videoId, readLibraryData) {
                    $http.get("remove_video.php?user=" + user + "&id=" + videoId).
                        success(function (data) {
                            readLibraryData(data);
                        });
                }
            };
        });
}());
