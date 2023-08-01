import { useEffect, useState } from "react"
import { DataGrid } from 'devextreme-react';
import { Column, SearchPanel, Export } from 'devextreme-react/data-grid';
import "./dashboardStyles.scss"
import * as XLSX from "xlsx";
import { useDataGridExcelExport } from "../../hooks/useDatagridExcelExport";
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"
import { FormControl, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine, RiRefreshLine } from "react-icons/ri";
import axiosInstance from "../../config/axiosInstance";
import useAuth from "../../hooks/useAuth";
import { CustomerMasterData } from "../../mock/data";
import { addDataTypeKey, areAllElementsSame, checkForDuplicates, compareValues, getObjectValueTypes, getUpdatedValues } from "../../utils/common";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const handleDataGridExportToExcel = useDataGridExcelExport('Demo');
  const [blotterData, setBlotterData] = useState({});
  const [excelColunms, setExcelColumns] = useState([]);
  const [excelColunmsDataType, setExcelColumnsDataType] : any = useState({});
  const [blotterColumns, setBlotterColumns] : any = useState(CustomerMasterData);
  const [tableDataType, setTableDataType] : any = useState([]);
  const [resources, setResources]: any = useState([]);
  const [sheetName, setSheetName] = useState('');
  const [tableData, setTableData] : any = useState({});
  const [fieldMapping, setFieldMapping] : any = useState({});
  const [selectImportDropDownValue, setSelectImportDropDownValue] : any = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [mockData, setMockData]:any = useState({})
  const [mockDataDropDown, setMockDataDropDown] = useState('Demo1')
  const [currentTable, setCurrentTable] = useState({});


  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    let tempArr: any = []
    let excelColumnsDataType :  any =[]
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      setSheetName(sheetName)
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setBlotterData(parsedData);
      parsedData.forEach((item: any) => {
        tempArr = Object.keys(item)
      })
      excelColumnsDataType = parsedData.map(getObjectValueTypes);
      setExcelColumns(tempArr)
      setExcelColumnsDataType(excelColumnsDataType)
    };
  }
  const handleIsOpen = () => {
    setisOpen((prev: any) => !prev)
  }

  useEffect(() => {
    axiosInstance.get('/resource').then((res: any) => {
      setResources(res.data)
    }).catch((err: any) => { })
    axiosInstance.get(`/mock?pageNumber=${pageNumber}`).then((res: any) => {
      setMockData(res.data)
    }).catch((err: any) => { })

  }, [])

  useEffect(() => {
    axiosInstance.get('/validations/getValidations').then((res: any) => {
      setTableDataType(getUpdatedValues(res.data))
    }).catch((err: any) => { })

  }, [])

  useEffect(()=>{
    if(Object.keys(mockData).length > 0){
      setBlotterColumns(Object.keys(mockData.Demo1[0]))
      setBlotterData(mockData['Demo1'])
    }
  },[mockData])

  useEffect(() => {
    axiosInstance.get(`/mock?pageNumber=${pageNumber}`).then((res: any) => {
      setMockData(res.data)
     }).catch((err: any) => { })
  },[pageNumber])

  const ser = (setPage: number) => {
    setPageNumber((prev) => prev + setPage)
  }

  useEffect(() => {
    axiosInstance.get('/table/getAllTables').then((res: any) => {
      setTableData(getUpdatedValues(res.data))
    }).catch((err: any) => { })

  }, [])


  const onContentReady = (e: any) => {
    if (!collapsed) {
      e.component.expandRow(['EnviroCare']);
      setCollapsed(true);
    }
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
    setSelectImportDropDownValue([...selectImportDropDownValue,e.target.value])
    setFieldMapping({...fieldMapping})
  }

  const handleImportProceed = () => {
    const fieldMappingArrValues = Object.values(fieldMapping);
    const fieldMappingArrKeys = Object.keys(fieldMapping);

    //returns which all columns are having valid/invalid datatype
    const checkTableExcelDataType = compareValues(currentTable, excelColunmsDataType[0], fieldMapping)
    if(!areAllElementsSame(excelColunmsDataType)){
      // validation for all excel data should be of same datatype wrt column
    }else if(checkForDuplicates(fieldMappingArrValues)){
      //validation for duplicate dropdown value
    }else if (!Object.values(checkTableExcelDataType).every(value => value === true)){
      // excel column dataType must be same as table column datatypes
    }
    else{
      const blotterColumnsArr : any= blotterColumns;
      blotterColumnsArr.map((item:any, index: any)=>{
        fieldMappingArrKeys.map((data:any)=>{
          if(item.caption === data){
            item.dataField = fieldMapping[data]
          }
        })
      })
      setBlotterColumns(blotterColumnsArr);
      setExcelColumns([]);
      setFieldMapping({});
      setSelectImportDropDownValue([]);
      setMockDataDropDown('')
      setisOpen(false);
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
    setBlotterColumns(Object.keys(mockData.Demo1[0]))
    setBlotterData(mockData['Demo1'])
  }

  return (
    <div className="dashboardWrapper">
      <div className="topWrapper">
        {/* <div className="welcomeMsg">
          <h2>Hello, {auth.user}</h2>
          <button onClick={ser}>page</button>
        </div> */}
          <div className="d-flex">
            <FormControl sx={{ minWidth:226 }}>
              <Select
                onChange={(e)=>{handleChangeMockData(e);}}
                value={mockDataDropDown}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {/* this can be multiple inputs more then 10 */}
                <MenuItem value={''}>{''}</MenuItem>
                {
                  Object.keys(mockData).map((ele: string, i: number) => (
                    <MenuItem key={i} value={ele}>{ele}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <Tooltip title="Reset data" placement="right">
              <IconButton className="resetData" onClick={()=>handleResetImport()}>
                <RiRefreshLine/>
              </IconButton>
            </Tooltip>
            
          </div>
          <Button onClick={handleIsOpen} className="btn import-btn" title={
            <>
              <img src={uploadImg} alt="" />
              <span>Import</span>
            </>
          } />
      </div>
      <section>
        <div className="dataTypeSelector">
          <div className="uplodedFile">
            <span>Imported file: {sheetName}
            </span> 
          </div>
        </div>
        <DataGrid
          dataSource={blotterData}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
          columnAutoWidth={true}
          onContentReady={onContentReady}
          onExporting={handleDataGridExportToExcel}
          onToolbarPreparing={onToolbarPreparing}
          // height={450}
          className="dxTable"
        >
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          {blotterColumns.map((data: any) => {
            return <Column dataField={data.dataField ? data.dataField : data}  caption={data.caption ? data.caption : data} dataType={data.dataType ? data.dataType : 'string'}/>
          })}
          <Export enabled={true} />
          {/* <Paging defaultPageSize={10} /> */}
        </DataGrid>
          <div className="tableNav">
            <button disabled={pageNumber !== 1} onClick={()=>ser(-1)}><RiArrowLeftSLine/></button>
            <button disabled={pageNumber !== 3} onClick={()=>ser(+1)}><RiArrowRightSLine/></button>
          </div>
      </section>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
       <div className="modalHead">
          <h4>Import Data</h4>
        <IconButton onClick={() =>{ setisOpen(false); setExcelColumns([]); setSelectImportDropDownValue([]); setFieldMapping({});}} className="closeModal" >
            <RiCloseLine/>
          </IconButton>
       </div>
        {
          excelColunms.length <= 0 ? (
            <>
            <div className="dataTypeSelector">
              <label>Data Type</label>
              <FormControl sx={{ minWidth:226 }}>
                <Select
                  onChange={(e)=>{onHandleChange(e)}}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {/* this can be multiple inputs more then 10 */}
                  {
                    Object.keys(tableData).map((ele: string, i: number) => (
                      <MenuItem key={i} value={ele}>{ele}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
              <div className="uploadWrapper">
                <DropFileInput onFileDrop={handleFileUpload} />
                <p>Drag & drop your files here or</p>
                <div className="upload-btn-wrapper">
                  <button className="btn btn-primary">Browse file</button>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                  />
                </div>
                <span>Only excel files(.xlsx, .xls) with max size 10 MB.</span>
              </div>
            </>
          ) : (
            <>
              <div className="uplodedFile">
                <span>Selected file: {sheetName}
                  {/* <div className="successIcon">
                    <RiCheckboxCircleFill/>
                  </div> */}
                  <button onClick={() => {setExcelColumns([]); setFieldMapping({}); setSelectImportDropDownValue([]);}} className="btn-text">Change file</button>
                </span> 
              </div>
              <div className="matchCols">
                {
                  blotterColumns.map((item: any, index: number) => (
                    <>
                      <div className="column" key={index}>
                        <label>{item.caption}</label>

                        <FormControl sx={{ minWidth:200 }}>
                          <Select
                            onChange={(e) => handleOnFieldMappingChange(e, item.caption)}
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={selectImportDropDownValue[index]}
                          >
                            {/* this can be multiple inputs more then 10 */}
                            {
                              excelColunms.map((ele: string, i: number) => (
                                <MenuItem key={i} value={ele}>{ele}</MenuItem>
                              ))
                            }

                          </Select>
                        </FormControl>
                      </div>
                    </>
                  ))
                }
              </div>
              <div className="d-flex">
                <button onClick={() => {setSelectImportDropDownValue([]); }} className="btn btn-text">Reset</button>
                <button onClick={() => { handleImportProceed()}} className="btn btn-primary">Proceed</button>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}

export default Dashboard
