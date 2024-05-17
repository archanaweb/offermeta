import React, { useState } from "react";

const ConversionData = ()=>{
    const [activeTab, setActiveTab] = useState()

    return(
        <>
        <div class="conversion-tab">
            <div class="tab-link">
                <button>Conversion</button>
                </div>
               <div class="tab-link">
                <a class="" href="/conversion/sentlogs">Sent logs</a>
                </div>
                </div>
        </>
    )
}
export default ConversionData;