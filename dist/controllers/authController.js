"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignupPage = exports.getSignupPage = exports.postLogoutPage = exports.postLoginPage = exports.getLoginPage = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const getLoginPage = (request, response, next) => {
    // const isLoggedIn = request.get('Cookie')?.split('=')[1];
    response.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};
exports.getLoginPage = getLoginPage;
const postLoginPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        if (request.session) {
            // const retrievedUser = await User.findByPk(1);
            const retrievedUser = yield User_1.default.findOne({ where: { email } });
            const usersMatch = yield bcryptjs_1.default.compare(password, retrievedUser.password);
            if (usersMatch) {
                request.session.isLoggedIn = true;
                request.session.user = retrievedUser;
                return request.session.save((error) => {
                    if (error) {
                        console.log(error);
                    }
                    response.redirect('/');
                });
            }
            response.redirect('/login');
        }
        // request.isLoggedIn = true;
        // response.setHeader('Set-Cookie', 'isLoggedIn=true');
    }
    catch (error) {
        console.log(error);
        response.redirect('/login');
    }
});
exports.postLoginPage = postLoginPage;
const postLogoutPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    request.session.destroy((error) => {
        if (error) {
            console.log(error);
        }
        response.redirect('/');
    });
});
exports.postLogoutPage = postLogoutPage;
const getSignupPage = (request, response, next) => {
    response.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};
exports.getSignupPage = getSignupPage;
const postSignupPage = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = yield request.body;
        const userWithThisEmail = yield User_1.default.findOne({ where: { email } });
        if (userWithThisEmail) {
            return response.redirect('/signup');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        yield User_1.default.create({ email, password: hashedPassword });
        response.redirect('/login');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postSignupPage = postSignupPage;
