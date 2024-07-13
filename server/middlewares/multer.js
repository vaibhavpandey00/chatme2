import multer from "multer";

const multerUpload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const singleUpload = multerUpload.single("avatar");


export { singleUpload }