import express from 'express';
import fs, { mkdirSync } from 'fs';
import path from 'path';

const filesController = {
    get:_get
}

function _get(req,res){
    
    let generateDirectoryTree =(rootPath,excluded)=>{
        return generateHerarchy(generateFlatArray(rootPath,excluded));
    }

    let generateFlatArray =(rootPath,excluded)=>{
        let filesArray = [];
        let filesArray2=[];
        let filesArray3=[];
       // rootPath = path.join(__dirname,'../'+rootPath);
        let generateArray = (folderPath)=>{
            let elements= fs.readdirSync(folderPath);
            excluded.forEach((exElem)=>{
                elements= elements.filter((elem)=>{
                    return elem!==exElem;
                });
            });
            elements.forEach((current,index)=>{    
                let currentStat= fs.statSync(folderPath+'/'+current);
                if(currentStat.isDirectory()){
                    filesArray.push(folderPath+'/'+current+'/');   
                    return generateArray(folderPath+'/'+current);
                }
                else{
                    filesArray.push(folderPath+'/'+current);
                }
            })
        }

        generateArray(rootPath);

        filesArray.forEach((element)=>{
            let elementArray = element.split('/');
            filesArray2.push(elementArray);
        });
        filesArray2.forEach((arr)=>{
            filesArray3.push(arr.filter((elem)=>{
                return elem!=='..'&& elem!=='.' ;
            }))
        });
        
        return filesArray3;
    }

    let generateHerarchy =(arr)=>{
        let filesObject={
            name:'',
            type:'directory',
            children:[],
        };
    
        let generateObject = (verticalArray)=>{

            let fieldName = verticalArray[0][0];
        
            filesObject.name=fieldName;
        
            verticalArray.forEach((horizontalArray)=>{
            
                if(horizontalArray[horizontalArray.length-1]===''){
                     let path = filesObject.children;
                
                     horizontalArray.forEach((fileName,index)=>{
                         if(fileName!==''&&index!==0){
                             let newPath=null ;
                             path.forEach((existedFile,i)=>{
                                 if(existedFile.name===fileName){
                                     newPath = path[i].children;
                                    }                            
                                });
                            if(newPath!==null){
                                path = newPath;
                            }
                            else{
                                path.push({                                
                                    name:fileName,
                                    type:'directory',
                                    children:[]
                                });
                                    
                                if(index!==(horizontalArray.length-2)){
                                    path=path[path.length-1].children;
                                }                                
                            }                                                     
                        }
                     })
                }
                else{

                 let path = filesObject.children;
                
                    horizontalArray.forEach((fileName,index)=>{
                        if(index!==0){
                            let newPath=null ;
                            path.forEach((existedFile,i)=>{
                                if(existedFile.name===fileName){
                                    newPath = path[i].children;

                                }                            
                            });
                            if(newPath!==null){
                                path = newPath;
                            }
                            else{
                                if(index===(horizontalArray.length-1)){
                                    path.push({
                                        name:fileName,
                                        type:'file'
                                    });                                
                                }
                                else{
                                    path.push({
                                        name:fileName,
                                        type:'directory',
                                        children:[]
                                    });
                                    path=path[path.length-1].children;
                                }
                            }      
                        }
                    })        
                }
            })
        }
        generateObject(arr);
        return filesObject;
    }

    let directoryTree = generateDirectoryTree('../staticFiles',['node_modules','reject']);
    
    let makeDirectory = (dirObject)=>{
        let rootPath = dirObject.name;

        if(rootPath){

            if(!fs.existsSync(rootPath)){
                mkdirSync(rootPath);
            }
        let exPath =rootPath+'/';
            let generate = (dirObject,path)=>{
                console.log(dirObject);
                let curPath = path;
                console.log('path::',curPath);                

                dirObject.children.forEach((curDirObject)=>{

                    if(curDirObject.type==='directory'){
                        curPath=curPath+curDirObject.name+'/';
                        console.log(curPath);
                        mkdirSync(curPath);
                        generate(curDirObject,curPath);
                    }
                    else{


                    }
                    curPath=  path;
                })

            }

            generate(dirObject,exPath);
        }

    }


    makeDirectory(directoryTree);

    res.json(directoryTree);

};

export default filesController;