import React, { useEffect, useState } from "react"
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging, SearchPanel,Selection, Export } from 'devextreme-react/data-grid';
import "./Dashboard.scss"
import ODataStore from 'devextreme/data/odata/store';
import * as XLSX from "xlsx";
import { useDataGridExcelExport } from "../../hooks/useDatagridExcelExport";
import Modal from "../../components/Modal";
import Button from "../../components/ui-widgets/Button/Button";
import DropFileInput from "../../components/DropInputFile";
import uploadImg from "../../assets/images/upload.svg"

// export function DiscountCell(cellData) {
//   return (
//     <Bullet
//       showTarget={false}
//       showZeroLevel={true}
//       value={cellData.value * 100}
//       startScaleValue={0}
//       endScaleValue={100}
//     >
//       <Size width={150} height={35} />
//       <Margin top={5} bottom={0} left={5} />
//       <Tooltip
//         enabled={true}
//         paddingTopBottom={2}
//         zIndex={5}
//         customizeTooltip={customizeTooltip}
//       >
//         <Font size={18} />
//       </Tooltip>
//     </Bullet>
//   );
// }

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

const Dashboard = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isOpen, setisOpen] = useState(false)
    const handleDataGridExportToExcel = useDataGridExcelExport('Demo');
    const [selectedFile, setSelectedFile] = useState({});
    const [blotterData, setBlotterData] = useState({});

    useEffect(()=>{
      setBlotterData(dataSourceOptions)
    },[dataSourceOptions])

    useEffect(() => {
      console.log(selectedFile);
      
    },[selectedFile])


    const handleFileUpload = (e: any) => {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setBlotterData(parsedData);
      };
    }
    const handleIsOpen = () => {
      setisOpen(prev => !prev)
    }

    const onContentReady =(e: any) => {
      if (!collapsed) {
        e.component.expandRow(['EnviroCare']);
        setCollapsed(true);
      }
    }

  return (
    <div className="dashboard">
      <div className="leftNav">
        <div className="head">
          <svg width="48" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_154_33311)">
            <path d="M13.62 17.88V30.12L24.5 36.24V24M13.62 17.88L24.5 11.76L35.38 17.88M13.62 17.88L24.5 24M24.5 24L35.38 17.88M35.38 17.88V24M38.1 32.16H28.58M28.58 32.16L32.66 28.08M28.58 32.16L32.66 36.24" stroke="#EDF1FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <filter id="filter0_d_154_33311" x="-3.5" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.092126 0 0 0 0 0.45 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_154_33311"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_154_33311" result="shape"/>
            </filter>
            </defs>
          </svg>
        </div>
        <div className="navMenu">
          <div className="topMenu">
            <li className="active">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                stroke="#ADBDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </li>
            <a href="">

            </a>
          </div>
          <div className="bottomMenu">
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_153_15954)">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#ADBDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#ADBDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_153_15954">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </li>
          </div>
        </div>
      </div>
      <div className="rightPanel">
        <div className="topBar">
          <div className="profileInfo">
            <h2>Hello,David</h2>
          </div>
          {/* <div className="globalSearch">
            <input placeholder="Search"></input>
          </div> */}
            <Button onClick={handleIsOpen} className="btn btn-import" title={
              <>
                <img src={uploadImg} alt="" />
                Import
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
        >
          {/* <GroupPanel visible={true} /> */}
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          {/* <Grouping autoExpandAll={false} /> */}
          <Selection
            mode="single"
            selectAllMode="page" />

          <Column dataField="Product" />
          <Column
            dataField="Amount"
            caption="Sale Amount"
            dataType="number"
            format="currency"
            alignment="right"
          />
          {/* <Column
            dataField="Discount"
            caption="Discount %"
            dataType="number"
            format="percent"
            alignment="right"
            cellRender={DiscountCell}
            cssClass="bullet"
          /> */}
          <Column dataField="SaleDate" dataType="date" />
          <Column dataField="Region" dataType="string" />
          <Column dataField="Sector" dataType="string" />
          <Column dataField="Channel" dataType="string" />
          <Column dataField="Customer" dataType="string" width={150} />
          <Export enabled={true} allowExportSelectedData={false} />
          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
        </section>
      </div>
      <Modal isOpen={isOpen} handleClose={handleIsOpen}>
        <select name="" id="" value='Transactions'>
          <option value="customer">Customer Master Data</option>
          <option value="transactions">Transations</option>
        </select>
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