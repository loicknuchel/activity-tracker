(function(){
  'use strict';
  angular.module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  function SettingsCtrl($scope, Storage, FilePlugin, EmailComposerPlugin){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    fn.backupData = function(){
      var filename = 'ActivityTracker-db-'+Date.now()+'.json';
      return Storage.getDb().then(function(db){
        return createDbFile(filename, db);
      }).then(function(fileEntry){
        return sendEmail(fileEntry);
      }).then(function(){
        FilePlugin.removeFile(filename, cordova.file.externalDataDirectory);
      });
    };

    function createDbFile(filename, db){
      var content = JSON.stringify(db);
      return FilePlugin.createFile(filename, content, cordova.file.externalDataDirectory);
    }
    function sendEmail(fileEntry){
      return EmailComposerPlugin.open({
        subject: '[ActivityTracker] db backup',
        body: ['Bonjour,',
               '',
               'Merci de trouver en pièce jointe le backup des données de l\'application Activity Tracker.',
               '',
               'Cordialement,',
               ''].join('<br>'),
        isHtml:  true,
        attachments: fileEntry.nativeURL
      }, 'gmail');
    }
  }
})();
