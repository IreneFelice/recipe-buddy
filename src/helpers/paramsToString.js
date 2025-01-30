
function paramsToString(inputParams, queryName){
   return inputParams.map((inputType) => inputType.toLowerCase()).join(`&${queryName}=`);
}

export default paramsToString;