var cmd = require('child_process');
var fs = require("fs");
var config = require('../../config');
/*
// Example: decompressionPath = "D:\\Cache\\upload_0dfa098cb9dddca88ba340a55aa4307b.rar"
// 			releasePath = "E:\\picture\\"
// Callback:paperData
// 			picList
*/
exports.unpackage = function(decompressionPath, releasePath, callback){
	var tempList = decompressionPath.replace(/\\$/,'').split(/\\/), rarFullName = tempList[tempList.length - 1], rarName = rarFullName.split('.')[0];
	decompressionPath = decompressionPath.replace(rarFullName, '');
	fs.mkdir(decompressionPath + "rarCache\\" + rarName, function(){
		cmd.exec("rar x -o+ " + decompressionPath + rarFullName + " " + decompressionPath + "rarCache\\" + rarName, function(err, stdout, stderr){
			if (err == null) {
				exports.getFinalPath(decompressionPath + "rarCache\\" + rarName, function(err, finalPath){
					fs.mkdir(releasePath + rarName + "\\", function(){
						fs.readdir(finalPath, function(err, files){
							var picList = [];
							var paper = {};
							for (var i = files.length - 1; i >= 0; i--) {
								var fileName = files[i].split('.');
								if (files[i].split('.')[1].search(/jpg|png|gif|bmp/) != -1) {
									cmd.exec("copy " + finalPath + files[i] + " " + releasePath + rarName + "\\");
									var pic = {};
									pic.url = config.hostUrl + (releasePath.split(/public/)[1] + rarName + "\\" + files[i]).replace(/\\/g, '/');
									pic.fullPath = releasePath + rarName + "\\" + files[i];
									pic.fullName = files[i];
									pic.name = fileName[0];
									pic.fileType = fileName[1];
									picList.push(pic);
									if(i == -1){
										cmd.exec("rmdir /s /q " + finalPath);
										callback(paper, picList);
									}
								} else if (files[i].split('.')[1] == "txt") {
									fs.readFile(finalPath + files[i], function(err, data){
										paper.picFolder = releasePath + rarName + "\\";
										paper.data = data.toString();
										if(i == -1){
											cmd.exec("rmdir /s /q " + finalPath);
											callback(paper, picList);
										}
									});
								}
							}
						});
					});
				});
			}
		});
	});
};


/*
 getFinalPath(fileRoot, function(err, finalPath){
	//Todo:
 })
*/
exports.getFinalPath = function(fileRoot, callback, dir){
	var filePath = fileRoot;
	try{
		if (dir == undefined) {
			fs.readdir(filePath, function(err, files){
				for (var i = files.length - 1; i >= 0; i--) {
					if (files[i].split('.')[1] == null) {
						exports.getFinalPath(filePath, callback, files[i].split('.')[0]);
						break;
					} else if(i == 0){
						callback(null, filePath + "\\");
					}
				}
			});
		} else {
			fileRoot += ("\\" + dir);
			fs.readdir(fileRoot, function(err, files){
				for (var i = files.length - 1; i >= 0; i--) {
					if (files[i].split('.')[1] == null) {
						exports.getFinalPath(fileRoot += "\\", callback, files[i].split('.')[0]);
						break;
					}
				}
				if (callback != null && fileRoot.search(/\\$/) == -1) {
					callback(null, fileRoot + "\\");
				}
			});
		}
	} catch (ex) {
		if (callback != null) {
			callback("Error: Get Final Path is Failed!", null);
		}
	}
};
