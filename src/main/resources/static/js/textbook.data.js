/*
 * textbook.data.js
 * Data module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, textbook */

textbook.data = (function () {
    var
        query, save
    ;
    query = function( url ) {
        return $.ajax({
                 url : url,
                type : "get",
            dateType : 'json'
        });
    };
    save = function( url ) {
        return
        $.ajax({
                 url : url,
                type : "post",
            dateType : 'json'
        });
    };
    return {
        query : query,
        save  : save
    };
}());