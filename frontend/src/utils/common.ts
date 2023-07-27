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

export { getUpdatedValues, checkForDuplicates }