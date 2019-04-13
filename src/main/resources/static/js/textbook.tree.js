/*
 * textbook.tree.js
 * Chat feature module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, textbook */

textbook.tree = (function () {
  var
    configMap = {
      main_html : String() + '',
      settable_map : {set_tree_anchor : true},
      set_tree_anchor : null
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap, configModule, initModule,
    zTree
    ;
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
        $container  : $container,
        $bookTree   : $( '#bookTree' ),
        $selectAll  : $( '#selectAll' )
    };
  };
  configModule = function ( input_map ) {
    textbook.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  initModule = function ( $container ) {
    stateMap.$container = $container;
    setJqueryMap();
    zTree = $.fn.zTree.getZTreeObj("bookTree");
        var zNodes = [
            { id: 1, pId: 0, name: "父节点 1", open: true },
            { id: 11, pId: 1, name: "叶子节点 1-1" },
            { id: 12, pId: 1, name: "叶子节点 1-2" },
            { id: 13, pId: 1, name: "叶子节点 1-3" },
            { id: 2, pId: 0, name: "父节点 2", open: true },
            { id: 21, pId: 2, name: "叶子节点 2-1" },
            { id: 22, pId: 2, name: "叶子节点 2-2" },
            { id: 23, pId: 2, name: "叶子节点 2-3" },
            { id: 3, pId: 0, name: "父节点 3", open: true },
            { id: 31, pId: 3, name: "叶子节点 3-1" },
            { id: 32, pId: 3, name: "叶子节点 3-2" },
            { id: 33, pId: 3, name: "叶子节点 3-3" }
        ];
        var className = "dark";

        function beforeDrag(treeId, treeNodes) {
            return false;
        }

        function beforeEditName(treeId, treeNode) {
            className = (className === "dark" ? "" : "dark");
            showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
            zTree.selectNode(treeNode);
            setTimeout(function() {
                if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
                    setTimeout(function() {
                        zTree.editName(treeNode);
                    }, 0);
                }
            }, 0);
            return false;
        }
    function selectAll() {
        zTree.setting.edit.editNameSelectAll = jqueryMap.$selectAll.attr("checked");
    }
    $.fn.zTree.init(jqueryMap.$bookTree, {
       view: {
           selectedMulti: false
       },
       data: {
           simpleData: {
               enable: true
           }
       }
   }, zNodes);
    jqueryMap.$selectAll.bind("click", selectAll);
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());