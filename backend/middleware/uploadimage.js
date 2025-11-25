import multer from "multer";
import path from 'path';




const storage = multer.diskStorage({
    destination:(req, file , cb )=>{
        cb(null , 'upload/products/');
    },
    filename:(req , file , cb)=>{
        cb(null , Date.now() + path.extname(file.originalname) );
    }
});

const extension = (req, file , cb)=>{

    const fileType = ['image/png' , 'image/jpg' , 'image/jpeg' ]; //minetype

    if(fileType.includes(file.mimetype)){
        cb(null , true);
    }else{
        cb(new Error("File not supported !"), false);
    }

}

export const upload = multer({
    storage:storage,
    fileFilter:extension
});