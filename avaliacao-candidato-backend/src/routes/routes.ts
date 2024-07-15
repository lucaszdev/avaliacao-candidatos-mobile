import express from "express";
import {
    changePassword,
    createUser,
    getUsers,
} from "../controllers/user.controller";
import { login, loginWithToken } from "../controllers/auth.controller";
import {
    changeDefaultEmail,
    createUserEmail,
    deleteEmail,
    getAllUserEmails,
    updateUserEmail,
} from "../controllers/user_emails.controller";
import {
    changeDefaultPhone,
    createUserPhone,
    deletePhone,
    getAllUserPhones,
    updateUserPhone,
} from "../controllers/user_phones.controller";
import {
    changeDefaultAddress,
    createUserAddress,
    deleteAddress,
    getAllUserAddress,
    updateUserAddress,
} from "../controllers/user_address.controller";
import {
    deleteDocumentPicture,
    deleteProofResidence,
    getUserDocument,
    UploadDocumentPicture,
    UploadProofResidence,
} from "../controllers/user_documents.controller";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// GET
router.get("/users", getUsers);
router.get("/user/emails/:idUser", getAllUserEmails);
router.get("/user/phones/:idUser", getAllUserPhones);
router.get("/user/address/:idUser", getAllUserAddress);
router.get("/user/document/:idUser", getUserDocument);

// POST
router.post("/auth/create/user", createUser);
router.post("/auth/login", login);
router.post("/auth/token-login", loginWithToken);
router.post("/user/create/email", createUserEmail);
router.post("/user/create/phone", createUserPhone);
router.post("/user/create/address", createUserAddress);
router.post(
    "/upload/document-picture",
    upload.single("file"),
    UploadDocumentPicture
);
router.post(
    "/upload/proof-residence",
    upload.single("file"),
    UploadProofResidence
);

// PUT
router.put("/update/password", changePassword);
router.put("/update/email", updateUserEmail);
router.put("/update/phone", updateUserPhone);
router.put("/update/address", updateUserAddress);
router.put("/update/default-email", changeDefaultEmail);
router.put("/update/default-phone", changeDefaultPhone);
router.put("/update/default-address", changeDefaultAddress);

// DELETE
router.delete("/delete/email/:emailId", deleteEmail);
router.delete("/delete/phone/:phoneId", deletePhone);
router.delete("/delete/address/:addressId", deleteAddress);
router.delete("/delete/document-picture/:userId", deleteDocumentPicture);
router.delete("/delete/proof-residence/:userId", deleteProofResidence);

export default router;
