'use strict';
// import FilesReader and SkillsWriter classes from skills-kit-2.0.js library
const { FilesReader, SkillsWriter } = require('skills-kit-library/skills-kit-2.0');
const request = require('request-promise');
//const BoxSDK = require('box-node-sdk');
//const fs = require('fs');
//const boxSdkConfig = JSON.parse(fs.readFileSync('./conf/boxSdkConfig.json', 'utf8'));

const mimeMapping = {
  txt: 'text/plain',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf'
}
const getMimeType = (extension) => {
  const mime = mimeMapping[extension];
  if (!mime) mime=extension;
  return mime;
}

const sendUrlToEA = async (fileURL, viewURL, contentType) => {
  console.log('making request');
  try {
    const options = {
      method: 'POST',
      uri: 'http://eabot.us-west-1.elasticbeanstalk.com/demoimport',
      body: {
        channel: 'CG6BUQG5D',//'jcp-ea-box-int', 
        token: 'aaede76cd9e447371fe8fea83ea56445', 
        url: fileURL,
        viewURL: viewURL,
        contentType: contentType,
      },
      json: true,
      timeout: 10000,    
    };
    console.log('request options: ', options);
    const response = await request(options);
    console.log('Response: ', response);
  } catch (e) {
    console.log('Exception thrown: ', e);
  }
}

module.exports.indexContent = async (event, context) => {
  console.log('Lambda Execution starting');
  const reader = new FilesReader(event.body);
  const fileURL = reader.fileDownloadURL;
  const contentType = getMimeType(reader.fileFormat);
  // const client = reader.fileWriteClient;  
  // console.log(client);
  // const file = await client.files.update(reader.getFileContext().fileId, {shared_link: client.accessLevels.DEFAULT});
  // const shareURL = file.shared_link.url;
  // TODO: currently no way to make a jwt client for box skill app
  const shareURL = 'https://robotsandpencils.app.box.com/folder/66732684150';
  await sendUrlToEA(fileURL, shareURL, contentType);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Skeleton test',
      input: event,
    }),
  };
};



