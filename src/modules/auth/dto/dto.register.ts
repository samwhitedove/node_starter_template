
import Joi from "joi"


export const registerDto = Joi.object({
    "email": Joi.string().required(),
    "password": Joi.string().required(),
    "fullName": Joi.string().required(),
    "phoneNumber": Joi.string().required(),
    "phoneNumber2": Joi.string().default(null),
    "accountName": Joi.string().required(),
    "accountNumber": Joi.string().required(),
    "address": Joi.string().required(),
    "state": Joi.string().required(),
    "lga": Joi.string().required(),
    "companyName": Joi.string().required(),
    "bankName": Joi.string().required(),
    "govId": Joi.string().required(),
    "ownVehicle": Joi.string().required(),
    "financialCapacity": Joi.string().required(),
    "profileImageUrl": Joi.any().required(),
    "cacUrl": Joi.any().default(null),
    "code": Joi.string().required(),
    "governmentIdImageUrl": Joi.any().default(null),
    "letterHeadImageUrl": Joi.any().default(null),
});

export const saveRegisterDto = Joi.object({
    "email": Joi.string().required(),
    "fullName": Joi.string().required(),
    "phoneNumber": Joi.string().required(),
    "password": Joi.string().required(),
    "phoneNumber2": Joi.string().default(null),
    "accountName": Joi.string().required(),
    "accountNumber": Joi.string().required(),
    "profileImageUrl": Joi.string().required(),
    "cacUrl": Joi.string().default(null),
    "governmentIdImageUrl": Joi.string().default(null),
    "letterHeadImageUrl": Joi.string().default(null),
    "address": Joi.string().required(),
    "state": Joi.string().required(),
    "lga": Joi.string().required(),
    "companyName": Joi.string().required(),
    "bankName": Joi.string().required(),
    "govId": Joi.string().required(),
    "ownVehicle": Joi.string().required(),
    "financialCapacity": Joi.string().required(),
    // added to complete registration
    "token": Joi.string().required(),
    "refreshToken": Joi.string().required(),
    "id": Joi.string().required(),
    "fcmToken": Joi.string().default(null),
    "investorSignature": Joi.string().default(null),
    //login info
    "isLive": Joi.boolean().default(false),
    "isBlock": Joi.boolean().default(false),
    "isAdmin": Joi.boolean().default(false),
    // merge data
    "isMerge": Joi.boolean().default(false),
    "kfi": Joi.array().default([]),

});

// export const updateProfileDto = Joi.object({
//     "fullName": Joi.string(),
//     "phoneNumber": Joi.string(),
//     "phoneNumber2": Joi.string(),
//     "accountName": Joi.string(),
//     "accountNumber": Joi.string(),
//     "companyName": Joi.string(),
//     "address": Joi.string(),
//     "state": Joi.string(),
//     "lga": Joi.string(),
//     "bankName": Joi.string(),
//     "investorSignature": Joi.string().allow(null),
//     "isMerge": Joi.boolean(),
//     "kfi": Joi.array(),
//     "ownVehicle": Joi.string(),
//     "financialCapacity": Joi.string(),
//     "refreshToken": Joi.string(),
//     "token": Joi.string(),
//     "fcmToken": Joi.string(),
//     "user": Joi.object(),
// });