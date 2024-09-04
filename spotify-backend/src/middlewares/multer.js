import multer from "multer";

// get data from the frontend
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage});

export default upload;