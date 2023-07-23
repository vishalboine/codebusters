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
import Dropdown from "../../components/widgets/DropDown/Dropdown";


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
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const list = ['January', 'Feburary', 'March', 'April', 'May'];
    const [selectedItem, setSelectedItem] = useState('');
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
      <div className="welcome-msg">
        <h2>Welcome, David</h2>
      </div>
      <div className="import-btn">
        <Button  onClick={handleIsOpen} title={
          <>
            <img src={uploadImg} alt="" />
            <span>Import</span>
          </>
        } />
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
            {/* <GroupPanel visible={true} /> */}
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            {/* <Grouping autoExpandAll={false} /> */}
            {/* <Selection
              mode="single"
              selectAllMode="page" /> */}

            {/* <Column dataField="Product" />
            <Column
              dataField="Amount"
              caption="Sale Amount"
              dataType="number"
              format="currency"
              alignment="right"
            />
            <Column dataField="SaleDate" dataType="date" />
            <Column dataField="Region" dataType="string" />
            <Column dataField="Sector" dataType="string" />
            <Column dataField="Channel" dataType="string" />
            <Column dataField="Customer" dataType="string" width={150} /> */}
            {blotterColumns.map((item : any)=>{
            return <Column dataField={item}/>})}
            <Export enabled={true} />
            <Pager visible={true} allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        </section>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
        <Dropdown 
          list={list} 
          isDropDownOpen={isDropDownOpen} 
          selectedItem={selectedItem}
          setIsDropDownOpen={setIsDropDownOpen}
          setSelectedItem={setSelectedItem}
        />
        <DropFileInput onFileDrop={handleFileUpload} />
        <br />
        or
        <br />
        <input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleFileUpload} 
            />
        <Button variant="danger" onClick={handleIsOpen} title='Close' />
      </Modal>
    </div>
  )
}

export default Dashboard