import fs from 'fs'
export const fileDeleteLocally = async (path:string) => {
  await fs.exists(path, function (exists) {
    if (exists) {
      //Show in green
      console.log("File exists. Deleting now ...", path);
      fs.unlink(path, (err:any) => {
        if (err) {
          console.log("path/file.txt was deleted", err);
          throw err;
        }
      });
    } else {
      //Show in red
      console.log("File not found, so not deleting.");
    }
  });
};