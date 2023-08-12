const OSS = require("ali-oss");
const axios = require("axios");
const mime = require("mime");
const path = require("path");

const { v4: uuid } = require("uuid");

// async function main() {
exports.handler = async (event, context, callback) => {
  const eventJson = JSON.parse(event.toString());
  console.log(eventJson);
  console.time("get image from oss");
  const client = new OSS({
    region: "oss-cn-shanghai",
    accessKeyId: context.credentials.accessKeyId,
    accessKeySecret: context.credentials.accessKeySecret,
    stsToken: context.credentials.securityToken,
    // 走内网，省钱
    internal: process.env.NODE_ENV === "development" ? false : true,
  });

  const bucket = eventJson.bucket;
  const objectName = eventJson.key;

  const ext = path.extname(objectName);

  const contentType = mime.getType(objectName);
  const tenantId = "7e364800-223c-11ee-8727-784f4368419c";
  const baseUrl =
    "https://ig7ezrd8b5.execute-api.cn-north-1.amazonaws.com.cn/dev";

  client.useBucket(bucket);
  const buffer = await client.get(objectName);

  const objectInfo = await client.get(objectName, { process: "image/info" });
  const objectInfoJson = JSON.parse(objectInfo.content.toString());
  const height = objectInfoJson.ImageHeight.value;
  const width = objectInfoJson.ImageWidth.value;
  if (height > 10000 || width > 10000) {
    throw new Error("图片尺寸过大");
  }
  console.timeEnd("get image from oss");

  console.time("send image to etu");
  const imageId = uuid();
  const putUrl = `${baseUrl}/presign-put-url?objectName=${tenantId}/${imageId}${ext}&contentType=${contentType}`;
  const res = await axios.get(putUrl);
  const signedUrl = res.data.signedUrl;

  await axios.put(signedUrl, buffer.content, {
    headers: { "Content-Type": contentType },
  });

  console.log("imageId: " + imageId);
  console.timeEnd("send image to etu");

  console.time("build manifest with ocr result");
  const manifestId = uuid();

  await axios.post(`${baseUrl}/manifest/${manifestId}/image/${imageId}/ver/3`, {
    dims: { height, width }
  });

  console.log("manifestId: " + manifestId);
  console.timeEnd("build manifest with ocr result");

  
  const resUrl = `https://viewers.etu.wiki/index.html?manifest=https://devcn.present.huiyouwenhua.com/manifest/${manifestId}`;
  console.log(resUrl);

  const response = {};
  response.statusCode = 200;
  response.body = resUrl;
  await callback(null, response);
};
