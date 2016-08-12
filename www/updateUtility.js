var UpdateUtility = function() {};

/**
 * Generate UUID
 * @returns {string}
 */
var generateUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

/**
 * @callback GetAppVersionNumberCallback
 * @param {Number} versionNumber
 */
/**
 *
 * @param {GetAppVersionNumberCallback} callback
 */
UpdateUtility.prototype.getAppVersionNumber = function(callback) {
    setTimeout(function() {
        cordova.getAppVersion.getVersionNumber(callback);
    }, 0);
};

/**
 * @callback DownloadApkSuccessCallback
 * @param {string} downloadedFilePath
 */
/**
 * @callback DownloadApkFailCallback
 * @param {FileTransferError} error
 */
/**
 * @typedef {object} ProgressEvent
 * @property {Number} lengthComputable
 * @property {Number} loaded
 * @property {Number} total
 */
/**
 * @callback DownloadApkProgressCallback
 * @param {ProgressEvent} progressEvent
 */
/**
 *
 * @param url
 * @param {DownloadApkSuccessCallback} successCallback
 * @param failCallback
 */
UpdateUtility.prototype.downloadApk = function(url, successCallback, failCallback, progressCallback) {
    setTimeout(function() {
        var encodedUrl = encodeURI(url);
        var filePath = cordova.file.externalCacheDirectry + generateUUID() + '.apk';
        var fileTransfer = new FileTransfer();
        if (progressCallback && typeof progressCallback == 'function') {
            fileTransfer.onprogress = progressCallback;
        }
        fileTransfer.download(
            encodedUrl,
            filePath,
            function(entry) {
                if (successCallback && typeof successCallback == 'function') {
                    successCallback(entry.toURL);
                }
            },
            failCallback);
    }, 0);
};

UpdateUtility.prototype.installApk = function(apkPath) {
    setTimeout(function() {
        cordova.plugins.fileOpener2.open(apkPath, 'application/vnd.android.package-archive');
    }, 0);
};

module.exports = new UpdateUtility();