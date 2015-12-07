(function(){
  'use strict';
  angular.module('app')
    .factory('Utils', Utils);

  function Utils($q, $timeout){
    return {
      dateFormat: dateFormat,
      dateParse: dateParse,
      realAsync: realAsync,
      padLeft: padLeft,
      encodeUTF8: encodeUTF8,
      decodeUTF8: decodeUTF8
    };

    function dateFormat(timestamp){
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }

    function dateParse(dateStr){
      return moment(dateStr).valueOf();
    }

    function realAsync(fn){
      var defer = $q.defer();
      $timeout(function(){
        defer.resolve(fn());
      }, 0);
      return defer.promise;
    }

    function padLeft(num, length, char){
      var res = num.toString();
      while(res.length < length){
        res = char+res;
      }
      return res;
    }

    function encodeUTF8(string){
      try {
        return unescape(encodeURIComponent(string));
      } catch(e){
        return string;
      }
    }

    function decodeUTF8(string){
      try {
        return decodeURIComponent(escape(string));
      } catch(e){
        return string;
      }
    }
  }
})();
