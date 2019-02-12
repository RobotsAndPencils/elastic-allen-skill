'use strict';
// import FilesReader and SkillsWriter classes from skills-kit-2.0.js library
const { FilesReader, SkillsWriter } = require('skills-kit-library/skills-kit-2.0');


module.exports.indexContent = async (event, context) => {
  console.log('Lambda Execution starting');
  console.log(event.body);
  const reader = new FilesReader(event.body);  
  const fileURL = reader.getFileContext().fileDownloadURL;
  console.log(event.body);
  console.log(`ready only file URL: ${fileURL}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Skeleton test',
      input: event,
    }),
  };
};



