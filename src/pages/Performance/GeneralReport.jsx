import React, { useEffect, useRef, useState } from "react";
import BASE_URL from "../../Api/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPTotalCRate, fetchPTotalClicks, fetchPTotalConversion, fetchPTotalPayout, fetchPTotalProfit, fetchPTotalRevenue } from "../../Redux/PerformanceSlice";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";

const GeneralReport = ()=> {
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const total = useSelector((state)=> state.performance)
    const [offerReport, setOfferReport] = useState([])
    const [eventLoading, setEventLoading] = useState(false);
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
    const dispatch = useDispatch()

    const fetchOfferReport = async ({apiEndPoint})=> {
        console.log('event loading')
        setEventLoading(true)
        try {
            const res = await fetch(`${BASE_URL}${apiEndPoint}`)
            const resData = await res.json()
            setOfferReport(resData.responseResult);
            setEventLoading(false)
        }catch (error) {
            console.error('Error fetching click data:', error);
            toast.error('Something went wrong')
            setEventLoading(true)
          }
    }

    async function handleTotalReportData() {
        await fetchOfferReport({apiEndPoint:`report/offerReport?partners_Id=${loggedUser?._id}`})
        await dispatch(fetchOfferList({partners_Id:loggedUser?._id, currentPage:1}))
        await dispatch(fetchPTotalProfit(loggedUser?._id))
        await dispatch(fetchPTotalPayout(loggedUser?._id))
        await dispatch(fetchPTotalRevenue(loggedUser?._id))
        await dispatch(fetchPTotalConversion(loggedUser?._id))
        await dispatch(fetchPTotalCRate(loggedUser?._id))
        await dispatch(fetchPTotalClicks(loggedUser?._id))
    }
    const handleClickOutside = (e)=> {
        if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
          setOpen(false)
        }
      }
      const handleDateChange = (item)=> {
        setState([item.selection])
      }
    
    useEffect(()=> {
        handleTotalReportData()
        document.addEventListener('click', handleClickOutside)
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
    },[])
    
    const handleClickDate = ()=> {
        fetchOfferReport({apiEndPoint: `report/offerReport?partners_Id=${loggedUser?._id}&startDate=${startDate}&endDate=${endDate}`})
    }
    useEffect(()=> {
        setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
        setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
    },[state])
    return (
        <>
        <div className="table-container">
        <div className="row border-bottom mb-2">
            <div className="col-lg-12 d-flex justify-content-start align-items-center mb-2 custome-radio">
                <input type="radio" name="size" id="size_1" value="small" defaultChecked />
                <label for="size_1">Custom</label>
                <input type="radio" name="size" id="size_2" value="small" />
                <label for="size_2">Daily</label>
                <input type="radio" name="size" id="size_3" value="small" />
                <label for="size_3">Weekly</label>
                <input type="radio" name="size" id="size_4" value="small" />
                <label for="size_4">Monthly</label>
                <input type="radio" name="size" id="size_22" value="small" />
                <label for="size_22">Conversions</label>
                <input type="radio" name="size" id="size_5" value="small" />
                <label for="size_5">Advertisers</label>
                <input type="radio" name="size" id="size_6" value="small" />
                <label for="size_6">Account Managers</label>
                <input type="radio" name="size" id="size_7" value="small" />
                <label for="size_7">Affiliates Managers</label>
                <input type="radio" name="size" id="size_8" value="small" />
                <label for="size_8">Offers</label>
                <input type="radio" name="size" id="size_9" value="small" />
                <label for="size_9">Affiliates</label>
                <input type="radio" name="size" id="size_10" value="small" />
            </div>
        </div>
        <div className="border-bottom mb-2 performance-filter">
            {/* <div className="col-lg-12 d-flex justify-content-start align-items-center mb-2 gap-2">
                <div className="form-group mb-2">
                    <label>Data Range</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Timezone</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Account Managers</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Affilates Managers</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form-group mb-2">
                    <label> Offers</label>
                    <div className="position-relative">
                    <i className="position-absolute fa-solid fa-magnifying-glass"></i>
                        <input className="form-control"
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </div>
            <div className="col-lg-12 d-flex justify-content-start align-items-center gap-2">
                
                <div className="form-group mb-2">
                    <label>Affilates</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Advertisers</label>
                    <input className="form-control"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div> */}
            {/* <div className="col-lg-12 d-flex justify-content-start align-items-center mb-2 gap-2">
                <div className="form-group mb-2">
                    <label>Optimization tool</label>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <label class="radio-inline">
                            <input type="radio" name="optradio" defaultChecked/> <span>Off</span>
                            <div class="radio-button__custom-indicator"></div>
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" /> <span>Unoptimized</span>
                            <div class="radio-button__custom-indicator"></div>
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" /><span> Optimized</span>
                            <div class="radio-button__custom-indicator"></div>
                        </label>
                    </div>
                </div>
            </div> */}
              <div className="row mb-3 mt-3">
            <div className="col-lg-3">
              <div className="calenderWrap" ref={datePickerRef}>
                <div className="calenderInput">
                  <i className="fa-regular fa-calendar"></i>
                  <input value={`${format(state[0].startDate, 'yyyy-MM-dd')} to ${format(state[0].endDate, 'yyyy-MM-dd')}`} 
                  readOnly 
                  className="inputBox"
                  onClick={()=> setOpen(!open)} />
                </div>
              {open &&  <DateRangePicker className="calenderElement"
                  onChange={item => handleDateChange(item)}
                  showSelectionPreview={true}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />}
              </div>
                </div>
      <div className="col-lg-2">
        <button type="button" className="btn btn-primary" onClick={handleClickDate}>Apply</button>
      </div>
            </div>
        </div>
        {/* <div className="row border-bottom mb-2">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-2">
            <div class="currency-radio d-flex justify-content-start align-items-center gap-2"> 
               
                <input type="radio" name="currency" id="currency_1" value="small" defaultChecked />
                   <label for="currency_1"> All/EUR </label>
                    <input type="radio" name="currency" id="currency_2" value="small" />
                    <label for="currency_2">ANG
               </label>
                    <input type="radio" name="currency" id="currency_3" value="small" />
                    <label for="currency_3">  BTC
                </label>
                    <input type="radio" name="currency" id="currency_4" value="small" />
                    <label for="currency_4">EUR
                </label>
                    <input type="radio" name="currency" id="currency_5" value="small" />
                    <label for="currency_5">  INR
                </label>
                    <input type="radio" name="currency" id="currency_6" value="small" />
                    <label for="currency_6"> RUB
                </label>
                    <input type="radio" name="currency" id="currency_7" value="small" />
                    <label for="currency_7"> USD 
               </label>
            </div>
              <div className="d-flex justify-content-between align-items-center gap-2">
                <Link className="btn btn-outline-secondary">Clear</Link>
                <Link className="btn btn-primary">Apply</Link>
              </div>
            </div>
        </div> */}
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-end align-items-center mb-2 perf-select">
              {/* <select className="form-control w-25">
                <option value='' hidden>Search<i className="fa-solid fa-angle-down"></i></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select> */}
              <div className="d-flex justify-content-between align-items-center gap-4">
                    <i className="fa-solid fa-plus"></i>
                    {/* <i className="fa-solid fa-link"></i> */}
                    <i class="fa-solid fa-gear"></i>
              </div>
            </div>
        </div>
        <div className="table-responsive">
        <table className="table performance-table">
          <thead>
            <tr>
              <th></th>
              <th colspan="4">TRAFFIC</th>
              <th colspan="2">IMPRESSIONS</th>
              <th colspan="2">APPROVED</th>
              <th colspan="2">HOLD</th>
              <th colspan="2">PENDING</th>
              <th colspan="2">DECLINED</th>
              <th></th>
              <th></th>
              <th></th>
              <th colspan="4">TOTAL</th>
            </tr>
            <tr>
                <th>OFFERS</th>
                <th>UNIQUE CLICKS</th>
                <th>GROSS CLICKS</th>
                <th>REVENUE</th>
                <th>TRAFFICBACK</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>CR</th>
                <th>EPC</th>
                <th>ECPM</th>
                <th>CONVERSION</th>
                <th>REVENUE</th>
                <th>PAYOUTS</th>
                <th>Profits</th>
            </tr>
          </thead>
        {eventLoading ? <tbody>
            <tr>
                <td colSpan={10}><div className='spinner'>
                </div></td>
              </tr>
        </tbody> : 
        <tbody>
           {offerReport ? offerReport.map((item)=><tr key={item._id}>
                <td>(ID: {item.offerId}) {item.offerName}</td>
                <td>{item.uniqueClicks}</td>
                <td>{item.clicks}</td>
                <td>0.00</td>
                <td>0</td>
                <td>{item?.impressions}</td>
                <td>0.00</td>
                <td>{item?.conversions}</td>
                <td>{item?.totalRevenue}</td>
                <td>0</td>
                <td>0.00</td>
                <td>0</td>
                <td>0.00</td>
                <td>0</td>
                <td>0.00</td>
                <td>{item.totalCR}</td>
                <td>0.00</td>
                <td>0</td>
                <td>{item?.conversions}</td>
                <td>{item.totalRevenue}</td>
                <td>{item.totalPayout}</td>
                <td>{item.totalProfit}</td>
            </tr>): 
            <tr>
                <td colSpan={2}>Data not found</td>
            </tr>}
         </tbody>}
         <tfoot>
         <tr>
                <td>Total on page</td>
                <td>9</td>
                <td>7</td>
                <td>0.00</td>
                <td>1</td>
                <td>0</td>
                <td>0.00</td>
                <td>1</td>
                <td>0.00</td>
                <td>0</td>
                <td>0.00</td>
                <td>0</td>
                <td>0.00</td>
                <td>1</td>
                <td>0.00</td>
                <td>{total.totalCRate}</td>
                <td>0.00</td>
                <td>0</td>
                <td>{total.totalConversion}</td>
                <td>${total.totalRevenue}</td>
                <td>${total.totalPayout}</td>
                <td>${total.totalProfit}</td>
            </tr>
            </tfoot>
        </table>
        </div>
        {!offerReport && <p>not Founnd</p>}
        </div>
        </>
    )
}
export default GeneralReport;