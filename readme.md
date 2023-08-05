# etu-evs 帮助文档

<!-- <p align="center" class="flex justify-center">
    <a href="https://www.serverless-devs.com" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=start-pdf2img&type=packageType">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=start-pdf2img" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=start-pdf2img&type=packageVersion">
  </a>
  <a href="http://www.devsapp.cn/details.html?name=start-pdf2img" class="ml-1">
    <img src="http://editor.devsapp.cn/icon?package=start-pdf2img&type=packageDownload">
  </a>
</p> -->

<description>

> ***将OCR识别古籍图像并以易图方式展示***

</description>

<table>



</table>

<codepre id="codepre">

</codepre>

<deploy>

## 部署 & 体验

<!-- <appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=start-pdf2img) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=start-pdf2img)  该应用。 

</appcenter> -->

- 通过 [Serverless Devs Cli](https://www.serverless-devs.com/serverless-devs/install) 进行部署：
    - [安装 Serverless Devs Cli 开发者工具](https://www.serverless-devs.com/serverless-devs/install) ，并进行[授权信息配置](https://www.serverless-devs.com/fc/config) ；
    - 初始化项目：`s init https://github.com/etu-wiki/etu-devs.git -d etu-ocr`   
    - 进入项目，并进行项目部署：`cd etu-ocr && s deploy -y`

</deploy>

<appdetail id="flushContent">

# 应用详情

## 项目使用注意事项

项目使用PaddleOCR进行图像识别，因为用户必须预先部署，并获得API的网址，具体方式可参见：https://github.com/duolabmeng6/paddlehub_ppocr/tree/master/deploy/PaddleOCR 或

<appcenter>

- :fire: 通过 [Serverless 应用中心](https://fcnext.console.aliyun.com/applications/create?template=PaddleOCR) ，
[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://fcnext.console.aliyun.com/applications/create?template=PaddleOCR)  该应用。 

</appcenter>

## 应用详情

本应用是将图片进行OCR识别并以易图方式展示的阿里云函数计算（FC）。

通过 Serverless Devs 开发者工具，您只需要几步，就可以体验 Serverless 架构，带来的降本提效的技术红利。

部署完成之后，您可以使用 s 工具或者 SDK 调用函数，函数执行成功后， 就可以在 OSS 指定目标目录中得到一个 zip 包， zip 包里面是 pdf 每页截图的 jpg 文件

```bash
$ s invoke -e '{"bucket": "my-bucket", "key": "image.png"}'
```

其中：

- **bucket**: 必需，图像文件所在的 bucket 名字

- **key**: 必需，图像文件所在的 bucket 中的 object key


</appdetail>

<devgroup>

## 开发者社区

您如果有关于错误的反馈或者未来的期待，您可以在 [Serverless Devs repo Issues](https://github.com/serverless-devs/serverless-devs/issues) 中进行反馈和交流。如果您想要加入我们的讨论组或者了解 FC 组件的最新动态，您可以通过以下渠道进行：

<p align="center">

| <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407298906_20211028074819117230.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407044136_20211028074404326599.png" width="130px" > | <img src="https://serverless-article-picture.oss-cn-hangzhou.aliyuncs.com/1635407252200_20211028074732517533.png" width="130px" > |
|--- | --- | --- |
| <center>微信公众号：`serverless`</center> | <center>微信小助手：`xiaojiangwh`</center> | <center>钉钉交流群：`33947367`</center> | 

</p>

</devgroup>