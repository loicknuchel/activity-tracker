(function(){
  'use strict';
  angular.module('app')
    .factory('Storage', Storage)
    .factory('_StorageUtils', _StorageUtils) // private service, should not be used outside this file !!!
    .factory('_SQLiteUtils', _SQLiteUtils); // private service, should not be used outside this file !!!

  function Storage(_StorageUtils){
    var keys = {
      activityStart: 'activity-',
      activity: function(id){ return this.activityStart+id; }
    };
    return {
      // activities
      getActivity: getActivity,
      setActivity: setActivity,
      getActivities: getActivities,
      // global
      clear: clear
    };

    function getActivity(id){
      return _StorageUtils.get(keys.activity(id));
    }

    function setActivity(activity){
      if(activity && activity.id){
        return _StorageUtils.set(keys.activity(activity.id), activity);
      } else {
        return $q.reject({message: 'Activity has no parameter <id>'});
      }
    }

    function getActivities(){
      return _StorageUtils.getStartsWith(keys.activityStart);
    }

    function clear(){
      return _FilesystemUtils.clear().then(function(){
        return _StorageUtils.clear();
      });
    }
  }

  function _StorageUtils($q, $log, _SQLiteUtils, Utils){
    var useStorage = true; // if false, only the cache will be used, data won't be persistent
    var storagePrefix = ''; // to prefix all entries
    var storageCache = {};
    var promiseStorageCache = {};
    var keysCache = null;
    var keysCachePromise = null;
    var storage = _SQLiteUtils;
    return {
      get: get,
      getStartsWith: getStartsWith,
      getEndsWith: getEndsWith,
      set: set,
      remove: remove,
      clear: clear
    };

    function get(key, _defaultValue){
      if(storageCache[key]){
        return Utils.realAsync(function(){ return angular.copy(storageCache[key]); });
      } else if(promiseStorageCache[key]){
        return promiseStorageCache[key];
      } else {
        if(useStorage){
          promiseStorageCache[key] = storage.getItem(storagePrefix+key).then(function(value){
            try {
              storageCache[key] = JSON.parse(value) || angular.copy(_defaultValue);
            } catch(e) {
              storageCache[key] = angular.copy(_defaultValue);
            }
            delete promiseStorageCache[key];
            return angular.copy(storageCache[key]);
          }, function(error){
            $log.error('Unable to _StorageUtils.get('+key+') !!!', error);
            delete promiseStorageCache[key];
          });
          return promiseStorageCache[key];
        } else {
          storageCache[key] = angular.copy(_defaultValue);
          return Utils.realAsync(function(){ return angular.copy(storageCache[key]); });
        }
      }
    }

    function getStartsWith(keyStart, _defaultValue){
      return _getKeys().then(function(keys){
        var matchingKeys = _.filter(keys, function(key){
          return key && key.startsWith(keyStart);
        });
        var promises = _.map(matchingKeys, function(key){
          return get(key, _defaultValue);
        });
        return $q.all(promises);
      });
    }

    function getEndsWith(keyEnd, _defaultValue){
      return _getKeys().then(function(keys){
        var matchingKeys = _.filter(keys, function(key){
          return key && key.endsWith(keyEnd);
        });
        var promises = _.map(matchingKeys, function(key){
          return get(key, _defaultValue);
        });
        return $q.all(promises);
      });
    }

    function set(key, value){
      if(!angular.equals(storageCache[key], value)){
        storageCache[key] = angular.copy(value);
        _setKey(key);
        if(useStorage){
          return storage.setItem(storagePrefix+key, JSON.stringify(storageCache[key])).then(function(value){
            // return nothing !
          }, function(error){
            $log.error('error in LocalForageUtils._set('+key+')', error);
          });
        } else {
          return $q.when();
        }
      } else {
        //$log.debug('Don\'t save <'+key+'> because values are equals !', value);
        return $q.when();
      }
    }

    function remove(key){
      delete storageCache[key];
      _removeKey(key);
      if(useStorage){
        return storage.removeItem(storagePrefix+key);
      } else {
        return $q.when();
      }
    }

    function clear(){
      storageCache = {};
      _clearKeys();
      if(useStorage){
        return storage.clear();
      } else {
        return $q.when();
      }
    }

    function _getKeys(){
      if(keysCache){
        return Utils.realAsync(function(){ return angular.copy(keysCache); });
      } else if(keysCachePromise){
        return keysCachePromise;
      } else {
        if(useStorage){
          keysCachePromise = storage.keys().then(function(keys){
            keysCache = keys;
            keysCachePromise = null;
            return angular.copy(keysCache);
          }, function(error){
            $log.error('Unable to _StorageUtils._getKeys() !!!', error);
            keysCachePromise = null;
          });
          return keysCachePromise;
        } else {
          keysCache = [];
          for(var i in storageCache){
            keysCache.push(i);
          }
          return Utils.realAsync(function(){ return angular.copy(keysCache); });
        }
      }
    }

    function _setKey(key){
      if(keysCache){
        if(keysCache.indexOf(key) < 0){
          keysCache.push(key);
        }
      } else if(keysCachePromise){
        keysCachePromise.then(function(){
          _setKey(key);
        });
      }
    }

    function _removeKey(key){
      if(keysCache){
        if(keysCache.indexOf(key) >= 0){
          keysCache.splice(keysCache.indexOf(key), 1);
        }
      } else if(keysCachePromise){
        keysCachePromise.then(function(){
          _removeKey(key);
        });
      }
    }

    function _clearKeys(){
      if(keysCache){
        keysCache = null;
      } else if(keysCachePromise){
        keysCachePromise.then(function(){
          _clearKeys();
        });
      }
    }
  }

  function _SQLiteUtils(SQLitePlugin){
    var tableName = 'KeyValue';
    var onReady = _init();
    return {
      getItem: getItem,
      setItem: setItem,
      removeItem: removeItem,
      keys: keys,
      clear: clear
    };

    function getItem(key){
      return _query('SELECT value FROM '+tableName+' WHERE key = ? LIMIT 1', [key]).then(function(data){
        if(data.length > 0){
          return data[0].value;
        }
      });
    }

    function setItem(key, value){
      return _query('INSERT OR REPLACE INTO '+tableName+'(key, value) VALUES (?, ?)', [key, value]).then(function(data){
      });
    }

    function removeItem(key){
      return _query('DELETE FROM '+tableName+' WHERE key = ?', [key]).then(function(data){
      });
    }

    function keys(){
      return _query('SELECT key FROM '+tableName).then(function(data){
        return _.map(data, 'key');
      });
    }

    function clear(){
      return _query('DELETE FROM '+tableName).then(function(data){
      });
    }

    function _query(query, args){
      return onReady.then(function(db){
        return SQLitePlugin.query(db, query, args);
      });
    }

    function _init(){
      return SQLitePlugin.open().then(function(db){
        return SQLitePlugin.query(db, 'CREATE TABLE IF NOT EXISTS '+tableName+' (key text primary key, value text)').then(function(){
          return db;
        });
      });
    }
  }
})();
