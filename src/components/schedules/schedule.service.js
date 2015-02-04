/**
 * Created by ehealthafrica on 12/12/14.
 */
'use strict';

angular.module('schedules')
  .service('scheduleService', function(user, dbService, couchUtil, utility) {

    this.all = function(driverId, date) {
      var dId = driverId || AuthService.currentUser.name,
          deliveryDate = date || new Date();

      var params = couchUtil.key(dId + '-' + utility.formatDate(deliveryDate));
      /*eslint-disable camelcase */
      params.include_docs = true;
      /*eslint-enable camelcase */
      return dbService.getView('daily-deliveries/by-driver-date', params);
    };

    this.getDaySchedule = function(driverId, date) {

      return this.all(driverId, date)
        .then(couchUtil.pluckDocs)
        .then(utility.first);
    };
  });
