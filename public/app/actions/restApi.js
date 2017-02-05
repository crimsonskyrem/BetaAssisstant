import axios from 'axios';
import {lean} from '../../../config/leanid';

const config = {
    baseURL:'https://api.leancloud.cn/1.1/classes',
    headers:{
        'X-LC-Id':lean.id,
        'X-LC-Key':lean.key,
        'Content-Type':'application/json'
    }
};

export const basic = () => {
    return axios.create(config);
};

export const getFromUsrId = (usrId) => {
    const newConfig = Object.assign({},config,{
        params:{
            where:`{"usrId":"${usrId}"}`
        }
    });
    return axios.create(newConfig);
};

