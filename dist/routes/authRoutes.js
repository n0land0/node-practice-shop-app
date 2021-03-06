"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/login', authController_1.getLoginPage);
router.post('/login', authController_1.postLoginPage);
router.post('/logout', authController_1.postLogoutPage);
router.get('/signup', authController_1.getSignupPage);
router.post('/signup', authController_1.postSignupPage);
exports.default = router;
