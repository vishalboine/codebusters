import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';

export const useDataGridExcelExport = ( fileName: string) => {

    const handleDataGridExportToExcel =(e: any)=> {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(fileName);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            customizeCell: function(options: any) {
                const gridCell = {...options.gridCell};
                if(!gridCell) {
                    return;
                }
            } 
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName + '.xlsx');
                });
        });
        e.cancel = true;
    }

    return handleDataGridExportToExcel

}