import { httpConfig } from './httpConfig';
const { authorizationToken, ipDeault, urlAddress } = httpConfig;

export const $http = {
    ipDeault: ipDeault,
    UrlEncode: (obj) => {
        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return '';
        }
        let params = [];
        for (let key in obj) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return params.join('&');
    },
    post: (type, Nothis, Objson) => {
        let formData = Object.assign({}, Objson.data);
        let url = $http.ipDeault;
        let httpUrlAddress; //完整地址
        let userData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : {};
        formData.code = Objson.code;
        formData.session = [{
            "hospID": userData.hospID || '',
            "hospDesc": userData.hospDesc || '',
            "admID": userData.admID || '',
            "openID": "31231" || '',
            "admDesc": userData.admDesc || '',
            "pubAccountID": "1"
        }]

        // if (type !== 'urlDeault') {
        //     type === 'urlADS' ? url = window.sessionStorage.productIP : url = window.sessionStorage.queryIP
        // }
        httpUrlAddress = url + urlAddress

        fetch('http://' + httpUrlAddress, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": authorizationToken,
                "Access-Control-Allow-Origin": ipDeault
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                Data = res.json()
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    },
}