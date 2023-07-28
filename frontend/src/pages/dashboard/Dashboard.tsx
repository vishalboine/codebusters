import React, { useEffect, useState } from "react"
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel, Export } from 'devextreme-react/data-grid';
import "./dashboardStyles.scss"
import ODataStore from 'devextreme/data/odata/store';
import * as XLSX from "xlsx";
import { useDataGridExcelExport } from "../../hooks/useDatagridExcelExport";
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"
import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
import { RiCloseLine, RiRefreshLine } from "react-icons/ri";
import axiosInstance from "../../config/axiosInstance";
import useAuth from "../../hooks/useAuth";
import { CustomerMasterData, TableName } from "../../mock/data";
import { checkForDuplicates, getUpdatedValues } from "../../utils/common";


const pageSizes = [10, 25, 50, 100];

type Props = {}


const Dashboard = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const handleDataGridExportToExcel = useDataGridExcelExport('Demo');
  const [blotterData, setBlotterData] = useState({});
  const [excelColunms, setExcelColumns] = useState([]);
  const [blotterColumns, setBlotterColumns] : any = useState(CustomerMasterData);
  const [resources, setResources]: any = useState([]);
  const [sheetName, setSheetName] = useState('');
  const [tableData, setTableData] : any = useState({});
  const [fieldMapping, setFieldMapping] : any = useState({});
  const [selectImportDropDownValue, setSelectImportDropDownValue] : any = useState([])
  const { auth } = useAuth();
  const [pageNumber, setPageNumber] = useState(1)


  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    let tempArr: any = []
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
      setExcelColumns(tempArr)
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
     console.log(res.data);
     
    }).catch((err: any) => { })

  }, [])

  useEffect(() => {
    axiosInstance.get(`/mock?pageNumber=${pageNumber}`).then((res: any) => {
      console.log(res.data);
      
     }).catch((err: any) => { })
  },[pageNumber])

  const ser = () => {
    setPageNumber((prev) => prev + 1)
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
    if(Object.keys(tableData).includes(e.target.value)){
      tableData[e.target.value].map((item:any)=>{
        tempArr = [...tempArr, {dataField: '', caption: item}]
      })
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
    if(checkForDuplicates(fieldMappingArrValues)){
      //validation for duplicate dropdown value
    }else{
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
      setisOpen(false);
    }
  }

  return (
    <div className="dashboardWrapper">
      <div className="topWrapper">
        {/* <div className="welcomeMsg">
          <h2>Hello, {auth.user}</h2>
          <button onClick={ser}>page</button>
        </div> */}
          <div className="d-flex">
            <FormControl sx={{ minWidth:226 }} >
              <Select
                onChange={(e)=>{
                  //api call mock data
                }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {/* this can be multiple inputs more then 10 */}
                {
                  TableName.map((ele: string, i: number) => (
                    <MenuItem value={ele}>{ele}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <IconButton className="resetData" >
              <RiRefreshLine/>
            </IconButton>
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
            <span>Selected file: {sheetName}
            </span> 
          </div>
        </div>
        <DataGrid
          dataSource={blotterData}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
          onContentReady={onContentReady}
          onExporting={handleDataGridExportToExcel}
          onToolbarPreparing={onToolbarPreparing}
          height={450}
          className="dxTable"
        >
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          {blotterColumns.map(({dataField, caption}: any) => {
            return <Column dataField={dataField}  caption={caption}/>
          })}
          <Export enabled={true} />
          <Pager visible={true} allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
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
              <FormControl sx={{ minWidth:226 }}>
                <Select
                  onChange={(e)=>{onHandleChange(e)}}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {/* this can be multiple inputs more then 10 */}
                  {
                    Object.keys(tableData).map((ele: string, i: number) => (
                      <MenuItem value={ele}>{ele}</MenuItem>
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
                        <p>{item.caption}</p>

                        <FormControl sx={{ minWidth:200 }}>
                          <Select
                            onChange={(e) => handleOnFieldMappingChange(e, item.caption)}
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={selectImportDropDownValue[index]}
                          >
                            {/* this can be multiple inputs more then 10 */}
                            {
                              excelColunms.map((ele: string, i: number) => (
                                <MenuItem value={ele}>{ele}</MenuItem>
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