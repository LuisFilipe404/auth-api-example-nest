"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const rate_limiter_middleware_1 = require("../../middleware/rate-limiter.middleware");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(rate_limiter_middleware_1.RateLimiterMiddleware).forRoutes('auth/login');
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: '018a17c8-682d-11ee-8c99-0242ac120002',
                signOptions: { expiresIn: '10d' },
            }),
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map