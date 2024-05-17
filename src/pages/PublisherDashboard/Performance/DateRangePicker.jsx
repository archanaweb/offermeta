import React from "react";
import "rsuite/dist/rsuite.css";
import { DateRangePicker } from 'rsuite';

const DateRangeCalender = ()=> {
    return (
        <>
        <div className="datePicker">
            <DateRangePicker />
        </div>
        </>
    )
}
export default DateRangeCalender;