const { CloudantV1 } = require("@ibm-cloud/cloudant");
const {IamAuthenticator}=require('ibm-cloud-sdk-core')
const dotenv=require('dotenv')
dotenv.config()
const authenticator=new IamAuthenticator({
    apikey:process.env.API_KEY
})
const service=new CloudantV1({
    authenticator:authenticator
})

module.exports=service