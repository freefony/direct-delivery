'use strict';

/**
 * @name pouchdbService
 *
 */
angular.module('db')
  .service('pouchdbService', function($window, pouchDB, config){

    var _this = this;

    // TODO: PouchDB should be able to detect supported adapters itself.
    //       See item:1156
    function hasWebSQL() {
      return $window.openDatabase;
    }

    /**
     * we set default adapter to 'websql' because of the following:
     * 1. it is fast and
     * 2. the target device  "explore rangerx" supports websql by default.
     *
     * @param dbName
     * @returns {*}
     */
    _this.create = function(dbName, opt) {
      var options = opt || {
        /*eslint-disable camelcase */
        /*jshint camelcase:false */
        auto_compaction: true
        /*eslint-enable camelcase */
      };

      if (hasWebSQL()) {
        options.adapter = 'websql';
      } else {
        options.adapter = 'idb';
      }
      return pouchDB(dbName, options);
    };

    _this.remote = function(dbUrl, options) {
      return pouchDB(dbUrl, options);
    };

    _this.getDesignDocs = function(db, ddIds) {
      var options = {
        keys: ddIds
      };
      db = _this.create(db);
      return db.allDocs(options);
    };

    _this.query = function(viewName, param){
      var dbName = config.localDB;
      var db = _this.create(dbName);
      return db.query(viewName, param)
        .then(function(response){
          return response;
        })
        .catch(function(err){
          console.log(err);
        })
    }
  });
