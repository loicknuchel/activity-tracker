(function(){
  'use strict';
  angular.module('app')
    .factory('FilePathPlugin', FilePathPlugin);

  // for FilePath plugin : cordova-plugin-filepath (https://github.com/hiddentao/cordova-plugin-filepath)
  function FilePathPlugin($window, $q, PluginUtils){
    var pluginName = 'FilePath';
    var pluginTest = function(){ return $window.FilePath; };
    return {
      resolveNativePath: resolveNativePath
    };

    function resolveNativePath(path){
      return PluginUtils.onReady(pluginName, pluginTest).then(function(){
        var defer = $q.defer();
        $window.FilePath.resolveNativePath(path, function(newPath){
          defer.resolve(newPath);
        }, function(err){
          defer.reject(err);
        });
        return defer.promise;
      });
    }
  }


  /**************************
   *                        *
   *      Browser Mock      *
   *                        *
   **************************/
  ionic.Platform.ready(function(){
    if(!(ionic.Platform.isAndroid() || ionic.Platform.isIOS() || ionic.Platform.isIPad())){
      if(!window.FilePath){
        window.FilePath = {
          resolveNativePath: function(path, successCallback, failCallback){
            successCallback(path);
          }
        };
      }
    }
  });
})();
