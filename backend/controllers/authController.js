import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Bring in Models & Helpers
import User from '../models/userModel.js'
import {sendEmail} from '../config/mailSender.js';
import template from '../config/template.js';

import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';

const key = process.env.SECRET_OR_KEY;


//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public

const authUser = asyncHandler(async (req, res) => {
    let {email, password} = req.body;
    if (!email) {
        res.status(400);
        throw new Error('You must enter an email address.');
    }
    if (!password) {
        res.status(400);
        throw new Error('You must enter a password.');
    }
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({
            token: `Bearer ${generateToken(user._id)}`,
            user: {
                id: user._id,
                profile: {
                    firstName: user.profile.firstName,
                    lastName: user.profile.lastName,
                    isSubscribed: user.profile.isSubscribed
                },
                email: user.email,
                role: user.role
            }
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

//@desc     Register a new  user 
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    let {email, firstName, lastName, password, isSubscribed} = req.body;

    if (!email) {
        res.status(400);
        throw new Error('You must enter an email address.');
    }
    if (!firstName || !lastName) {
        res.status(400);
        throw new Error('You must enter your full name.');
    }
    if (!password) {
        res.status(400);
        throw new Error('You must enter a password.');
    }
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('That email address is already in use.')
    } else {
        const user = await User.create({
            email,
            password,
            profile: {firstName, lastName, isSubscribed}
        })
        if (user) {
            res.status(201).json({
                token: `Bearer ${generateToken(user._id)}`,
                user: {
                    id: user.id,
                    profile: {
                        firstName: user.profile.firstName,
                        lastName: user.profile.lastName,
                        isSubscribed: user.profile.isSubscribed
                    },
                    email: user.email,
                    role: user.role
                }
            })
            const message = template.signupEmail(user.profile);
            await sendEmail(user.email, message);
        } else {
            res.status(400);
            throw new Error('Invalid user data')
        }
    }
});
/* 
router.post('/forgot', (req, res, next) => {
    const email = req.body.email;

    User.findOne({email}, (err, existingUser) => {
        if (err || existingUser == null) {
            return res.status(400).json({
                error:
                    'Your request could not be processed as entered. Please try again.'
            });
        }

        crypto.randomBytes(48, (err, buffer) => {
            const resetToken = buffer.toString('hex');
            if (err) {
                return res.status(400).json({
                    error: 'Your request could not be processed. Please try again.'
                });
            }

            existingUser.resetPasswordToken = resetToken;
            existingUser.resetPasswordExpires = Date.now() + 3600000;

            existingUser.save(err => {
                if (err) {
                    return res.status(400).json({
                        error: 'Your request could not be processed. Please try again.'
                    });
                }

                const message = template.resetEmail(req, resetToken);

                mailgun.sendEmail(existingUser.email, message);

                return res.status(200).json({
                    success: true,
                    message:
                        'Please check your email for the link to reset your password.'
                });
            });
        });
    });
});

router.post('/reset/:token', (req, res, next) => {
    const password = req.body.password;

    if (!password) {
        return res.status(400).json({error: 'You must enter a password.'});
    }

    User.findOne(
        {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        },
        (err, resetUser) => {
            if (!resetUser) {
                return res.status(400).json({
                    error:
                        'Your token has expired. Please attempt to reset your password again.'
                });
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(400).json({
                            error:
                                'Your request could not be processed as entered. Please try again.'
                        });
                    }
                    req.body.password = hash;

                    resetUser.password = req.body.password;
                    resetUser.resetPasswordToken = undefined;
                    resetUser.resetPasswordExpires = undefined;

                    resetUser.save(err => {
                        if (err) {
                            return res.status(400).json({
                                error:
                                    'Your request could not be processed as entered. Please try again.'
                            });
                        }

                        const message = template.confirmResetPasswordEmail();
                        mailgun.sendEmail(resetUser.email, message);

                        return res.status(200).json({
                            success: true,
                            message:
                                'Password changed successfully. Please login with your new password.'
                        });
                    });
                });
            });
        }
    );
});

router.post('/reset', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!password) {
        return res.status(400).json({error: 'You must enter a password.'});
    }

    User.findOne({email}, (err, existingUser) => {
        if (err || existingUser == null) {
            return res.status(400).json({
                error:
                    'Your request could not be processed as entered. Please try again.'
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        error:
                            'Your request could not be processed as entered. Please try again.'
                    });
                }
                req.body.password = hash;

                existingUser.password = req.body.password;

                existingUser.save(err => {
                    if (err) {
                        return res.status(400).json({
                            error:
                                'Your request could not be processed as entered. Please try again.'
                        });
                    }

                    const message = template.confirmResetPasswordEmail();
                    mailgun.sendEmail(existingUser.email, message);

                    return res.status(200).json({
                        success: true,
                        message:
                            'Password changed successfully. Please login with your new password.'
                    });
                });
            });
        });
    });
});
 */

export {
    authUser, registerUser
}