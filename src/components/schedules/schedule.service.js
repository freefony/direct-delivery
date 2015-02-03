/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(AuthService, couchdb, couchUtil, utility, dbService){


    this.all = function() {

      var params = couchUtil.key(AuthService.currentUser.name + '-' + utility.formatDate(new Date()));
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView('daily-deliveries/by-driver-date', params);
    };

    this.getDaySchedule = function(driverId, date) {

      return this.all()
        .then(couchUtil.pluckDocs)
        .then(utility.first);
    };
  });