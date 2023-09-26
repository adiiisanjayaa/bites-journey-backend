const multer = require("multer");
const path = require("path");
const { MAX_UPLOAD_SIZE } = require("./configs/config");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

function validateImage(file, cb) {
  var filetypes = /jpeg|jpg|png/; // jenis file yang bisa di simpan
  var mimetype = filetypes.test(file.mimetype);

  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }

  return cb("Error: File upload only supports the " + filetypes);
}

const uploadCategoryImageHelper = multer({
  storage: storage,
  limits: { fileSize: MAX_UPLOAD_SIZE },
  fileFilter: function (req, file, cb) {
    let { title, description } = req.body;
    if (!(title && description)) {
      return cb(new Error("Field cannot be empty!"));
    }
    validateImage(file, cb);
  },

  // "file" is the name of file attribute di body
}).single("file");

const uploadArticleImageHelper = multer({
  storage: storage,
  limits: { fileSize: MAX_UPLOAD_SIZE },
  fileFilter: function (req, file, cb) {
    let { title, content, id_categories } = req.body;
    if (!(title && content && id_categories)) {
      return cb(new Error("Field cannot be empty!"));
    }
    validateImage(file, cb);
  },

  // "file" is the name of file attribute di body
}).single("file");

module.exports = {
  uploadCategoryImageHelper,
  uploadArticleImageHelper,
};
