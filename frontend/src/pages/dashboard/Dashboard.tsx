import React, { useEffect, useState } from "react"
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel, Selection, Export } from 'devextreme-react/data-grid';
import "./dashboardStyles.scss"
import ODataStore from 'devextreme/data/odata/store';
import * as XLSX from "xlsx";
import { useDataGridExcelExport } from "../../hooks/useDatagridExcelExport";
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"
import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
import { RiCloseLine, RiCheckboxCircleFill } from "react-icons/ri";
import axiosInstance from "../../config/axiosInstance";
import useAuth from "../../hooks/useAuth";
import { BillingData, CustomerMasterData, TransactionData, data } from "../../mock/data";

const dataSourceOptions = {
  store: new ODataStore({
    url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
    key: 'Id',
    beforeSend(request) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};

const pageSizes = [10, 25, 50, 100];

type Props = {}

let initalBlotterColumns: any = ['Product', 'Amount', 'SalesDate', 'Region', 'Sector', 'Channel', 'Customer']
// const excelColumns:any = ['Abc', 'Xyz', "Pqr"]
// let columnMap :any = {'Product': 'Abc', 'Amount':'Xyz', 'SalesDate': 'Pqr' }
// console.log('columnMap',columnMap['Product'])


// Object.keys(columnMap).map((data:any)=>{
// let temp = initalBlotterColumns.filter((ele:any) => Object.keys(columnMap).includes(ele))
// temp = Object.values(columnMap)
// initalBlotterColumns = temp
// })
// console.log('initalBlotterColumns', initalBlotterColumns)

const Dashboard = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const handleDataGridExportToExcel = useDataGridExcelExport('Demo');
  const [blotterData, setBlotterData] = useState({});
  const [excelColunms, setExcelColumns] = useState([]);
  const [blotterColumns, setBlotterColumns] = useState(CustomerMasterData);
  const [resources, setResources]: any = useState([]);
  const [sheetName, setSheetName] = useState('');
  const { auth } = useAuth();
  useEffect(() => {
    setBlotterData(dataSourceOptions)
  }, [dataSourceOptions])


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

  }, [])

  useEffect(() => {
    axiosInstance.get('/table/getAllTables').then((res: any) => {
      // setResources(res.data)
      console.log(res);
      
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
    console.log(e.target.value)
    if(e.target.value === 'Customer Master Data'){
      setBlotterColumns(CustomerMasterData)
    }else if(e.target.value === 'Billing Data'){
      setBlotterColumns(BillingData)
    }else if(e.target.value === 'Transaction Data'){
      setBlotterColumns(TransactionData)
    }
  }

  return (
    <div className="dashboardWrapper">
      <div className="topWrapper">
        <div className="welcomeMsg">
          <h2>Hello, {auth.user}</h2>
        </div>
        <div>
          <Button onClick={handleIsOpen} className="btn import-btn" title={
            <>
              <img src={uploadImg} alt="" />
              <span>Import</span>
            </>
          } />
        </div>
      </div>
      <section>
        <div className="dataTypeSelector">
          <FormControl sx={{ minWidth:226 }}>
            <Select
              onChange={(e)=>{onHandleChange(e)}}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              defaultValue={'Customer Master Data'}
            >
              {/* this can be multiple inputs more then 10 */}
              {
                Object.keys(data).map((ele: string, i: number) => (
                  <MenuItem value={ele}>{ele}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
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
          {blotterColumns.map((item: any) => {
            return <Column dataField={item} />
          })}
          <Export enabled={true} />
          <Pager visible={true} allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
      </section>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
       <div className="modalHead">
          <h4>Import Data</h4>
        <IconButton onClick={() =>{ setisOpen(false); setExcelColumns([])}} className="closeModal" >
            <RiCloseLine/>
          </IconButton>
       </div>
        {
          excelColunms.length <= 0 ? (
            <>
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
                  <button onClick={() => setExcelColumns([])} className="btn-text">Change file</button>
                </span> 
              </div>
              <div className="matchCols">
                {
                  blotterColumns.map((item: string, index: number) => (
                    <>
                      <div className="column" key={index}>
                        <p>{item}</p>

                        <FormControl sx={{ minWidth:200 }}>
                          <Select
                            onChange={() => console.log(item)}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            {/* this can be multiple inputs more then 10 */}
                            {
                              excelColunms.map((ele: string, i: number) => (
                                <MenuItem value={i}>{ele}</MenuItem>
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
                <button onClick={() => { }} className="btn btn-text">Reset</button>
                <button onClick={() => { }} className="btn btn-primary">Proceed</button>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}

export default Dashboard