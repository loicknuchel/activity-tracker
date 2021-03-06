(function(){
  'use strict';
  angular.module('app')
    .factory('Utils', Utils);

  function Utils($q, $timeout){
    return {
      createUuid: createUuid,
      dateFormat: dateFormat,
      dateParse: dateParse,
      realAsync: realAsync,
      padLeft: padLeft,
      encodeUTF8: encodeUTF8,
      decodeUTF8: decodeUTF8
    };

    function createUuid(){
      function S4(){ return (((1+Math.random())*0x10000)|0).toString(16).substring(1); }
      return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0,3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    }

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
