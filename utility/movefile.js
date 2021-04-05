const logger = require('./logger')

//moves the $file to $dir2
module.exports = (file, dir2)=>{
    //include the fs, path modules
    var fs = require('fs');
    var path = require('path');
  
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);
  
    fs.rename(file, dest, (err)=>{
      if(err) logger.warn(`Failed to move file ${file} - ${err}`);
      else logger.info('Successfully moved file: ' + file);
    });
  };
  