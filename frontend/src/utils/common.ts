interface KeyValue {
    [key: string]: string[];
}
function getUpdatedValues(data: any[]): KeyValue {
    const valuesObj: KeyValue = {};

    data.forEach(obj => {
        const keys = Object.keys(obj);
        const mainKey = keys.find(key => key !== "_id" && key !== "__v");

        if (mainKey) {
            valuesObj[mainKey] = obj[mainKey];
        }
    });

    return valuesObj;
}

function checkForDuplicates(array : any) {
    return new Set(array).size !== array.length
  }

function addDataTypeKey(obj1 : any, obj2 : any, currTable: any){
    delete obj2[currTable]._id;
    const columnValues : any = Object.values(obj2[currTable]);
    obj1.forEach((obj : any, index: any) => {
        obj.dataType = columnValues[index].toLowerCase();
    });
    return obj1;
}

function isValidDate(dateString : any) {
  const date : any = new Date(dateString);
  return date instanceof Date && !isNaN(Number(date));
}

function getObjectValueTypes(obj: any) {
    const types = {};
    for (const key in obj) {
      if(typeof obj[key] === "object" && isValidDate(obj[key])){
        types[key] = 'date'
      }else{
        types[key] = typeof obj[key];
      }
    }
    return types;
  }

  // function getKeyByValue(object : any, value : any) {
  //   const entry = Object.entries(object).find(([key, val]) => val === value);
  //   return entry ? entry : null;
  // }

  function areAllDateElementsSame(arr : any, fieldMapping: any) {
    let flag : any= true;
    let itemKey : any= '';
    const firstElement = arr[0];
    const dateKeys : any= Object.keys(firstElement).filter(key => firstElement[key] === 'date')
    const fieldMappingValues : any = Object.values(fieldMapping)
    const commonElements = dateKeys.filter((element : any) => fieldMappingValues.includes(element));

    if (arr.length === 0) {
      return flag;
    }

    if(commonElements.length !== 0){
      console.log('arr--->', arr)
      for (let i = 1; i < arr.length; i++) {
        const currentElement = arr[i];
        commonElements.forEach((item: any)=>{
          if (currentElement[item] && (firstElement[item] !== currentElement[item])) {
            flag = false;
            console.log('item-->',item)
            itemKey = item
            return
          }
        }) 
      }
    }
    return {flag, itemKey};
  }

  function compareValues(json1 : any, json2 : any, mapping : any) {
    const obj : any= {};
      Object.entries(mapping).forEach(([key1, key2] : any) => {
        if(json1[key1].toLowerCase() === json2[key2].toLowerCase()){
            obj[key1] = true;
        }else{
            obj[key1] = false;
        }
      });
      return obj;
  }
  

export { getUpdatedValues, checkForDuplicates, addDataTypeKey, getObjectValueTypes, areAllDateElementsSame, compareValues }