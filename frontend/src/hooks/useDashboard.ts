import React , { useEffect, useRef, useState } from "react"
import { axiosPrivate } from "../config/axiosInstance";
import useAuth from "./useAuth";
import { useDataGridExcelExport } from "./useDatagridExcelExport";
import { CustomerMasterData } from "../mock/data";
import { addDataTypeKey, areAllDateElementsSame, checkForDuplicates, compareValues, getObjectValueTypes } from "../utils/common";
import * as XLSX from "xlsx";

const useDashboard = () => {
    const {auth} = useAuth()
    const handleDataGridExportToExcel = useDataGridExcelExport('Exported Excel');
    const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const [blotterData, setBlotterData] = useState({});
  const [excelColunms, setExcelColumns] : any= useState([]);
  const [excelColunmsDataType, setExcelColumnsDataType] : any = useState({});
  const [blotterColumns, setBlotterColumns] : any = useState(CustomerMasterData);
  const [tableDataType, setTableDataType] : any = useState([]);
  const [resources, setResources]: any = useState([]);
  const [sheetName, setSheetName] = useState('');
  const [tableData, setTableData] : any = useState({});
  const [fieldMapping, setFieldMapping] : any = useState({});
  const [selectImportDropDownValue, setSelectImportDropDownValue] : any = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [mockData, setMockData]:any = useState({})
  const [mockDataDropDown, setMockDataDropDown] = useState('Demo1')
  const [currentTable, setCurrentTable] = useState({});
  const [importError, setImportError] :any = useState('');
  const [importFileError, setImportFileError] = useState('');
  const [isExcelImported, setExcelImported] = useState(false);
  const [dataTypeValue, setDataTypeValue] = useState('');
  const inputFileRef : any = useRef(null)


    const onContentReady = (e: any) => {
        if (!collapsed) {
        e.component.expandRow(['EnviroCare']);
        setCollapsed(true);
        }
    }

    const uploadHistory = (fileName, tableName) => {
        axiosPrivate.post('/history/createHistory', {
        user: auth.user, fileName, tableName
        }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
        }).then((response) => {
        }).catch((err) => {
        console.log(err);
        })
    }


    function onToolbarPreparing(e: any) {
        const items = e.toolbarOptions.items;
        items.push({
        location: "after",
        widget: "dxButton",
        options: {
            icon: resources.length > 0 ? resources[0].excelIcon : '',
            text: "Export",
            onClick: () => {
            handleDataGridExportToExcel(e)
            },
            hint: 'Export Selected Models',
        }
        })
    }

    const onHandleChange = (e: any) =>{
        let tempArr : any= []
        setDataTypeValue(e.target.value)
        setCurrentTable(tableDataType[e.target.value]);
        if(Object.keys(tableData).includes(e.target.value)){
        tableData[e.target.value].map((item:any)=>{
            tempArr = [...tempArr, {dataField: '', caption: item}]
        })
        if(Object.keys(tableDataType).includes(e.target.value)){
            tempArr = addDataTypeKey(tempArr, tableDataType, e.target.value)
        }
        setBlotterColumns(tempArr)
        }
    }

    const handleOnFieldMappingChange = (e: any, item: any) =>{
        fieldMapping[item] = e.target.value
        setSelectImportDropDownValue({...selectImportDropDownValue,[item]:e.target.value})
        if(!fieldMapping[item]){
        delete fieldMapping[item]
        }
        setFieldMapping({...fieldMapping})
    }

    const handleImportProceed = () => {
        const fieldMappingArrValues : any= Object.values(fieldMapping);
        const fieldMappingArrKeys : any= Object.keys(fieldMapping);

        let {flag, itemKey} = areAllDateElementsSame(excelColunmsDataType, fieldMapping)

        //returns which all columns are having valid/invalid datatype
        const checkTableExcelDataType = compareValues(currentTable, excelColunmsDataType[0], fieldMapping)
        if(!Object.values(selectImportDropDownValue).some(value => value !== null && value !== undefined && value !== '')){
        setImportError('Select at least one mapper for table')
        }
        else if(checkForDuplicates(fieldMappingArrValues)){
        //validation for duplicate dropdown value
        setImportError('Duplicate selection of excel columns')
        }
        else if(!flag){
        // validation for all excel data should be of same datatype wrt column
        setImportError(`${itemKey.toUpperCase()}: Ensure consistent data types across columns in Excel.`)
        }
        else if (!Object.values(Object.values(checkTableExcelDataType)).every(value => value === true)){
        // excel column dataType must be same as table column datatypes
        Object.entries(checkTableExcelDataType).map((key:any, value: any)=>{
            if(key[1] === false){
            setImportError(`${(key[0]).toUpperCase()} (Datatype: ${currentTable[key[0]]}) Table column datatype must match with excel`)
            }
        })
        }
        else{
        const array2Captions : any= new Set(fieldMappingArrKeys);
        const blotterColumnsArr : any= blotterColumns.filter((item :any) => array2Captions.has(item.caption));
        blotterColumnsArr.map((item:any, index: any)=>{
            fieldMappingArrKeys.map((data:any)=>{
            if(item.caption === data){
                item.dataField = fieldMapping[data]
            }
            })
        })
        setExcelImported(true)
        uploadHistory(sheetName,Object.keys(tableDataType)[0])
        setBlotterColumns(blotterColumnsArr);
        setExcelColumns([]);
        setFieldMapping({});
        setSelectImportDropDownValue([]);
        setMockDataDropDown('')
        setisOpen(false);
        setDataTypeValue('');
        }
    }

    const handleChangeMockData = (e : any) => {
        const mockTemp : any = mockData[e.target.value];
        setMockDataDropDown(e.target.value)
        if(Object.keys(mockData).includes(e.target.value)){
        setBlotterColumns(Object.keys(mockTemp[0]))
        setBlotterData(mockData[e.target.value])
        }
    }


    const handleResetImport = () =>{
        setSheetName('');
        setMockDataDropDown('Demo1');
        setBlotterColumns(Object.keys(mockData.Demo1[0]));
        setBlotterData(mockData['Demo1']);
        setExcelImported(false);
        setDataTypeValue('');
        setImportError('');
    }

    const handleIsOpen = () => {
        setisOpen((prev: any) => !prev)
    }

    const handleFileUpload = (e: any) => {
        const reader = new FileReader();
        let tempArr: any = []
        let excelColumnsDataType :  any =[];
        if(dataTypeValue === ''){
          setImportFileError('Please select Data type to import')
          inputFileRef.current.value ='';
        }else if (e.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
          setImportFileError('Only excel file to import')
          inputFileRef.current.value ='';
        }else{
          reader.readAsBinaryString(e.target.files[0]);
          reader.onload = (e: any) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" , raw:false, cellDates: true, dateNF: 'dd-MM-yyyy' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            setSheetName(sheetName)
            const parsedData : any= XLSX.utils.sheet_to_json(sheet);
            setBlotterData(parsedData);
            parsedData.forEach((item: any) => {
              tempArr = Object.keys(item)
            })
            excelColumnsDataType = parsedData.map(getObjectValueTypes);
            setExcelColumns(Object.keys(parsedData[0]))
            setExcelColumnsDataType(excelColumnsDataType)
            setImportFileError('')
            inputFileRef.current.value ='';
          };
        }
      }

      const ser = (setPage: number) => {
        setPageNumber((prev) => prev + setPage)
      }
    return {
        auth,
        handleDataGridExportToExcel,
        collapsed,
        setCollapsed,
        isOpen,
        setisOpen,
        blotterData,
        setBlotterData,
        blotterColumns,
        setBlotterColumns,
        excelColunms,
        setExcelColumns,
        excelColunmsDataType,
        setExcelColumnsDataType,
        tableDataType,
        setTableDataType,
        resources,
        setResources,
        sheetName,
        setSheetName,
        tableData,
        setTableData,
        fieldMapping,
        setFieldMapping,
        selectImportDropDownValue,
        setSelectImportDropDownValue,
        pageNumber,
        setPageNumber,
        mockData,
        setMockData,
        mockDataDropDown,
        setMockDataDropDown,
        currentTable,
        setCurrentTable,
        importError,
        setImportError,
        importFileError,
        setImportFileError,
        isExcelImported,
        setExcelImported,
        dataTypeValue,
        setDataTypeValue,
        onContentReady,
        uploadHistory,
        onToolbarPreparing,
        onHandleChange,
        handleOnFieldMappingChange,
        handleImportProceed,
        handleChangeMockData,
        handleResetImport,
        handleIsOpen,
        handleFileUpload,
        inputFileRef,
        ser
    }
}

export default useDashboard;