"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportDto = exports.CustomerChartReportDto = exports.ChartDataPointDto = void 0;
class ChartDataPointDto {
    label;
    points;
    maxPoints;
    date;
}
exports.ChartDataPointDto = ChartDataPointDto;
class CustomerChartReportDto {
    minPoints;
    maxPoints;
    interval;
    data;
}
exports.CustomerChartReportDto = CustomerChartReportDto;
class ReportDto {
    totalWeek;
    totalMonth;
    totalDone;
    totalPoints;
    chartReport;
}
exports.ReportDto = ReportDto;
//# sourceMappingURL=chart_report.dto.js.map