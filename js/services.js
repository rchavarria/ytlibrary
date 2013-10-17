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
            var library = {
                name: "default",
                videos: []
            };

            return {
                // returns the library of a user
                getLibrary: function (user, readLibraryData) {
                    console.log("returning library for user: " + user);
                    readLibraryData(library);
                },

                // adds a video to a user's library
                addVideo: function (user, video, readLibraryData) {
                    library.videos.push( { 
                        id: video.id,
                        title: video.title
                    });
                    
                    readLibraryData(library);
                },

                // removes a video from a user's library
                removeVideo: function (user, videoId, readLibraryData) {
                    for(var i = 0, len = library.videos.length; i < len; i++) {
                        var v = library.videos[i];

                        if(v.id === videoId) {
                            library.videos.splice(i, 1); //removes 'i'th element 
                            break;
                        }
                    }

                    readLibraryData(library);
                }
            };
        });
}());
