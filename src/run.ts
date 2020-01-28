import { renderTemplate } from './handler';
import { template } from './types';
import { writeFileSync } from 'fs';
import * as moment from 'moment';
import path from 'path'

const myImage = path.join(__dirname,'./images/myimage.jpg')

myImage.replace("&#x2F","/")


const url = "https://picjumbo.com/wp-content/uploads/pienza-town-in-tuscany_free_stock_photos_picjumbo_DSC04564-2210x1473.jpg"
const newUrl = "www.react-pdf.org/test.jpg"
renderTemplate(template, { firstName: 'Andrea', lastName: 'Lunetta', age: 34, url, date: Date.now() }).then(res => {
    writeFileSync('example.pdf', res);
})