(function(){
  'use strict';
  angular.module('app')
    .factory('ActivityUi', ActivityUi);

  function ActivityUi($rootScope, $q, $ionicModal, Utils, ModalTmpl){
    return {
      createActivity: createActivity,
      editActivity: editActivity
    };
    
    function createActivity(){
      return _showActivityModal({
        title: _generateActivityName(),
        custom: {
          meal: {
            alone: false,
            screen: false,
            hungerBefore: 1,
            satietyAfter: 10,
            fulfilmentAfter: 1
          }
        }
      }).then(function(activity){
        activity.id = Utils.createUuid();
        activity.date = Date.now();
        activity.created = Date.now();
        activity.updated = Date.now();
        // TODO add location
        return activity;
      });
    }
    
    function editActivity(activity){
      return _showActivityModal(activity).then(function(updatedActivity){
        updatedActivity.updated = Date.now();
        return updatedActivity;
      });
    }

    function _generateActivityName(){
      var date = new Date();
      var hours = date.getHours();
      var suffix = hours < 11 ? 'Matin' : (hours < 15 ? 'Midi' : 'Soir');
      return moment().format('DD/MM')+' '+suffix;
    }

    function _showActivityModal(activity){
      var defer = $q.defer();
      var scope = $rootScope.$new(true);
      var data = {}, fn = {};
      scope.data = data;
      scope.fn = fn;
      data.activity = angular.copy(activity);
      fn.cancel = function(){
        scope.modal.hide().then(function(){
          return scope.modal.remove();
        }).then(function(){
          defer.reject();
        });
      };
      fn.save = function(){
        scope.modal.hide().then(function(){
          return scope.modal.remove();
        }).then(function(){
          defer.resolve(angular.copy(data.activity));
        });
      };
      $ionicModal.fromTemplateUrl(ModalTmpl.activityEdit, {
        scope: scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        scope.modal = modal;
        scope.modal.show();
      });
      return defer.promise;
    }
  }
})();
