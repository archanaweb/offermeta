import React, { useEffect, useState } from "react";

const TrackingForm = ({affiliateidChecked, subidChecked, sourceidChecked, mobileidChecked, trackingFormdata})=> {

    const [formData, setFormData] = useState({});

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
        // Call the parent's function and pass data as an argument
        useEffect(()=>{
            trackingFormdata(formData);
        },[formData])

    return (
        <>
            <form className="trankingForm">
                {affiliateidChecked && <div className="row">
                    <div className="form-group col-lg-6">
                        <label>Affiliate Click ID</label>
                        <input className="form-control w-100" name="aff_click_id" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-group col-lg-6">
                        <label>Affiliate ID</label>
                        <input className="form-control w-100" name="aff_id" type="text" onChange={handleChange} />
                    </div>
                </div>}

                {subidChecked && <div className="row">
                    <div className="form-group col-lg-6">
                        <label>Sub ID 1</label>
                        <input className="form-control w-100" name="subid1" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-group col-lg-6">
                        <label>Sub ID 2</label>
                        <input className="form-control w-100" name="subid2" type="text" onChange={handleChange} />
                    </div>
                </div>}

                {sourceidChecked && <div className="row">
                    <div className="form-group col-lg-12">
                        <label>Source ID</label>
                        <input className="form-control w-100" name="sourceid" type="text" onChange={handleChange} />
                    </div>
                </div>}

                {mobileidChecked && <div className="row">
                    <div className="form-group col-lg-6">
                        <label>IDFA</label>
                        <input className="form-control w-100" name="idfa" type="text" onChange={handleChange} />
                    </div>
                    <div className="form-group col-lg-6">
                        <label>GAID</label>
                        <input className="form-control w-100" name="gaid" type="text" onChange={handleChange} />
                    </div>
                </div>}
            </form>
        </>
    )
}

export default TrackingForm