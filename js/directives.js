/*jslint unparam: true */
(function () {
    'use strict';
    /**
        AngularJS module to create the project's directives
    **/

    angular.module('youtubelib.directives', []).
        // directive to handle when a drag&drop operation starts
        directive("dndOrigin", function () {
            return {
                restrict: 'A',

                link: function (scope, el, attrs) {
                    el.bind("dragstart", function (e) {
                        // sets the data to transfer to the drag&drop target
                        e.dataTransfer.setData("text", e.target.id);
                    });
                }
            };
        }).

        // directive to handle when a drag&drop operation finishes
        directive("dndTarget", function () {
            return {
                restrict: 'A',

                link: function (scope, el, attrs) {
                    el.bind("dragover", function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                        if (e.stopPropogation) {
                            e.stopPropogation();
                        }

                        // enables the drag&drop
                        e.dataTransfer.dropEffect = "move";
                    });

                    el.bind("drop", function (e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                        if (e.stopPropogation) {
                            e.stopPropogation();
                        }

                        // gets the transfer's data and add the corresponding video
                        var originId = e.dataTransfer.getData("text");
                        scope.addVideo(originId);
                    });
                }
            };
        });
}());
