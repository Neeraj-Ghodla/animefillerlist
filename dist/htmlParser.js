"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var helpers_1 = require("./helpers");
var HtmlParser = /** @class */ (function () {
    function HtmlParser() {
    }
    HtmlParser.prototype.parseListShows = function (html) {
        var dom = new jsdom_1.JSDOM(html);
        var showList = dom.window.document.querySelector('#ShowList');
        var showGroups = showList.querySelectorAll('.Group');
        var shows = Array.from(showGroups)
            .map(function (showGroup) { return showGroup.querySelectorAll('ul > li > a'); })
            .map(function (showGroup) { return Array.from(showGroup); })
            .flat();
        return Array.from(shows)
            .filter(helpers_1.notEmpty)
            .map(function (show) { return show.textContent; })
            .filter(helpers_1.notEmpty);
    };
    HtmlParser.prototype.parseShow = function (html) {
        var dom = new jsdom_1.JSDOM(html);
        var episodeList = dom.window.document.querySelector('table > .EpisodeList');
        var episodes = Array.from(episodeList.querySelectorAll('tr'))
            .filter(function (episode) { return episode.id.startsWith('eps'); });
        return episodes.map(function (episode) { return ({
            number: parseInt(episode.querySelector('.Number').textContent, 10),
            title: episode.querySelector('.Title').textContent,
            type: episode.querySelector('.Type').textContent,
            airDate: new Date(episode.querySelector('.Date').textContent),
        }); });
    };
    return HtmlParser;
}());
exports.default = HtmlParser;
