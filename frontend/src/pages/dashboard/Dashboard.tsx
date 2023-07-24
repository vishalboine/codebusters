import React, { useEffect, useState } from "react"
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel,Selection, Export } from 'devextreme-react/data-grid';
import "./dashboardStyles.scss"
import ODataStore from 'devextreme/data/odata/store';
import * as XLSX from "xlsx";
import { useDataGridExcelExport } from "../../hooks/useDatagridExcelExport";
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"
import { FormControl, Select, MenuItem } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";

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

let initalBlotterColumns:any = ['Product', 'Amount', 'SalesDate', 'Region', 'Sector', 'Channel', 'Customer']
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
    const [blotterColumns, setBlotterColumns] = useState(initalBlotterColumns);
    useEffect(()=>{
      setBlotterData(dataSourceOptions)
    },[dataSourceOptions])


    const handleFileUpload = (e: any) => {
      const reader = new FileReader();
      let tempArr : any = []
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setBlotterData(parsedData);
        parsedData.forEach((item:any)=>{
          tempArr = Object.keys(item)
        })
        setExcelColumns(tempArr)
      };
    }
    const handleIsOpen = () => {
      setisOpen((prev:any) => !prev)
    }

    const onContentReady =(e: any) => {
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
              icon: "https://www.figma.com/file/rmPGhggUM4sQpyfklStGDT/ImportWizard?type=design&node-id=259-16012&mode=design&t=7IWtcna47mDoso80-4",
              text: "Export",
              onClick: () => {
                  handleDataGridExportToExcel(e)
              },
              hint: 'Export Selected Models',
          }
      })
  }

  return (
    <div className="dashboardWrapper">
      <div className="topWrapper">
        <div className="welcome-msg">
          <h2>Welcome, David</h2>
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
          <DataGrid
            dataSource={blotterData}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            onContentReady={onContentReady}
            onExporting={handleDataGridExportToExcel}
            onToolbarPreparing={onToolbarPreparing}
            height={450}
          >
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            {blotterColumns.map((item : any)=>{
            return <Column dataField={item}/>})}
            <Export enabled={true} />
            <Pager visible={true} allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        </section>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
        <Button className="closeModal" onClick={handleIsOpen} aria-label="Close"> <RiCloseLine/> </Button>
        {
          excelColunms.length <= 0 ? (
            <>
              <div className="uploadWrapper">
                <DropFileInput onFileDrop={handleFileUpload} />
                <p>Drag & drop your files here <br /> or <br /></p>
                <div className="upload-btn-wrapper">
                  <button className="btn btn-primary">Browse a file</button>
                  <input 
                  type="file" 
                  accept=".xlsx, .xls" 
                  onChange={handleFileUpload} 
                />
                </div> 
                
                
              </div>
            </>
          ) : (
            <div className="matchCols">
              {
                ['Product Name', 'Product Id', 'Product Date'].map((item: string, index:number) => (
                  <>
                    <div className="column" key={index}>
                      <p>{item}</p> 
                    
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={['Product Name', 'Product Id', 'Product Date'][0]}
                          onChange={() => console.log(item)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {/* this can be multiple inputs more then 10 */}
                          {
                            ['Product Name', 'Product Id', 'Product Date'].map((ele: string, i: number) => (
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
          )
        }
        
      </Modal>
    </div>
  )
}

export default Dashboard