"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerActivityModule = void 0;
const common_1 = require("@nestjs/common");
const customer_activity_service_1 = require("./customer_activity.service");
const customer_activity_controller_1 = require("./customer_activity.controller");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
let CustomerActivityModule = class CustomerActivityModule {
};
exports.CustomerActivityModule = CustomerActivityModule;
exports.CustomerActivityModule = CustomerActivityModule = __decorate([
    (0, common_1.Module)({
        controllers: [customer_activity_controller_1.CustomerActivityController],
        providers: [
            {
                provide: DITokens_enum_1.DITokensService.CUSTOMER_ACTIVITY_SERVICE,
                useClass: customer_activity_service_1.CustomerActivityService
            }
        ],
    })
], CustomerActivityModule);
//# sourceMappingURL=customer_activity.module.js.map