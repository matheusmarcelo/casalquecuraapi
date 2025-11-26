import { ChartReportInterval } from "src/constants/enums/chartReport/chartReport.enum";
export declare class ChartDataPointDto {
    label: string;
    points: number;
    maxPoints: number;
    date: string;
}
export declare class CustomerChartReportDto {
    minPoints: number;
    maxPoints: number;
    interval: ChartReportInterval;
    data: ChartDataPointDto[];
}
export declare class ReportDto {
    totalWeek: number;
    totalMonth: number;
    totalDone: number;
    totalPoints: number;
    chartReport: CustomerChartReportDto;
}
