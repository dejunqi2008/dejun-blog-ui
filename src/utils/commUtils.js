import moment from "moment/moment";


const getBaseAPIUrl = () => {
    return !!process.env.REACT_APP_BASE_URL ? 
        process.env.REACT_APP_BASE_URL : 'http://localhost:8000/api';
}

export const baseAPIUrl = getBaseAPIUrl();

export const getFormatDate = (num) => moment(num).format('LL');

export const processHTMLCodeBlock = (htmlStr) => {

    const dom = document.createElement('div');
    dom.innerHTML = htmlStr;
    const nodelist = dom.querySelectorAll('p');
    nodelist.forEach(node => {
        const tagname = (!!node.children && !!node.children[0]) ? node.children[0].tagName : '';
        if (tagname === 'CODE') {
            node.appendChild(document.createElement('BR'))
            node.replaceWith(...node.childNodes);
        }
    })

    return dom.outerHTML;
}
