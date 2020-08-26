/**
 * covert canvas to image
 * and save the image file
 */

let Canvas2Image = {
  /*
    根据需求自定义此方法
    avaliableNum, 可使用充电枪数
    usingNum,     使用中充电枪数
    faultNum      不可使用充电枪数
  */
  drawArc: function (canvas, avaliableNum, usingNum, faultNum) {
    var total = avaliableNum + usingNum + faultNum;
    var context = canvas.getContext('2d'),
      w = canvas.width,
      h = canvas.height,
      radius = 17,
      startAngle = 0 * Math.PI,
      avaliableAngle = avaliableNum / total * 2 * Math.PI,
      usingAngle = usingNum / total * 2 * Math.PI,
      faultAngle = faultNum / total * 2 * Math.PI,
      endAngle = 2 * Math.PI,
      counterClockwise = false;

    context.clearRect(0, 0, w, h);
    context.beginPath();
    context.lineWidth = 4;
    context.arc(w / 2, h / 2, radius, startAngle, avaliableAngle, counterClockwise);
    context.strokeStyle = '#7ebf41';
    context.stroke();
    // 设置填充色
    context.fillStyle = "rgba(225,225,225,0)";
    context.fill();
    context.beginPath();
    context.arc(w / 2, h / 2, radius, avaliableAngle, avaliableAngle + usingAngle, counterClockwise);
    context.strokeStyle = '#f06a3a';
    context.stroke();
    // 设置填充色
    context.fillStyle = "rgba(225,225,225,0)";
    context.fill();
    context.beginPath();
    context.arc(w / 2, h / 2, radius, avaliableAngle + usingAngle, endAngle, counterClockwise);
    context.strokeStyle = '#bcbcbc';
    context.stroke();
    // 设置填充色
    context.fillStyle = "rgba(225,225,225,0)";
    context.fill();
    // 字体大小
    context.font = "14px bold 黑体";
    // 字体颜色
    // if (slow || fast) {
    context.fillStyle = "#333333";
    // } else {
    //   context.fillStyle = '#bcbcbc';
    // }
    // 设置水平对齐方式
    context.textAlign = "center";
    // 设置垂直对齐方式
    context.textBaseline = "middle";
    var formatTotal = total > 9999 ? `${(total / 10000).toFixed(2)}w` : total;
    context.fillText(formatTotal, w / 2,h / 2);
  },

  // check if support sth.
  $support: function () {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    return {
      canvas: !!ctx,
      imageData: !!ctx.getImageData,
      dataURL: !!canvas.toDataURL,
      btoa: !!window.btoa
    };
  },

  downloadMime: 'image/octet-stream',

  scaleCanvas: function (canvas, width, height) {
    var w = canvas.width,
      h = canvas.height;
    if (width == undefined) {
      width = w;
    }
    if (height == undefined) {
      height = h;
    }

    var retCanvas = document.createElement('canvas');
    var retCtx = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
    return retCanvas;
  },

  getDataURL: function (canvas, type, width, height) {
    canvas = Canvas2Image.scaleCanvas(canvas, width, height);
    return canvas.toDataURL(type);
  },

  saveFile: function (strData) {
    document.location.href = strData;
  },

  genImage: function (strData) {
    var img = document.createElement('img');
    img.src = strData;
    return img;
  },
  fixType: function (type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
  },
  encodeData: function (data) {
    if (!window.btoa) {
      throw 'btoa undefined'
    }
    var str = '';
    if (typeof data == 'string') {
      str = data;
    } else {
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
      }
    }

    return btoa(str);
  },
  getImageData: function (canvas) {
    var w = canvas.width,
      h = canvas.height;
    return canvas.getContext('2d').getImageData(0, 0, w, h);
  },
  makeURI: function (strData, type) {
    return 'data:' + type + ';base64,' + strData;
  },

  /**
   * create bitmap image
   * ���չ�������ͼƬ��Ӧͷ����Ӧ��
   */
  genBitmapImage: function (data) {
    var imgHeader = [],
      imgInfoHeader = [];

    var width = data.width,
      height = data.height;

    imgHeader.push(0x42); // 66 -> B
    imgHeader.push(0x4d); // 77 -> M

    var fsize = width * height * 3 + 54; // header size:54 bytes
    imgHeader.push(fsize % 256); // r
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // g
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // b
    fsize = Math.floor(fsize / 256);
    imgHeader.push(fsize % 256); // a

    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);

    imgHeader.push(54); // offset -> 6
    imgHeader.push(0);
    imgHeader.push(0);
    imgHeader.push(0);

    // info header
    imgInfoHeader.push(40); // info header size
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);

    // ����info
    var _width = width;
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);
    _width = Math.floor(_width / 256);
    imgInfoHeader.push(_width % 256);

    // ����info
    var _height = height;
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);
    _height = Math.floor(_height / 256);
    imgInfoHeader.push(_height % 256);

    imgInfoHeader.push(1);
    imgInfoHeader.push(0);
    imgInfoHeader.push(24); // 24λbitmap
    imgInfoHeader.push(0);

    // no compression
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);
    imgInfoHeader.push(0);

    // pixel data
    var dataSize = width * height * 3;
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);
    dataSize = Math.floor(dataSize / 256);
    imgInfoHeader.push(dataSize % 256);

    // blank space
    for (var i = 0; i < 16; i++) {
      imgInfoHeader.push(0);
    }

    var padding = (4 - ((width * 3) % 4)) % 4;
    var imgData = data.data;
    var strPixelData = '';
    var y = height;
    do {
      var offsetY = width * (y - 1) * 4;
      var strPixelRow = '';
      for (var x = 0; x < width; x++) {
        var offsetX = 4 * x;
        strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 2]);
        strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 1]);
        strPixelRow += String.fromCharCode(imgData[offsetY + offsetX]);
      }
      for (var n = 0; n < padding; n++) {
        strPixelRow += String.fromCharCode(0);
      }

      strPixelData += strPixelRow;
    } while (--y);

    return (encodeData(imgHeader.concat(imgInfoHeader)) + encodeData(strPixelData));

  },

  /**
   * saveAsImage
   * @param canvasElement
   * @param {String} image type
   * @param {Number} [optional] png width
   * @param {Number} [optional] png height
   */
  saveAsImage: function (canvas, width, height, type) {
    if (this.$support.canvas && this.$support.dataURL) {
      if (type == undefined) {
        type = 'png';
      }
      type = this.fixType(type);
      if (/bmp/.test(type)) {
        var data = getImageData(scaleCanvas(canvas, width, height));
        var strData = genBitmapImage(data);
        saveFile(makeURI(strData, downloadMime));
      } else {
        var strData = getDataURL(canvas, type, width, height);
        saveFile(strData.replace(type, downloadMime));
      }

    }
  },

  convertToImage: function (canvas, width, height, type) {
    if (Canvas2Image.$support().canvas && Canvas2Image.$support().dataURL) {
      if (!type) {
        type = 'png';
      }
      type = this.fixType(type);
      var strData = '';
      if (/bmp/.test(type)) {
        var data = Canvas2Image.getImageData(this.scaleCanvas(canvas, width, height));
        strData = Canvas2Image.genBitmapImage(data);
        return Canvas2Image.genImage(this.makeURI(strData, 'image/bmp'));
      } else {
        strData = Canvas2Image.getDataURL(canvas, type, width, height);
        return Canvas2Image.genImage(strData);
      }

    }
  },

  saveAsPNG: function (canvas, width, height) {
    return this.saveAsImage(canvas, width, height, 'png');
  },
  saveAsJPEG: function (canvas, width, height) {
    return this.saveAsImage(canvas, width, height, 'jpeg');
  },
  saveAsGIF: function (canvas, width, height) {
    return this.saveAsImage(canvas, width, height, 'gif')
  },
  saveAsBMP: function (canvas, width, height) {
    return this.saveAsImage(canvas, width, height, 'bmp');
  },
  convertToPNG: function (canvas, width, height) {
    return this.convertToImage(canvas, width, height, 'png');
  },
  convertToJPEG: function (canvas, width, height) {
    return this.convertToImage(canvas, width, height, 'jpeg');
  },
  convertToGIF: function (canvas, width, height) {
    return this.convertToImage(canvas, width, height, 'gif');
  },
  convertToBMP: function (canvas, width, height) {
    return this.convertToImage(canvas, width, height, 'bmp');
  }
}
export default Canvas2Image;
