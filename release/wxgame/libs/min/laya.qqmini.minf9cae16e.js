!function(t,i,o){o.un,o.uns;var e=o.static,n=o.class,a=o.getset,c=(o.__newvec,laya.utils.Browser),l=o.Config,s=(laya.events.Event,laya.events.EventDispatcher),f=laya.resource.HTMLImage,g=laya.utils.Handler,r=laya.display.Input,y=laya.net.Loader,u=laya.net.LocalStorage,d=(laya.maths.Matrix,laya.renders.Render),h=laya.utils.RunDriver,v=laya.media.SoundChannel,m=laya.media.SoundManager,_=laya.net.URL,w=laya.utils.Utils,F=(n(p,"laya.qq.mini.MiniFileMgr",null,"MiniFileMgr$5"),p.isLocalNativeFile=function(i){for(var e=0,t=I.nativefiles.length;e<t;e++)if(-1!=i.indexOf(I.nativefiles[e]))return!0;return!1},p.getFileInfo=function(i){var e=p.fakeObj[i];return null==e?null:e},p.read=function(i,e,t,n,o,a){var l;void 0===e&&(e="utf8"),void 0===n&&(n=""),void 0===o&&(o=!1),void 0===a&&(a=""),l=""==n||-1==n.indexOf("http://")&&-1==n.indexOf("https://")?i:p.getFileNativePath(i),p.fs.readFile({filePath:l,encoding:e,success:function(i){null!=t&&t.runWith([0,i])},fail:function(i){i&&""!=n?p.downFiles(n,e,t,n,o,a):null!=t&&t.runWith([1])}})},p.downFiles=function(e,t,n,o,a,l,s){void 0===t&&(t="ascii"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===l&&(l=""),void 0===s&&(s=!0),p.wxdown({url:e,success:function(i){200===i.statusCode?p.readFile(i.tempFilePath,t,n,o,a,l,s):403===i.statusCode?null!=n&&n.runWith([0,e]):null!=n&&n.runWith([1,i])},fail:function(i){null!=n&&n.runWith([1,i])}}).onProgressUpdate(function(i){null!=n&&n.runWith([2,i.progress])})},p.readFile=function(e,t,n,o,a,i,l){void 0===t&&(t="utf8"),void 0===o&&(o=""),void 0===a&&(a=!1),void 0===i&&(i=""),void 0===l&&(l=!0),p.fs.readFile({filePath:e,encoding:t,success:function(i){-1==e.indexOf("http://")&&-1==e.indexOf("https://")||!I.autoCacheFile&&!a?null!=n&&n.runWith([0,i]):(null!=n&&n.runWith([0,i]),p.copyFile(e,o,null,t,l))},fail:function(i){i&&null!=n&&n.runWith([1,i])}})},p.downOtherFiles=function(i,e,t,n,o){void 0===t&&(t=""),void 0===n&&(n=!1),void 0===o&&(o=!0),p.wxdown({url:i,success:function(i){200===i.statusCode?(I.autoCacheFile||n)&&-1==t.indexOf("wx.qlogo.cn")&&-1==t.indexOf(".php")?(null!=e&&e.runWith([0,i.tempFilePath]),p.copyFile(i.tempFilePath,t,null,"",o)):null!=e&&e.runWith([0,i.tempFilePath]):null!=e&&e.runWith([1,i])},fail:function(i){null!=e&&e.runWith([1,i])}})},p.downLoadFile=function(i,e,t,n){void 0===e&&(e=""),void 0===n&&(n="ascii"),I.window.navigator.userAgent.indexOf("MiniGame")<0?o.loader.load(i,t):"image"==e||"sound"==e?p.downOtherFiles(i,t,i,!0,!1):p.downFiles(i,n,t,i,!0,e,!1)},p.copyFile=function(t,n,o,a,l){void 0===a&&(a=""),void 0===l&&(l=!0);var i=t.split("/"),s=i[i.length-1],e=p.getFileInfo(n),r=p.getFileNativePath(s);p.fakeObj[n]={md5:s,readyUrl:n,size:0,times:c.now(),encoding:a};var u=p.getCacheUseSize();e?e.readyUrl!=n?p.fs.getFileInfo({filePath:t,success:function(i){l&&52428800<=u+4194304+i.size&&(i.size>I.minClearSize&&(I.minClearSize=i.size),p.onClearCacheRes()),p.deleteFile(t,n,o,a,i.size)},fail:function(i){null!=o&&o.runWith([1,i])}}):null!=o&&o.runWith([0]):p.fs.getFileInfo({filePath:t,success:function(e){l&&52428800<=u+4194304+e.size&&(e.size>I.minClearSize&&(I.minClearSize=e.size),p.onClearCacheRes()),p.fs.copyFile({srcPath:t,destPath:r,success:function(i){p.onSaveFile(n,s,!0,a,o,e.size)},fail:function(i){null!=o&&o.runWith([1,i])}})},fail:function(i){null!=o&&o.runWith([1,i])}})},p.onClearCacheRes=function(){var i=I.minClearSize,e=[];for(var t in p.filesListObj)"fileUsedSize"!=t&&e.push(p.filesListObj[t]);p.sortOn(e,"times",16);for(var n=0,o=1,a=e.length;o<a;o++){var l=e[o];if(i<=n)break;n+=l.size,p.deleteFile("",l.readyUrl)}},p.sortOn=function(i,t,e){return void 0===e&&(e=0),16==e?i.sort(function(i,e){return i[t]-e[t]}):18==e?i.sort(function(i,e){return e[t]-i[t]}):i.sort(function(i,e){return i[t]-e[t]})},p.getFileNativePath=function(i){return laya.qq.mini.MiniFileMgr.fileNativeDir+"/"+i},p.deleteFile=function(n,o,a,l,s){void 0===o&&(o=""),void 0===l&&(l=""),void 0===s&&(s=0);var i=p.getFileInfo(o),e=p.getFileNativePath(i.md5);p.fs.unlink({filePath:e,success:function(i){var e=""!=n;if(""!=n){var t=p.getFileNativePath(n);p.fs.copyFile({srcPath:n,destPath:t,success:function(i){p.onSaveFile(o,n,e,l,a,i.size)},fail:function(i){null!=a&&a.runWith([1,i])}})}else p.onSaveFile(o,n,e,l,a,s)},fail:function(i){}})},p.deleteAll=function(){var i=[];for(var e in p.filesListObj)"fileUsedSize"!=e&&i.push(p.filesListObj[e]);for(var t=1,n=i.length;t<n;t++){var o=i[t];p.deleteFile("",o.readyUrl)}laya.qq.mini.MiniFileMgr.filesListObj&&laya.qq.mini.MiniFileMgr.filesListObj.fileUsedSize&&(laya.qq.mini.MiniFileMgr.filesListObj.fileUsedSize=0),laya.qq.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),!1)},p.onSaveFile=function(i,e,t,n,o,a){void 0===t&&(t=!0),void 0===n&&(n=""),void 0===a&&(a=0);var l=i;if(null==p.filesListObj.fileUsedSize&&(p.filesListObj.fileUsedSize=0),t)p.getFileNativePath(e),p.filesListObj[l]={md5:e,readyUrl:i,size:a,times:c.now(),encoding:n},p.filesListObj.fileUsedSize=parseInt(p.filesListObj.fileUsedSize)+a,p.writeFilesList(l,JSON.stringify(p.filesListObj),!0),null!=o&&o.runWith([0]);else if(p.filesListObj[l]){var s=parseInt(p.filesListObj[l].size);p.filesListObj.fileUsedSize=parseInt(p.filesListObj.fileUsedSize)-s,delete p.filesListObj[l],p.writeFilesList(l,JSON.stringify(p.filesListObj),!1),null!=o&&o.runWith([0])}},p.writeFilesList=function(i,e,t){var n=p.fileNativeDir+"/"+p.fileListName;p.fs.writeFile({filePath:n,encoding:"utf8",data:e,success:function(i){},fail:function(i){}}),!I.isZiYu&&I.isPosMsgYu&&I.window.qq.postMessage&&I.window.qq.postMessage({url:i,data:p.filesListObj[i],isLoad:"filenative",isAdd:t})},p.getCacheUseSize=function(){return p.filesListObj&&p.filesListObj.fileUsedSize?p.filesListObj.fileUsedSize:0},p.existDir=function(i,e){p.fs.mkdir({dirPath:i,success:function(i){null!=e&&e.runWith([0,{data:JSON.stringify({})}])},fail:function(i){-1!=i.errMsg.indexOf("file already exists")?p.readSync(p.fileListName,"utf8",e):null!=e&&e.runWith([1,i])}})},p.readSync=function(i,e,t,n){void 0===e&&(e="utf8"),void 0===n&&(n="");var o,a=p.getFileNativePath(i);try{o=p.fs.readFileSync(a,e),null!=t&&t.runWith([0,{data:o}])}catch(i){null!=t&&t.runWith([1])}},p.setNativeFileDir=function(i){p.fileNativeDir=I.window.qq.env.USER_DATA_PATH+i},p.filesListObj={},p.fakeObj={},p.fileNativeDir=null,p.fileListName="layaairfiles.txt",p.ziyuFileData={},p.ziyuFileTextureData={},p.loadPath="",p.DESCENDING=2,p.NUMERIC=16,e(p,["fs",function(){return this.fs=I.window.qq.getFileSystemManager()},"wxdown",function(){return this.wxdown=I.window.qq.downloadFile}]),p);function p(){}var C=(n(E,"laya.qq.mini.MiniImage",null,"MiniImage$5"),E.prototype._loadImage=function(i){var e=this;if(I.isZiYu)E.onCreateImage(i,e,!0);else{var t=!1;if(F.isLocalNativeFile(i)){if(-1!=i.indexOf("http://")||-1!=i.indexOf("https://"))if(""!=F.loadPath)i=i.split(F.loadPath)[1];else{var n=""!=_.rootPath?_.rootPath:_.basePath,o=i;""!=n&&(i=i.split(n)[1]),i||(i=o)}if(I.subNativeFiles&&0==I.subNativeheads.length)for(var a in I.subNativeFiles){var l=I.subNativeFiles[a];I.subNativeheads=I.subNativeheads.concat(l);for(var s=0;s<l.length;s++)I.subMaps[l[s]]=a+"/"+l[s]}if(I.subNativeFiles&&-1!=i.indexOf("/")){var r=i.split("/")[0]+"/";if(r&&-1!=I.subNativeheads.indexOf(r)){var u=I.subMaps[r];i=i.replace(r,u)}}}else t=!0,i=_.formatURL(i);F.getFileInfo(i)?E.onCreateImage(i,e,!t):-1!=i.indexOf("http://")||-1!=i.indexOf("https://")?I.isZiYu?E.onCreateImage(i,e,!0):F.downOtherFiles(encodeURI(i),new g(E,E.onDownImgCallBack,[i,e]),i):E.onCreateImage(i,e,!0)}},E.onDownImgCallBack=function(i,e,t,n){void 0===n&&(n=""),t?e.onError(null):E.onCreateImage(i,e,!1,n)},E.onCreateImage=function(e,t,i,n){var o,a;if(void 0===i&&(i=!1),void 0===n&&(n=""),I.autoCacheFile)if(i)if(I.isZiYu){var l=_.formatURL(e);o=F.ziyuFileTextureData[l]?F.ziyuFileTextureData[l]:e}else o=e;else if(""!=n)o=n;else{var s=F.getFileInfo(e).md5;o=F.getFileNativePath(s)}else o=i?e:n;function r(){a.onload=null,a.onerror=null,delete t.imgCache[e]}function u(){r(),delete F.fakeObj[e],delete F.filesListObj[e],t.onLoaded(a)}function d(){r(),t.event("error","Load image failed")}null==t.imgCache&&(t.imgCache={}),"nativeimage"==t._type?((a=new c.window.Image).crossOrigin="",a.onload=u,a.onerror=d,a.src=o,t.imgCache[e]=a):new f.create(o,{onload:u,onerror:d,onCreate:function(i){a=i,t.imgCache[e]=i}})},E);function E(){}var q=(n(b,"laya.qq.mini.MiniInput",null,"MiniInput$5"),b._createInputElement=function(){r._initInput(r.area=c.createElement("textarea")),r._initInput(r.input=c.createElement("input")),r.inputContainer=c.createElement("div"),r.inputContainer.style.position="absolute",r.inputContainer.style.zIndex=1e5,c.container.appendChild(r.inputContainer),r.inputContainer.setPos=function(i,e){r.inputContainer.style.left=i+"px",r.inputContainer.style.top=e+"px"},o.stage.on("resize",null,b._onStageResize),qq.onWindowResize&&qq.onWindowResize(function(i){t.dispatchEvent&&t.dispatchEvent("resize")}),m._soundClass=N,m._musicClass=N;var i=I.systemInfo.model,e=I.systemInfo.system;-1!=i.indexOf("iPhone")&&(c.onIPhone=!0,c.onIOS=!0,c.onIPad=!0,c.onAndroid=!1),-1==e.indexOf("Android")&&-1==e.indexOf("Adr")||(c.onAndroid=!0,c.onIPhone=!1,c.onIOS=!1,c.onIPad=!1)},b._onStageResize=function(){o.stage._canvasTransform.identity().scale(c.width/d.canvas.width/h.getPixelRatio(),c.height/d.canvas.height/h.getPixelRatio())},b.wxinputFocus=function(i){var t=r.inputElement.target;t&&!t.editable||(I.window.qq.offKeyboardConfirm(),I.window.qq.offKeyboardInput(),I.window.qq.showKeyboard({defaultValue:t.text,maxLength:t.maxChars,multiple:t.multiline,confirmHold:!0,confirmType:"done",success:function(i){},fail:function(i){}}),I.window.qq.onKeyboardConfirm(function(i){var e=i?i.value:"";t.text=e,t.event("input"),laya.qq.mini.MiniInput.inputEnter()}),I.window.qq.onKeyboardInput(function(i){var e=i?i.value:"";t.multiline||-1==e.indexOf("\n")?(t.text=e,t.event("input")):laya.qq.mini.MiniInput.inputEnter()}))},b.inputEnter=function(){r.inputElement.target.focus=!1},b.wxinputblur=function(){b.hideKeyboard()},b.hideKeyboard=function(){I.window.qq.offKeyboardConfirm(),I.window.qq.offKeyboardInput(),I.window.qq.hideKeyboard({success:function(i){console.log("隐藏键盘")},fail:function(i){console.log("隐藏键盘出错:"+(i?i.errMsg:""))}})},b);function b(){}var L=(n(x,"laya.qq.mini.MiniLocalStorage",null,"MiniLocalStorage$5"),x.__init__=function(){x.items=x},x.setItem=function(e,t){try{qq.setStorageSync(e,t)}catch(i){qq.setStorage({key:e,data:t})}},x.getItem=function(i){return qq.getStorageSync(i)},x.setJSON=function(i,e){x.setItem(i,e)},x.getJSON=function(i){return x.getItem(i)},x.removeItem=function(i){qq.removeStorageSync(i)},x.clear=function(){qq.clearStorageSync()},x.getStorageInfoSync=function(){try{var i=qq.getStorageInfoSync();return console.log(i.keys),console.log(i.currentSize),console.log(i.limitSize),i}catch(i){}return null},x.support=!0,x.items=null,x);function x(){}n(S,"laya.qq.mini.MiniLocation",null,"MiniLocation$5"),S.__init__=function(){I.window.navigator.geolocation.getCurrentPosition=S.getCurrentPosition,I.window.navigator.geolocation.watchPosition=S.watchPosition,I.window.navigator.geolocation.clearWatch=S.clearWatch},S.getCurrentPosition=function(e,i,t){var n;(n={success:function(i){null!=e&&e(i)}}).fail=i,I.window.qq.getLocation(n)},S.watchPosition=function(i,e,t){var n;return S._curID++,(n={}).success=i,n.error=e,S._watchDic[S._curID]=n,o.timer.loop(1e3,null,S._myLoop),S._curID},S.clearWatch=function(i){delete S._watchDic[i],S._hasWatch()||o.timer.clear(null,S._myLoop)},S._hasWatch=function(){var i;for(i in S._watchDic)if(S._watchDic[i])return!0;return!1},S._myLoop=function(){S.getCurrentPosition(S._mySuccess,S._myError)},S._mySuccess=function(i){var e,t={};for(e in t.coords=i,t.timestamp=c.now(),S._watchDic)S._watchDic[e].success&&S._watchDic[e].success(t)},S._myError=function(i){var e;for(e in S._watchDic)S._watchDic[e].error&&S._watchDic[e].error(i)},S._watchDic={},S._curID=0;function S(){}!function(){function i(i,e){this.videoend=!1,this.videourl="",this.videoElement=null,this.onPlayFunc=null,this.onEndedFunC=null,this._duration=NaN,this.position=NaN,void 0===i&&(i=320),void 0===e&&(e=240),this.videoElement=I.window.qq.createVideo({width:i,height:e,autoplay:!0})}n(i,"laya.qq.mini.MiniVideo",null,"MiniVideo$3");var e=i.prototype;e.on=function(i,e,t){"loadedmetadata"==i?(this.onPlayFunc=t.bind(e),this.videoElement.onPlay=this.onPlayFunction.bind(this)):"ended"==i&&(this.onEndedFunC=t.bind(e),this.videoElement.onEnded=this.onEndedFunction.bind(this)),this.videoElement.onTimeUpdate=this.onTimeUpdateFunc.bind(this)},e.onTimeUpdateFunc=function(i){this.position=i.position,this._duration=i.duration},e.onPlayFunction=function(){this.videoElement&&(this.videoElement.readyState=200),console.log("=====视频加载完成========"),null!=this.onPlayFunc&&this.onPlayFunc()},e.onEndedFunction=function(){this.videoElement&&(this.videoend=!0,console.log("=====视频播放完毕========"),null!=this.onEndedFunC&&this.onEndedFunC())},e.off=function(i,e,t){"loadedmetadata"==i?(this.onPlayFunc=t.bind(e),this.videoElement.offPlay=this.onPlayFunction.bind(this)):"ended"==i&&(this.onEndedFunC=t.bind(e),this.videoElement.offEnded=this.onEndedFunction.bind(this))},e.load=function(i){this.videoElement&&(this.videoElement.src=i)},e.play=function(){this.videoElement&&(this.videoend=!1,this.videoElement.play())},e.pause=function(){this.videoElement&&(this.videoend=!0,this.videoElement.pause())},e.size=function(i,e){this.videoElement&&(this.videoElement.width=i,this.videoElement.height=e)},e.destroy=function(){this.videoElement&&this.videoElement.destroy(),this.videoElement=null,this.onEndedFunC=null,this.onPlayFunc=null,this.videoend=!1,this.videourl=null},e.reload=function(){this.videoElement&&(this.videoElement.src=this.videourl)},a(0,e,"duration",function(){return this._duration}),a(0,e,"paused",function(){return!!this.videoElement&&this.videoElement.paused}),a(0,e,"loop",function(){return!!this.videoElement&&this.videoElement.loop},function(i){this.videoElement&&(this.videoElement.loop=i)}),a(0,e,"currentTime",function(){return this.videoElement?this.videoElement.initialTime:0},function(i){this.videoElement&&(this.videoElement.initialTime=i)}),a(0,e,"ended",function(){return this.videoend}),a(0,e,"muted",function(){return!!this.videoElement&&this.videoElement.muted},function(i){this.videoElement&&(this.videoElement.muted=i)}),a(0,e,"videoWidth",function(){return this.videoElement?this.videoElement.width:0}),a(0,e,"videoHeight",function(){return this.videoElement?this.videoElement.height:0}),a(0,e,"playbackRate",function(){return this.videoElement?this.videoElement.playbackRate:0},function(i){this.videoElement&&(this.videoElement.playbackRate=i)}),a(0,e,"x",function(){return this.videoElement?this.videoElement.x:0},function(i){this.videoElement&&(this.videoElement.x=i)}),a(0,e,"y",function(){return this.videoElement?this.videoElement.y:0},function(i){this.videoElement&&(this.videoElement.y=i)}),a(0,e,"currentSrc",function(){return this.videoElement.src}),i.__init__=function(){laya.device.media.Video=i}}();var I=(n(O,"laya.qq.mini.QQMiniAdapter"),O.getJson=function(i){return JSON.parse(i)},O.init=function(i,e){if(void 0===i&&(i=!1),void 0===e&&(e=!1),!O._inited&&(O._inited=!0,(O.window=t).hasOwnProperty("qq")&&!(O.window.navigator.userAgent.indexOf("MiniGame")<0))){O.isZiYu=e,O.isPosMsgYu=i,O.EnvConfig={};try{laya.webgl.resource.WebGLCanvas.premulAlpha=!0}catch(i){}if(O.isZiYu||(F.setNativeFileDir("/layaairGame"),F.existDir(F.fileNativeDir,g.create(O,O.onMkdirCallBack))),"ios 10.1.1"===(O.systemInfo=O.window.qq.getSystemInfoSync()).system.toLowerCase())try{laya.webgl.resource.WebGLCharImage.canUseCanvas=!1}catch(i){}O.window.focus=function(){},o._getUrlPath=function(){},o.getUrlPath=function(){},O.window.logtime=function(i){},O.window.alertTimeLog=function(i){},O.window.resetShareInfo=function(){},O.window.CanvasRenderingContext2D=function(){},O.window.CanvasRenderingContext2D.prototype=O.window.qq.createCanvas().getContext("2d").__proto__,O.window.document.body.appendChild=function(){},O.EnvConfig.pixelRatioInt=0,h.getPixelRatio=O.pixelRatio,O._preCreateElement=c.createElement,c.createElement=O.createElement,h.createShaderCondition=O.createShaderCondition,w.parseXMLFromString=O.parseXMLFromString,r._createInputElement=q._createInputElement,O.EnvConfig.load=y.prototype.load,y.prototype.load=P.prototype.load,y.prototype._loadImage=C.prototype._loadImage,(u._baseClass=L).__init__(),O.onReciveData(),l.useRetinalCanvas=!0}},O.onReciveData=function(){laya.qq.mini.QQMiniAdapter.isZiYu&&O.window.qq.onMessage(function(i){"opendatacontext"==i.isLoad?i.url&&(F.ziyuFileData[i.url]=i.atlasdata,F.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl):"openJsondatacontext"==i.isLoad?i.url&&(F.ziyuFileData[i.url]=i.atlasdata):"openJsondatacontextPic"==i.isLoad&&(F.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl)})},O.measureText=function(i){var e=O._measureText(i);return e||(e={width:16},console.warn("-------微信获取文字宽度失败----等待修复---------")),e},O.getUrlEncode=function(i,e){return"arraybuffer"==e?"":"utf8"},O.downLoadFile=function(i,e,t,n){void 0===e&&(e=""),void 0===n&&(n="utf8"),F.getFileInfo(i)?null!=t&&t.runWith([0]):F.downLoadFile(i,e,t,n)},O.remove=function(i,e){F.deleteFile("",i,e,"",0)},O.removeAll=function(){F.deleteAll()},O.hasNativeFile=function(i){return F.isLocalNativeFile(i)},O.getFileInfo=function(i){return F.getFileInfo(i)},O.getFileList=function(){return F.filesListObj},O.exitMiniProgram=function(){O.window.qq.exitMiniProgram()},O.onMkdirCallBack=function(i,e){i||(F.filesListObj=JSON.parse(e.data),F.fakeObj=F.filesListObj)},O.pixelRatio=function(){if(!O.EnvConfig.pixelRatioInt)try{return O.EnvConfig.pixelRatioInt=O.systemInfo.pixelRatio,O.systemInfo.pixelRatio}catch(i){}return O.EnvConfig.pixelRatioInt},O.createElement=function(i){var e;if("canvas"==i)return 1==O.idx?O.isZiYu?(e=O.window.sharedCanvas).style={}:e=O.window.canvas:e=O.window.qq.createCanvas(),O.idx++,e;if("textarea"==i||"input"==i)return O.onCreateInput(i);if("div"!=i)return O._preCreateElement(i);var t=O._preCreateElement(i);return t.contains=function(i){return null},t.removeChild=function(i){},t},O.onCreateInput=function(i){var e=O._preCreateElement(i);return e.focus=q.wxinputFocus,e.blur=q.wxinputblur,e.style={},e.value=0,e.parentElement={},e.placeholder={},e.type={},e.setColor=function(i){},e.setType=function(i){},e.setFontFace=function(i){},e.addEventListener=function(i){},e.contains=function(i){return null},e.removeChild=function(i){},e},O.createShaderCondition=function(i){var e=this;return function(){return e[i.replace("this.","")]}},O.sendAtlasToOpenDataContext=function(i){if(!laya.qq.mini.QQMiniAdapter.isZiYu){var e=y.getRes(_.formatURL(i));if(!e)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";if(e.meta.image.split(","),e.meta&&e.meta.image)for(var t=e.meta.image.split(","),n=0<=i.indexOf("/")?"/":"\\",o=i.lastIndexOf(n),a=0<=o?i.substr(0,o+1):"",l=0,s=t.length;l<s;l++)t[l]=a+t[l];else t=[i.replace(".json",".png")];for(l=0;l<t.length;l++){var r=t[l];O.postInfoToContext(i,r,e)}}},O.postInfoToContext=function(i,e,t){var n={frames:t.frames,meta:t.meta},o=e,a=F.getFileInfo(_.formatURL(e));if(a)var l=a.md5,s=F.getFileNativePath(l);else s=o;if(!s)throw"获取图集的磁盘url路径不存在！";O.window.qq.postMessage({url:i,atlasdata:n,imgNativeUrl:s,imgReadyUrl:o,isLoad:"opendatacontext"})},O.sendSinglePicToOpenDataContext=function(i){var e=_.formatURL(i),t=F.getFileInfo(e);if(t){var n=t.md5,o=F.getFileNativePath(n);i=e}else o=i;if(!o)throw"获取图集的磁盘url路径不存在！";O.window.qq.postMessage({url:i,imgNativeUrl:o,imgReadyUrl:i,isLoad:"openJsondatacontextPic"})},O.sendJsonDataToDataContext=function(i){if(!laya.qq.mini.QQMiniAdapter.isZiYu){var e=y.getRes(i);if(!e)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";O.window.qq.postMessage({url:i,atlasdata:e,isLoad:"openJsondatacontext"})}},O.EnvConfig=null,O.window=null,O._preCreateElement=null,O._inited=!1,O.systemInfo=null,O.isZiYu=!1,O.isPosMsgYu=!1,O.autoCacheFile=!0,O.minClearSize=5242880,O.subNativeFiles=null,O.subNativeheads=[],O.subMaps=[],O.AutoCacheDownFile=!1,O._measureText=null,O.parseXMLFromString=function(i){var e;i=i.replace(/>\s+</g,"><");try{e=(new t.Parser.DOMParser).parseFromString(i,"text/xml")}catch(i){throw"需要引入xml解析库文件"}return e},O.idx=1,e(O,["nativefiles",function(){return this.nativefiles=["layaNativeDir","wxlocal"]}]),O);function O(){}!function(o){function a(){a.__super.call(this)}n(a,"laya.qq.mini.MiniAccelerator",o,"MiniAccelerator$5");var i=a.prototype;i.on=function(i,e,t,n){return o.prototype.on.call(this,i,e,t,n),a.startListen(this.onDeviceOrientationChange),this},i.off=function(i,e,t,n){return void 0===n&&(n=!1),this.hasListener(i)||a.stopListen(),o.prototype.off.call(this,i,e,t,n)},a.__init__=function(){try{var i;if(!(i=laya.device.motion.Accelerator))return;i.prototype.on=a.prototype.on,i.prototype.off=a.prototype.off}catch(i){}},a.startListen=function(i){if(a._callBack=i,!a._isListening){a._isListening=!0;try{I.window.qq.onAccelerometerChange(laya.qq.mini.MiniAccelerator.onAccelerometerChange)}catch(i){}}},a.stopListen=function(){a._isListening=!1;try{I.window.qq.stopAccelerometer({})}catch(i){}},a.onAccelerometerChange=function(i){var e;(e={}).acceleration=i,e.accelerationIncludingGravity=i,e.rotationRate={},null!=a._callBack&&a._callBack(e)},a._isListening=!1,a._callBack=null}(s);var P=(n(M,"laya.qq.mini.MiniLoader",s,"MiniLoader$5"),M.prototype.load=function(i,e,t,n,o){void 0===t&&(t=!0),void 0===o&&(o=!1);var a=this;if(0===(a._url=i).indexOf("data:image")?a._type=e="image":a._type=e||(e=a.getTypeFromUrl(i)),a._cache=t,a._data=null,!o&&y.loadedMap[_.formatURL(i)])return a._data=y.loadedMap[_.formatURL(i)],this.event("progress",1),void this.event("complete",a._data);if(null!=y.parserMap[e])return a._customParse=!0,void(y.parserMap[e]instanceof laya.utils.Handler?y.parserMap[e].runWith(this):y.parserMap[e].call(null,this));var l=I.getUrlEncode(i,e),s=w.getFileExtension(i);if(-1!=M._fileTypeArr.indexOf(s)||"image"==e)I.EnvConfig.load.call(this,i,e,t,n,o);else{if(I.isZiYu&&!F.ziyuFileData[i]&&(i=_.formatURL(i)),I.isZiYu&&F.ziyuFileData[i]){var r=F.ziyuFileData[i];return void a.onLoaded(r)}if(F.getFileInfo(_.formatURL(i))){var u=F.getFileInfo(_.formatURL(i));u.encoding=null==u.encoding?"utf8":u.encoding;var d=F.getFileNativePath(u.md5);F.readFile(d,u.encoding,new g(M,M.onReadNativeCallBack,[l,i,e,t,n,o,a]),_.formatURL(i))}else{if(F.isLocalNativeFile(i)){if(I.subNativeFiles&&0==I.subNativeheads.length)for(var c in I.subNativeFiles){var f=I.subNativeFiles[c];I.subNativeheads=I.subNativeheads.concat(f);for(var h=0;h<f.length;h++)I.subMaps[f[h]]=c+"/"+f[h]}if(I.subNativeFiles&&-1!=i.indexOf("/")){var v=i.split("/")[0]+"/";if(v&&-1!=I.subNativeheads.indexOf(v)){var m=I.subMaps[v];i=i.replace(v,m)}}return void F.read(i,l,new g(M,M.onReadNativeCallBack,[l,i,e,t,n,o,a]))}var p=i;-1!=_.formatURL(i).indexOf(I.window.qq.env.USER_DATA_PATH)||-1==i.indexOf("http://")&&-1==i.indexOf("https://")||I.AutoCacheDownFile?(u=F.getFileInfo(i))?(u.encoding=null==u.encoding?"utf8":u.encoding,F.readFile(u.url,l,new g(M,M.onReadNativeCallBack,[l,i,e,t,n,o,a]),i)):"image"==a.type||"htmlimage"==a.type?I.EnvConfig.load.call(a,i,e,t,n,o):(i=_.formatURL(i),"image"!=e&&(-1==i.indexOf("http://")&&-1==i.indexOf("https://")||F.isLocalNativeFile(i))?F.readFile(i,l,new g(M,M.onReadNativeCallBack,[l,i,e,t,n,o,a]),i):F.downFiles(i,l,new g(M,M.onReadNativeCallBack,[l,i,e,t,n,o,a]),i,t)):I.EnvConfig.load.call(a,p,e,t,n,o)}}},M.onReadNativeCallBack=function(i,e,t,n,o,a,l,s,r){var u;void 0===n&&(n=!0),void 0===a&&(a=!1),void 0===s&&(s=0),s?1==s&&(console.log("-----------本地加载失败，尝试外网加载----"),I.EnvConfig.load.call(l,e,t,n,o,a)):(u="json"==t||"atlas"==t?I.getJson(r.data):"xml"==t?w.parseXMLFromString(r.data):r.data,!I.isZiYu&&I.isPosMsgYu&&"arraybuffer"!=t&&I.window.qq&&I.window.qq.postMessage({url:e,data:u,isLoad:"filedata"}),l.onLoaded(u))},e(M,["_fileTypeArr",function(){return this._fileTypeArr=["png","jpg","bmp","jpeg","gif"]}]),M);function M(){M.__super.call(this)}var N=function(i){function r(){this._sound=null,this.url=null,this.loaded=!1,this.readyUrl=null,r.__super.call(this)}n(r,"laya.qq.mini.MiniSound",s,"MiniSound$5");var e=r.prototype;return e.load=function(i){if(F.isLocalNativeFile(i)){if(-1!=i.indexOf("http://")||-1!=i.indexOf("https://"))if(""!=F.loadPath)i=i.split(F.loadPath)[1];else{var e=""!=_.rootPath?_.rootPath:_.basePath;""!=e&&(i=i.split(e)[1])}}else i=_.formatURL(i);if(this.url=i,this.readyUrl=i,r._audioCache[this.readyUrl])this.event("complete");else if(I.autoCacheFile&&F.getFileInfo(i))this.onDownLoadCallBack(i,0);else if(I.autoCacheFile)if(F.isLocalNativeFile(i)){var t=i;if(""!=(e=""!=_.rootPath?_.rootPath:_.basePath)&&(i=i.split(e)[1]),i||(i=t),I.subNativeFiles&&0==I.subNativeheads.length)for(var n in I.subNativeFiles){var o=I.subNativeFiles[n];I.subNativeheads=I.subNativeheads.concat(o);for(var a=0;a<o.length;a++)I.subMaps[o[a]]=n+"/"+o[a]}if(I.subNativeFiles&&-1!=i.indexOf("/")){var l=i.split("/")[0]+"/";if(l&&-1!=I.subNativeheads.indexOf(l)){var s=I.subMaps[l];i=i.replace(l,s)}}this.onDownLoadCallBack(i,0)}else F.downOtherFiles(i,g.create(this,this.onDownLoadCallBack,[i]),i);else this.onDownLoadCallBack(i,0)},e.onDownLoadCallBack=function(i,e){if(e)this.event("error");else{var t;if(I.autoCacheFile){var n=F.getFileInfo(i);if(n&&n.md5){var o=n.md5;t=F.getFileNativePath(o)}else t=i;this._sound=r._createSound(),this._sound.src=this.url=t}else this._sound=r._createSound(),this._sound.src=i;this._sound.onCanplay(r.bindToThis(this.onCanPlay,this)),this._sound.onError(r.bindToThis(this.onError,this))}},e.onError=function(i){try{console.log("-----1---------------minisound-----id:"+r._id),console.log(i)}catch(i){console.log("-----2---------------minisound-----id:"+r._id),console.log(i)}this.event("error"),this._sound.offError(null)},e.onCanPlay=function(){this.loaded=!0,this.event("complete"),this._sound.offCanplay(null)},e.play=function(i,e){var t;if(void 0===i&&(i=0),void 0===e&&(e=0),t=this.url==m._tMusic?(r._musicAudio||(r._musicAudio=r._createSound()),r._musicAudio):r._audioCache[this.readyUrl]?r._audioCache[this.readyUrl]._sound:r._createSound(),I.autoCacheFile&&F.getFileInfo(this.url)){var n=F.getFileInfo(this.url).md5;t.src=this.url=F.getFileNativePath(n)}else t.src=this.url;var o=new U(t,this);return o.url=this.url,o.loops=e,o.loop=0===e,o.startTime=i,o.play(),m.addChannel(o),o},e.dispose=function(){var i=r._audioCache[this.readyUrl];i&&(i.src="",i._sound&&(i._sound.destroy(),i._sound=null,i=null),delete r._audioCache[this.readyUrl])},a(0,e,"duration",function(){return this._sound.duration}),r._createSound=function(){return r._id++,I.window.qq.createInnerAudioContext()},r.bindToThis=function(i,e){return i.bind(e)},r._musicAudio=null,r._id=0,r._audioCache={},r}(),U=function(i){function t(i,e){this._audio=null,this._onEnd=null,this._miniSound=null,t.__super.call(this),this._audio=i,this._miniSound=e,this._onEnd=t.bindToThis(this.__onEnd,this),i.onEnded(this._onEnd)}n(t,"laya.qq.mini.MiniSoundChannel",v,"MiniSoundChannel$5");var e=t.prototype;return e.__onEnd=function(){if(1==this.loops)return this.completeHandler&&(o.timer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event("complete");0<this.loops&&this.loops--,this.startTime=0,this.play()},e.play=function(){this.isStopped=!1,m.addChannel(this),this._audio.play()},e.stop=function(){this.isStopped=!0,m.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.pause(),this._audio.offEnded(null),this._audio=null,this._miniSound=null,this._onEnd=null)},e.pause=function(){this.isStopped=!0,this._audio.pause()},e.resume=function(){this._audio&&(this.isStopped=!1,m.addChannel(this),this._audio.play())},a(0,e,"startTime",null,function(i){this._audio&&(this._audio.startTime=i)}),a(0,e,"autoplay",function(){return this._audio.autoplay},function(i){this._audio.autoplay=i}),a(0,e,"position",function(){return this._audio?this._audio.currentTime:0}),a(0,e,"duration",function(){return this._audio?this._audio.duration:0}),a(0,e,"loop",function(){return this._audio.loop},function(i){this._audio.loop=i}),a(0,e,"volume",function(){return this._audio?this._audio.volume:1},function(i){this._audio&&(this._audio.volume=i)}),t.bindToThis=function(i,e){return i.bind(e)},t}()}(window,document,Laya),"function"==typeof define&&define.amd&&define("laya.core",["require","exports"],function(i,e){"use strict";for(var t in Object.defineProperty(e,"__esModule",{value:!0}),Laya){var n=Laya[t];n&&n.__isclass&&(e[t]=n)}});