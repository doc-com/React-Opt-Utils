import React from 'react';
import UITemplate from "./UITemplate";
import {getJsonTemplate} from "../util/getJsonTemplate";

const OptToHtml = (props) => {
    return (
        <div className="col-12">
            <UITemplate template={getJsonTemplate('soap')} translate={() => {}}/>
        </div>
    )
};

export default OptToHtml