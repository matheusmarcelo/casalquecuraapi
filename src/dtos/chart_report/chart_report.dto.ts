import { ChartReportInterval } from "src/constants/enums/chartReport/chartReport.enum";

export class ChartDataPointDto {
    label: string; // "Mon", "10/11", "Sem 1"
    points: number;
    maxPoints: number;
    date: string;
}

export class CustomerChartReportDto {
    minPoints: number;
    maxPoints: number;
    interval: ChartReportInterval;
    data: ChartDataPointDto[];
}

export class ReportDto {
    totalWeek: number;
    totalMonth: number;
    totalDone: number;
    totalPoints: number;
    chartReport: CustomerChartReportDto;
}