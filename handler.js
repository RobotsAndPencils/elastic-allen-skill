'use strict';
// import FilesReader and SkillsWriter classes from skills-kit-2.0.js library
const { FilesReader, SkillsWriter } = require('skills-kit-library/skills-kit-2.0');
var request = require('request-promise');

const sendUrlToEA = async (fileUrl) => {
  console.log('making request');
  try {
    const response = await request({
      method: 'POST',
      uri: 'http://eabot.us-west-1.elasticbeanstalk.com/demoimport',
      body: {
        channel: 'CG6BUQG5D',//'jcp-ea-box-int', 
        token: 'aaede76cd9e447371fe8fea83ea56445', 
        url: fileUrl
      },
      json: true,
      timeout: 10000,
    });
    console.log('Response: ', response);
  } catch (e) {
    console.log('Exception thrown: ', e);
  }
}

module.exports.indexContent = async (event, context) => {
  console.log('Lambda Execution starting');
  console.log(event.body);
  const reader = new FilesReader(event.body);  
  const fileURL = reader.getFileContext().fileDownloadURL;
  console.log(event.body);
  console.log(`ready only file URL: ${fileURL}`);
  await sendUrlToEA(fileURL);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Skeleton test',
      input: event,
    }),
  };
};



