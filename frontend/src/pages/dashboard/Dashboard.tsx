import { useEffect } from "react"
import DataGrid, { Column, SearchPanel, Export } from 'devextreme-react/data-grid';
import "./dashboardStyles.scss"
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"
import { FormControl, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCheckboxCircleFill, RiCloseLine, RiRefreshLine } from "react-icons/ri";
import axiosInstance from "../../config/axiosInstance";
import { getUpdatedValues } from "../../utils/common";
import useDashboard from "../../hooks/useDashboard";

  const Dashboard = () => {
    const {
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
  } = useDashboard()

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

  useEffect(() => {
    axiosInstance.get('/table/getAllTables').then((res: any) => {
      setTableData(getUpdatedValues(res.data))
    }).catch((err: any) => { })  

  }, [])

  return (
    <div className="dashboardWrapper">
      <div className="topWrapper">
        {/* <div className="welcomeMsg">
          <h2>Hello, {auth.user}</h2>
          <button onClick={ser}>page</button>
        </div> */}
          <div className="d-flex">
            <div className="selectMockData">
            <label>Mock Data Type</label>
              <FormControl sx={{ width:220 }}>
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
            </div>
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
          {sheetName && <span>Imported file: {sheetName}
            </span> }
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
          className="dxTable"
        >
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          {blotterColumns.map((data: any) => {
            return <Column dataField={data.dataField ? data.dataField : data}  caption={data.caption ? data.caption : data} dataType={data.dataType ? data.dataType : 'string'} format={data.dataType === 'date' ? 'dd MMM yy' : ''}/>
          })}
          <Export enabled={true} />
          {/* <Paging defaultPageSize={10} /> */}
        </DataGrid>
          {!isExcelImported && <div className="tableNav">
            <button disabled={pageNumber === 1} onClick={()=>ser(-1)}><RiArrowLeftSLine/></button>
            <button disabled={pageNumber === 3} onClick={()=>ser(+1)}><RiArrowRightSLine/></button>
          </div>}
      </section>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
       <div className="modalHead">
          <h4>Import Data</h4>
        <IconButton onClick={() =>{ setisOpen(false); setExcelColumns([]); setSelectImportDropDownValue([]); setFieldMapping({}); handleResetImport()}} className="closeModal" >
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
                  value={dataTypeValue}
                >
                  {/* this can be multiple inputs more then 10 */}
                  <MenuItem key={0} value={''}>{''}</MenuItem>
                  {
                    Object.keys(tableData).map((ele: string, i: number) => (
                      <MenuItem key={i} value={ele}>{ele}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <p className="errorMsg">{importFileError}</p>
            </div>
              <div className="uploadWrapper">
                <DropFileInput onFileDrop={handleFileUpload} />
                <p>Drag & drop your files here or</p>
                <div className="upload-btn-wrapper" >
                  <button className="btn btn-primary">Browse file</button>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onInput={(e)=>handleFileUpload(e)}
                    ref = {inputFileRef}
                  />
                </div>
                
                <span>Only excel files(.xlsx, .xls) with max size 10 MB.</span>
              </div>
            </>
          ) : (
            <>
              <div className="uplodedFile">
                  <span>
                    <div className="successIcon">
                    <RiCheckboxCircleFill/>
                    File name: {sheetName}
                  </div> 
                  
                  <button onClick={() => {setExcelColumns([]); setFieldMapping({}); setSelectImportDropDownValue([]); setDataTypeValue(''); setImportFileError('')}} className="btn-text ml-2">Change</button>
                </span> 
              </div>
              <div className="matchCols">
                <h5>Column matcher</h5>
                <div className="columnRow">
                {
                  blotterColumns.map((item: any, index: number) => (
                    <>
                      <div className="column" key={index}>
                        <label>{item.caption}</label>

                        <FormControl sx={{ minWidth:200 }}>
                          <Select
                            onChange={(e) => handleOnFieldMappingChange(e, item.caption)}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            {/* this can be multiple inputs more then 10 */}
                            <MenuItem value={''}>{''}</MenuItem>
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
                <p className="errorMsg">{importError}</p>
              </div>
              <div className="d-flex">
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
