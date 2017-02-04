import axios from 'axios';

const config = {
    baseURL:'https://api.leancloud.cn/1.1/classes',
    headers:{
        'X-LC-Id':'LyfJraLkUWELBXzlcWJnEgkR',
        'X-LC-Key':'XzJ6v4UjNBHT1pSUkWpRaozQ',
        'Content-Type':'application/json'
    }
};


export const getFromUsrId = (usrId) => {
    const newConfig = Object.assign({},config,{
        params:{
            where:`{"userId":"${usrId}"}`
        }
    });
    return axios.create(newConfig);
};
