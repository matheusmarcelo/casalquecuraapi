"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DITokensService = exports.DITokensRepository = void 0;
var DITokensRepository;
(function (DITokensRepository) {
    DITokensRepository["CUSTOMER_REPOSITORY"] = "ICustomerRepository";
    DITokensRepository["ACTIVITY_REPOSITORY"] = "IActivityRepository";
    DITokensRepository["CUSTOMER_ACTIVITY_REPOSITORY"] = "ICustomerActivityRepository";
    DITokensRepository["LINKED_USERS_REPOSITORY"] = "ILinkedUsersRepository";
    DITokensRepository["RESET_PASSWORD_REPOSITORY"] = "IResetPasswordRepository";
    DITokensRepository["DALY_ACTIVITIES_REPOSITORY"] = "IDalyActivitiesRepository";
    DITokensRepository["MONTH_ACTIVITIES_REPOSITORY"] = "IMonthActivitiesRepository";
})(DITokensRepository || (exports.DITokensRepository = DITokensRepository = {}));
var DITokensService;
(function (DITokensService) {
    DITokensService["CUSTOMER_SERVICE"] = "ICustomerService";
    DITokensService["ACTIVITY_SERVICE"] = "IActivityService";
    DITokensService["CUSTOMER_ACTIVITY_SERVICE"] = "ICustomerActivityService";
    DITokensService["LINKED_USERS_SERVICE"] = "ILinkedUsersService";
    DITokensService["AUTH_SERVICE"] = "IAuthService";
})(DITokensService || (exports.DITokensService = DITokensService = {}));
//# sourceMappingURL=DITokens.enum.js.map