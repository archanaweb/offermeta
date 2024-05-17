import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../../Redux/CountryListSlice";
import { updateColor } from "../../Redux/UpdateSidebarSlice";
import BASE_URL from "../../Api/base";
import { toast } from "react-toastify";

const ThemeCoustmize = ({sidebarColorChange}) => {
    const [imageFile, setImageFile] = useState(null)
    const [loginImageFile, setLoginImageFile] = useState(null)
    const [country, setSelectedCountry] = useState("");
    const [selectedColor, setSelectedColor] = useState('#38c3f0');
    const [selectedHeadingColor, setSelectedHeadingColor] = useState('#000000');
    const [sidebarColor, setSidebarColor] = useState(localStorage.getItem('bgColorSidebar'));
    const countries = useSelector((state)=> state.country.list)
    const sidebarBg =  useSelector((state)=> state.sidebarbackground.bgColor)
    const dispatch = useDispatch()
    const loggedIn = JSON.parse(localStorage.getItem('userData'))

    useEffect(()=> {
        console.log('partnerData',loggedIn)
        dispatch(fetchCountryList())
        if(sidebarColor){
            contrastColorText(sidebarColor)
          }
    },[])

    const contrastColorText = (color)=> {
        // Type of color is hex eg-"#270c0c"
        // check that color is dark or not and add class to body accordingly
        // Convert hex to RGB
    const hexToRgb = (hex) => {
        // Remove the hash if it exists
        hex = hex.replace(/^#/, '');
        // Parse the RGB values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }
     // Calculate the perceived luminance of a color
     const calculateLuminance = (rgb) => {
        const { r, g, b } = rgb;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance;
    };
    // Check if the color is dark
    const isDarkColor = (color) => {
        const rgb = hexToRgb(color);
        const luminance = calculateLuminance(rgb);
        return luminance < 0.5; // You can adjust this threshold as needed
    };
     // Get the body element
     const body = document.body;

     // Add a class based on the color's darkness
     if (isDarkColor(color)) {
         body.classList.add('dark-background');
     } else {
         body.classList.remove('dark-background');
     }
    }
    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setSelectedColor(newColor);
        contrastColorText(newColor);
        localStorage.setItem('bgColorSidebar',event.target.value)
        setSidebarColor(localStorage.getItem('bgColorSidebar'));
        sidebarColorChange = event.target.value
      };
      const handleHeadingColorChange = (event) => {
        const newColor = event.target.value;
        setSelectedHeadingColor(newColor);
      };
      const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
      };

      const radioColors = {
        button_1 : "#009933",
        button_2 : "#99000f",
        button_3 : "#002699",
        button_4 : "#009973",
        button_5 : "#7f9900",
      }
      const inputStyle = {
        backgroundColor: selectedColor,
      };

      useEffect(()=> {
        console.log("sidebarbg>>", sidebarBg)
        dispatch(updateColor(selectedColor))
    },[selectedColor])
      const {button_1, button_2, button_3, button_4, button_5} = radioColors;

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("image",file)
        setImageFile(file);
      };
      const handleLoginImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Loginimage",file)
        setLoginImageFile(file);
      };
      const handleUpdateLogo = async()=>{
        const form = new FormData();
        form.append('partners_Id', loggedIn._id);
        form.append('headerImage', imageFile); 
            const uploadImageRes = await fetch(`${BASE_URL}subAdmin/uploadHeaderImage`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                },
                body: form
            })
            const res = await uploadImageRes.json()
            if(res.responceCode === 200){
                toast.success(res.responseMessage)
                const domainData = JSON.stringify(res.responsResult)
                localStorage.setItem('domainData', domainData)
            }
            console.log('uloadImgRes',res)
      }

      const handleUpdateLoginLogo = async()=>{
        const form = new FormData();
        form.append('partners_Id', loggedIn._id);
        form.append('loginPageImage', loginImageFile); 
            const uploadImageRes = await fetch(`${BASE_URL}subAdmin/LoginPageImage`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                },
                body: form
            })
            const res = await uploadImageRes.json()
            if(res.responceCode === 200){
                toast.success(res.responseMessage)
                const domainData = JSON.stringify(res.responsResult)
                localStorage.setItem('domainData', domainData)
            }
            console.log('uloadImgRes',res)
      }
    return (
        
        <>
            <div className='page_sec pt-3'>
                <div className="container">
                <div className='primary-shadow container pt-4 mb-4' style={{ background: '#fff'}}>
                    <h3>Preferences</h3>
                    <hr />
                    <form className="row px-4">
                        <div className="form-group row mb-4">
                        <label class="col-sm-3 col-form-label">Sidebar Color</label>
                        <div className="col-lg-9">
                            <div className="mb-4">
                                <span class="color-picker">
                                    <label for="colorPicker mb-0">
                                        <input type="color"
                                        id="colorPicker" 
                                        class="color-picker-input" 
                                        name="color" 
                                        value={sidebarColor} 
                                        onChange={handleColorChange}/>
                                        <span>{sidebarColor}</span>
                                    </label>
                                </span>
                            </div>
                            <div class="selectColorButton">
                            <label>
                                    <input
                                    type="radio"
                                    value={button_1}
                                    checked={selectedColor === button_1}
                                    onChange={handleColorChange}
                                    />
                                    <span className="selected-btn" style={{background: button_1}}></span>
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    value={button_2}
                                    checked={selectedColor === button_2}
                                    onChange={handleColorChange}
                                    />
                                    <span className="selected-btn" style={{background: button_2}}></span>
                                </label>

                                <label>
                                    <input
                                    type="radio"
                                    value={button_3}
                                    checked={selectedColor === button_3}
                                    onChange={handleColorChange}
                                    />
                                    <span className="selected-btn" style={{background: button_3}}></span>
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    value={button_4}
                                    checked={selectedColor === button_4}
                                    onChange={handleColorChange}
                                    />
                                    <span className="selected-btn" style={{background: button_4}}></span>
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    value={button_5}
                                    checked={selectedColor === button_5}
                                    onChange={handleColorChange}
                                    />
                                    <span className="selected-btn" style={{background: button_5}}></span>
                                </label>                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Background Color</label>
                            <div className="col-lg-9">
                                <div className="choose-theme mb-3 d-flex justify-content-start align-items-center gap-4">
                                    <label for="theme-light" className="theme-light">
                                        <input type="radio" name="theme-pref" value="light" id="theme-light" className="d-none"/>
                                        <span>Light</span>
                                    </label>
                                    <label for="theme-dark" className="theme-dark">
                                        <input type="radio" name="theme-pref" value="dark" id="theme-dark" className="d-none"/>
                                        <span>Dark</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Heading Color</label>
                            <div className="col-lg-9">
                            <span class="color-picker">
                                    <label for="colorPicker mb-0">
                                        <input type="color"
                                        id="colorPicker" 
                                        class="color-picker-input" 
                                        name="color" 
                                        value={selectedHeadingColor} 
                                        onChange={handleHeadingColorChange}/>
                                        <span>{selectedHeadingColor}</span>
                                    </label>
                                </span>

                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">2FA Sign-In</label>
                            <div className="col-lg-9">
                                <div className="form-group row mb-4">
                                    <label class="col-sm-3 col-form-label">Team Members</label>
                                    <div className="col-lg-9">
                                        <div class="check-box">
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label class="col-sm-3 col-form-label">Publisher</label>
                                    <div className="col-lg-9">
                                        <div class="check-box">
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label class="col-sm-3 col-form-label">Advertiser</label>
                                    <div className="col-lg-9">
                                        <div class="check-box">
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label class="col-sm-3 col-form-label">Max Days</label>
                                    <div className="col-lg-9">
                                            <input type="number"/>
                                    </div>
                                </div>
                                <div className="form-group row mb-4">
                                    <label class="col-sm-3 col-form-label">Max Failed Attempts</label>
                                    <div className="col-lg-9">
                                            <input type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-4">
                    <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </form>
                </div>
                <div className='primary-shadow container pt-4' style={{ background: '#fff'}}>
                    <h3>Panel Layout</h3>
                    <hr />
                    <form className="row">
                        <div className="card-body">
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Organization Name</label>
                            <div className="col-lg-9">
                            <input type="text" name="name" class="form-control" required="" placeholder="Organization Name" />
                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Country</label>
                            <div className="col-lg-6">
                            <select className="form-control"
                            value={country} onChange={handleCountryChange} name="country">
                                <option value="" hidden>Select a country</option>
                                {countries.map((country) => (
                                <option key={country.isoCode}>
                                    {country.name}
                                </option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Language</label>
                            <div className="col-lg-6">
                            <select className="form-control"
                            value={country} onChange={handleCountryChange} name="country">
                                <option value="" hidden>Select a Language</option>
                                {countries.map((country) => (
                                <option key={country.isoCode}>
                                    {country.name}
                                </option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Currency</label>
                            <div className="col-lg-6">
                            <select className="form-control"
                            value={country} onChange={handleCountryChange} name="country">
                                <option value="" hidden>Select a Currency</option>
                                {countries.map((country) => (
                                <option key={country.isoCode}>
                                    {country.name}
                                </option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">Timezone</label>
                            <div className="col-lg-6">
                            <select className="form-control"
                            value={country} onChange={handleCountryChange} name="country" disabled>
                                <option value="" hidden>Select a Currency</option>
                                {countries.map((country) => (
                                <option key={country.isoCode}>
                                    {country.name}
                                </option>
                                ))}
                            </select>
                            </div>
                            </div>
                            <div className="form-group row mb-4">
                            <label class="col-sm-3 col-form-label">IFrame Loading</label>
                            <div className="col-lg-6">
                            <select className="form-control"
                            onChange={handleCountryChange} name="country">
                                <option value="" >Deny</option>
                                <option value="" >Allow from same origin</option>
                                <option value="" >Allow</option>  
                            </select>
                            </div>
                            </div>
                            <hr />

                            <div className="form-group row mb-4 align-items-center">
                                <label class="col-sm-3 col-form-label">Upload Logo</label>
                                <div className="col-lg-6">
                                    <input type="file" className="form-control" onChange={handleImageChange}  id="image"
                                    name="image"
                                    accept="image/*"/>
                                </div>
                                <div className="col-lg-2">
                                    <button className="btn btn-primary btn-sm" type='button' onClick={handleUpdateLogo}>Upload</button>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Login Logo</label>
                                <div className="col-lg-6">
                                    <input type="file" className="form-control" onChange={handleLoginImageChange}  id="image"
                                    name="image"
                                    accept="image/*"/>
                                </div>
                                <div className="col-lg-2">
                                    <button className="btn btn-primary btn-sm" type='button' onClick={handleUpdateLoginLogo}>Upload</button>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Favicon Icon</label>
                                <div className="col-lg-6">
                                    <input type="file" className="form-control" />
                                </div>
                            </div>
                            <hr />
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Support Email (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder="Support email for affilliates/advertisers"/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Skype ID (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder="Skype Support ID for affilliates/advertisers"/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Telegram ID (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder="Telegram Support ID for affilliates/advertisers"/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Terms and Conditions URL(Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Privacy Policy URL(Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder=""/>
                                </div>
                            </div>
                            <hr />
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Publisher Registration URL (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Advertiser Registration URL (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder=""/>
                                </div>
                            </div>
                            <div className="form-group row mb-4">
                                <label class="col-sm-3 col-form-label">Advertiser Terms URL (Optional)</label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control w-100" placeholder=""/>
                                </div>
                            </div>
                        </div>
                        <div className="pb-4">
                    <button type="button" className="btn btn-primary">Save</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
         </>
    )
}

export default ThemeCoustmize;