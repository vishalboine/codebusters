import React, { useState, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../../state/features/counter/counterSlice';
import { DataGrid } from 'devextreme-react';
import { Column, GroupPanel, Grouping, LoadPanel, Pager, Paging, SearchPanel,Selection } from 'devextreme-react/data-grid';

import Bullet, {
  Font, Margin, Size, Tooltip,
} from 'devextreme-react/bullet';
import ODataStore from 'devextreme/data/odata/store';

export function DiscountCell(cellData) {
  return (
    <Bullet
      showTarget={false}
      showZeroLevel={true}
      value={cellData.value * 100}
      startScaleValue={0}
      endScaleValue={100}
    >
      <Size width={150} height={35} />
      <Margin top={5} bottom={0} left={5} />
      <Tooltip
        enabled={true}
        paddingTopBottom={2}
        zIndex={5}
        customizeTooltip={customizeTooltip}
      >
        <Font size={18} />
      </Tooltip>
    </Bullet>
  );
}

function customizeTooltip(data) {
  return {
    text: `${parseInt(data.value, 10)}%`,
  };
}

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

    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);

    const onContentReady =(e) => {
      if (!collapsed) {
        e.component.expandRow(['EnviroCare']);
        setCollapsed(true);
      }
    }
  return (
    <section style={{ padding: '4rem' }}>
        <p style={{ marginBottom: '2rem' }}>Count is {count}</p>
        <DataGrid
        dataSource={dataSourceOptions}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        onContentReady={onContentReady}
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
        <Column
          dataField="Discount"
          caption="Discount %"
          dataType="number"
          format="percent"
          alignment="right"
          cellRender={DiscountCell}
          cssClass="bullet"
        />
        <Column dataField="SaleDate" dataType="date" />
        <Column dataField="Region" dataType="string" />
        <Column dataField="Sector" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Customer" dataType="string" width={150} />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </section>
  )
}

export default Dashboard