/*import { AppRegistry } from 'react-native';
import App from './App';

const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();


AppRegistry.registerComponent('ReactDocViewerExample', () => App);*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
  TouchableHighlight
} from 'react-native';
import OpenFile from 'react-native-doc-viewer';
var RNFS = require('react-native-fs');
var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
export default class ReactDocViewerExample extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      animating: false,
      progress: "",
      donebuttonclicked: false,
    }
    this.eventEmitter = new NativeEventEmitter(NativeModules.RNReactNativeDocViewer);
    this.eventEmitter.addListener('DoneButtonEvent', (data) => {
      /*
      *Done Button Clicked
      * return true
      */
      console.log(data.close);
      this.setState({donebuttonclicked: data.close});
    })
    this.didPressToObjcButton = this.didPressToObjcButton.bind(this);
  }

  componentDidMount(){
    // download progress
    this.eventEmitter.addListener(
      'RNDownloaderProgress',
      (Event) => {
        console.log("Progress - Download "+Event.progress  + " %")
        this.setState({progress: Event.progress + " %"});
      } 
      
    );
  }

  componentWillUnmount (){
    this.eventEmitter.removeListener();
  }

  didPressToObjcButton() {
    // We'll sent event press button to ObjetiveC
    NativeModules.RNReactNativeDocViewer.showAlert('This is react-native');
  }
  

  /*
  * Handle WWW File Method
  * fileType Default == "" you can use it, to set the File Extension (pdf,doc,xls,ppt etc) when in the Url the File Extension is missing.
  */
  handlePress = () => {
    this.setState({animating: true});
    if(Platform.OS === 'ios'){
      OpenFile.openDoc([{
        url:"https://calibre-ebook.com/downloads/demos/demo.docx",
        fileNameOptional:"test filename",
        hideShareButton: "1",
      }], (error, url) => {
         if (error) {
          this.setState({animating: false});
         } else {
          this.setState({animating: false});
           console.log(url)
         }
       })
    }else{
      //Android
      this.setState({animating: true});
      OpenFile.openDoc([{
        url:"https://www.huf-haus.com/fileadmin/Bilder/Header/ART_3/Header_HUF_Haus_ART_3___1_.jpg", // Local "file://" + filepath
        fileName:"sample",
        cache:false,
        fileType:"jpg"
      }], (error, url) => {
         if (error) {
          this.setState({animating: false});
           console.error(error);
         } else {
          this.setState({animating: false});
           console.log(url)
         }
       })
    }
   
  }
  
  
  /*
  * Handle Local File Method
  * fileType Default == "" you can use it, to set the File Extension (pdf,doc,xls,ppt etc) when in the Url the File Extension is missing.
  */
  handlePressLocal = () => {
    this.setState({animating: true});
    if(Platform.OS === 'ios'){
        OpenFile.openDoc([{url:SavePath+"/react-native-logo.jpg",
        fileNameOptional:"test filename"
      }], (error, url) => {
         if (error) {
          this.setState({animating: false});
         } else {
          this.setState({animating: false});
           console.log(url)
         }
       })
    }else{
      OpenFile.openDoc([{url:SavePath+"/demo.jpg",
        fileName:"sample",
        cache:false,
        fileType:"jpg"
      }], (error, url) => {
         if (error) {
          this.setState({animating: false});
         } else {
          this.setState({animating: false});
           console.log(url)
         }
       })
     
    }
  }

    handlePressLocalXLS = () => {
      this.setState({animating: true});
      if(Platform.OS === 'ios'){
          OpenFile.openDoc([{url:SavePath+"/SampleXLSFile_19kb.xls",
          fileNameOptional:"Sample XLS 94-2003"
        }], (error, url) => {
           if (error) {
            this.setState({animating: false});
           } else {
            this.setState({animating: false});
             console.log(url)
           }
         })
      }else{
        OpenFile.openDoc([{url:SavePath+"/demo.jpg",
          fileName:"sample",
          cache:false,
          fileType:"jpg"
        }], (error, url) => {
           if (error) {
            this.setState({animating: false});
           } else {
            this.setState({animating: false});
             console.log(url)
           }
         })
       
      }
    }
  

  /*
  * Binary in URL
  * Binary String in Url
  * fileType Default == "" you can use it, to set the File Extension (pdf,doc,xls,ppt etc) when in the Url you dont have an File Extensions
  */
  handlePressBinaryinUrl = () => {
    this.setState({animating: true});
    if(Platform.OS === 'ios'){
      OpenFile.openDocBinaryinUrl([{
        url:"https://storage.googleapis.com/need-sure/example",
        fileName:"sample",
        fileType:"xml"
      }], (error, url) => {
          if (error) {
            console.error(error);
            this.setState({animating: false});
          } else {
            console.log(url)
            this.setState({animating: false});
          }
        })
    }else{
      OpenFile.openDocBinaryinUrl([{
        url:"https://storage.googleapis.com/need-sure/example",
        fileName:"sample",
        fileType:"xml",
        cache:true
      }], (error, url) => {
          if (error) {
            console.error(error);
            this.setState({animating: false});
          } else {
            console.log(url)
            this.setState({animating: false});
          }
        })
    }
  }
  /*
  * Base64String
  * put only the base64 String without data:application/octet-stream;base64
  * fileType Default == "" you can use it, to set the File Extension (pdf,doc,xls,ppt etc) when in the Url you dont have an File Extensions
  */
  handlePressb64 = () => {
    this.setState({animating: true});
    if(Platform.OS === 'ios'){
    OpenFile.openDocb64([{
      base64:"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",
      fileName:"sample.png",
      fileType:"png"
    }], (error, url) => {
        if (error) {
          console.error(error);
          this.setState({animating: false});
        } else {
          console.log(url)
          this.setState({animating: false});
        }
      })
    }else{
      OpenFile.openDocb64([{
        base64:"iVBORw0KGgoAAAANSUhEUgAAAj4AAABrCAYAAAB37ojBAAAKq2lDQ1BJQ0MgUHJvZmlsZQAASImVlgdUU2kWx7/30hstIdIJvXfp0mvo0sFGSCCEEkIgoNiRwREYUVREUBlRqQqOBZBRRCxYGAQs2AdkEFDWwYKoqOwDlrCze3b37D/n5v7Ozffuu+/L+875A0B+yBIIkmEpAFL4GcJgL1dGZFQ0AzcIIEABEoAIJFjsdIFLUJAfQLSQ/6qPD5DViO4azfb699//q6Q5celsAKAghGM56ewUhM8i0cYWCDMAQCEBNLIyBLNcijBNiAyI8IlZ5s5z+yzHzvO9uTWhwW4IjwKAJ7NYQi4ApA9InZHJ5iJ9yDSETfkcHh9hd4Qd2QksDsK5CBumpKTO8imEdWP/qQ/3Lz1jxT1ZLK6Y559lTnh3XrogmbXu/9yO/62UZNHCPdSRICcIvYORTEf2rCYp1VfM/NiAwAXmcebWz3GCyDtsgdnpbtELzGG5+y6wKCnMZYFZwsVreRnM0AUWpgaL+/OTA/zE/eOYYo5L9whZ4HieJ3OBsxNCIxY4kxcesMDpSSG+i2vcxHWhKFg8c7zQU/yMKemLs7FZi/fKSAj1XpwhUjwPJ87dQ1znh4nXCzJcxT0FyUGL8yd7ievpmSHiazOQF2yBE1k+QYt9gsT7A9yBB/BDPgwQBsyBNTADlgCZKiNu7ew7DdxSBeuEPG5CBsMFOTVxDCafbWzIMDc1swZg9gzO/8XvH86dLYiOX6yl9gBgXYtA9WKNFQNAC7IbshqLNa3jAEj+AcBFNlskzJyvoWe/MMi5lgQ0IA9UgAbQBUbIfFbAHjgjE/uAQBAKosBqwAYJIAUIQRbYALaCPFAAdoF9oAxUgKOgBpwEp0EzuAAug+vgNugB98ETMACGwWswAT6CaQiCcBAFokLykCqkBRlA5pAN5Ah5QH5QMBQFxUBciA+JoA3QNqgAKobKoCNQLfQLdB66DN2EeqFH0CA0Br2DvsAomAzTYGVYGzaBbWAX2BcOhVfBXDgNzoZz4Z1wKVwJn4Cb4Mvwbfg+PAC/hidRAEVC0VFqKCOUDcoNFYiKRsWjhKhNqHxUCaoS1YBqRXWi7qIGUOOoz2gsmopmoI3Q9mhvdBiajU5Db0IXosvQNegm9FX0XfQgegL9HUPBKGEMMHYYJiYSw8VkYfIwJZgqzDnMNcx9zDDmIxaLpWN1sNZYb2wUNhG7HluIPYRtxLZje7FD2EkcDiePM8A54AJxLFwGLg93AHcCdwnXhxvGfcKT8Kp4c7wnPhrPx+fgS/B1+DZ8H34EP02QImgR7AiBBA5hHaGIcIzQSrhDGCZME6WJOkQHYigxkbiVWEpsIF4jPiW+J5FI6iRb0nISj7SFVEo6RbpBGiR9JsuQ9clu5JVkEXknuZrcTn5Efk+hULQpzpRoSgZlJ6WWcoXynPJJgiphLMGU4EhsliiXaJLok3gjSZDUknSRXC2ZLVkieUbyjuS4FEFKW8pNiiW1Sapc6rxUv9SkNFXaTDpQOkW6ULpO+qb0qAxORlvGQ4YjkytzVOaKzBAVRdWgulHZ1G3UY9Rr1GEalqZDY9ISaQW0k7Ru2oSsjOxS2XDZtbLlshdlB+goujadSU+mF9FP0x/QvyxRXuKyJG7JjiUNS/qWTMkpyjnLxcnlyzXK3Zf7Is+Q95BPkt8t3yz/TAGtoK+wXCFL4bDCNYVxRZqivSJbMV/xtOJjJVhJXylYab3SUaUupUllFWUvZYHyAeUryuMqdBVnlUSVvSptKmOqVFVHVZ7qXtVLqq8YsgwXRjKjlHGVMaGmpOatJlI7otatNq2uox6mnqPeqP5Mg6hhoxGvsVejQ2NCU1XTX3ODZr3mYy2Clo1WgtZ+rU6tKW0d7Qjt7drN2qM6cjpMnWydep2nuhRdJ9003Urde3pYPRu9JL1Dej36sL6lfoJ+uf4dA9jAyoBncMig1xBjaGvIN6w07DciG7kYZRrVGw0a0439jHOMm43fmGiaRJvsNuk0+W5qaZpsesz0iZmMmY9Zjlmr2TtzfXO2ebn5PQuKhafFZosWi7dLDZbGLT289KEl1dLfcrtlh+U3K2sroVWD1Zi1pnWM9UHrfhuaTZBNoc0NW4ytq+1m2wu2n+2s7DLsTtv9aW9kn2RfZz+6TGdZ3LJjy4Yc1B1YDkccBhwZjjGOPzsOOKk5sZwqnV44azhznKucR1z0XBJdTri8cTV1Fbqec51ys3Pb6NbujnL3cs937/aQ8QjzKPN47qnuyfWs95zwsvRa79XujfH29d7t3c9UZrKZtcwJH2ufjT5Xfcm+Ib5lvi/89P2Efq3+sL+P/x7/pwFaAfyA5kAQyAzcE/gsSCcoLejX5djlQcvLl78MNgveENwZQg1ZE1IX8jHUNbQo9EmYbpgorCNcMnxleG34VIR7RHHEQKRJ5MbI21EKUbyolmhcdHh0VfTkCo8V+1YMr7RcmbfywSqdVWtX3VytsDp59cU1kmtYa87EYGIiYupivrICWZWsyVhm7MHYCbYbez/7NceZs5czFucQVxw3Eu8QXxw/ynXg7uGOJTgllCSM89x4Zby3id6JFYlTSYFJ1UkzyRHJjSn4lJiU83wZfhL/aqpK6trUXoGBIE8wkGaXti9tQugrrEqH0lelt2TQELPTJdIV/SAazHTMLM/8lBWedWat9Fr+2q51+ut2rBvJ9sw+vh69nr2+Y4Pahq0bBje6bDyyCdoUu6ljs8bm3M3DW7y21Gwlbk3a+luOaU5xzodtEdtac5Vzt+QO/eD1Q32eRJ4wr3+7/faKH9E/8n7s3mGx48CO7/mc/FsFpgUlBV8L2YW3fjL7qfSnmZ3xO7uLrIoO78Lu4u96sNtpd02xdHF28dAe/z1Nexl78/d+2Ldm382SpSUV+4n7RfsHSv1KWw5oHth14GtZQtn9ctfyxoNKB3ccnDrEOdR32PlwQ4VyRUHFl595Pz884nWkqVK7suQo9mjm0ZfHwo91Hrc5XlulUFVQ9a2aXz1QE1xztda6trZOqa6oHq4X1Y+dWHmi56T7yZYGo4YjjfTGglPglOjUq19ifnlw2vd0xxmbMw1ntc4ePEc9l98ENa1rmmhOaB5oiWrpPe9zvqPVvvXcr8a/Vl9Qu1B+UfZiURuxLbdt5lL2pcl2Qfv4Ze7loY41HU+uRF65d3X51e5rvtduXPe8fqXTpfPSDYcbF27a3Tx/y+ZW822r201dll3nfrP87Vy3VXfTHes7LT22Pa29y3rb+pz6Lt91v3v9HvPe7fsB93sfhD142L+yf+Ah5+Hoo+RHbx9nPp5+suUp5mn+M6lnJc+Vnlf+rvd744DVwMVB98GuFyEvngyxh17/kf7H1+Hcl5SXJSOqI7Wj5qMXxjzHel6teDX8WvB6ejzvb9J/O/hG983ZP53/7JqInBh+K3w7867wvfz76g9LP3RMBk0+/5jycXoq/5P8p5rPNp87v0R8GZnO+or7WvpN71vrd9/vT2dSZmYELCFrzgqgkIDj4wF4Vw0AJQoAKuIriBLzHnlO0LyvnyPwn3jeR8/JCoBaZwBmrZo/kg8hWRvJkkgEIRHqDGALC3H8Q+nxFubzvUjNiDUpmZl5j3hDnB4A3/pnZqabZ2a+VSHDPgag/eO8N5+VFOL/e+JMw0ND7g5bg3/V3wFT+wWAtrxRzQAAAZ1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTc0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEwNzwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoROXGMAABAAElEQVR4Ae29AXAc13km+EMEREJewCF1ZFySc1RCOyu6rOGtGJ+oVOTs0KkteXfjYSVxdssaucxKDPq8FxusulgLVyRvQXd2gfadBcblAlXlBcsWtKtATgmsdeB1DMkLxndgecHEgz2BZQ9Xo/IO1x7FoD1z5kAaUO/+/71+3T3d/f7uacwMMcBrCeye/t//v/9973+vX3e/fl/fc889JwC3P/zDP6Rd7LaxXoNaHWBw7xDsCaTmZIGkzs8aPH96GD74VA5mFp6A+++6AxowAO+891DIdpT+eu06NAaGYGhPf0i8jn7W0c8h9DMk3ViH67UGDA4Owp4I3ZCxBCc4XxKot5ykVqsByLKHVddR1hgYjMQlnLrDZ7Aertc3MF72JqpT5c0GrK9vQKPRgKGhodYclPkZ6r01S05qxheMoxoGGZYO9g4FWwOfWdr4pDirD+yF/tI5GD78OlTFJ6BFhHjHAlLOz9bbe8C47+e1Fz8Nd79vEMricbjLd95/GJnf+mU4PjgOX6i/AO9qXKeOCZI06ST5wcZVOD3wDri3UIVT94VRrl3H/Ib2wlCgg4n00ykIh2eUrFf89NdTmmOu/4zCxc2jnX15glhifXGdCh/w/bX5Oha2ZM+0A4E+gVs7DG3GxtVLz8NX/u1fw49u/ATK5XfB5F99Fu5r7TqymeytrkWg5xCoXX4Sho/uhjXxKdjbc9630eHaJegbPgaLVQEPhccm6TJaX4FTgxl4WmqPQbHxWTgUGNykM9xmrV7xs83F7pi5TsRSx5y1hjeDwJYY+GymAFbXIrATEdioXYNiZQDuPbR/JxbfV+Z1ePXqT2DfoYNtfPJFNsv4JK8fDhxEu1tx0CMR6BU/fdW1pQ87EUtbusA71jk78NmxVW8LbhGwCFgELAIWgZ2HwG07r8i2xBYBi4BFwCJgEbAI7FQEWh/40OTR6zXAuad228II0MTLWm19C3u4TVzrlfbA+cnJtkk1tb0YWwmzreRL24HeegaNfSvWw2uvXcdXpHbb6gg0DXxqK+egr+8ErDjXy9rKWeg7chbw+yHcNuDS+dPQNzgM+/YNw+BAH5x+/qoqH06ye7SvD3V9f6iH3zxAbeV80/njp87BVWVQ6fb6v6Gyn4BnL11zcLkMJ/yY4PGRM5ekTGGt8ToOZy6sJGowG9evwPknPw1nzr8o8Q3BV7sCZ070wfC+fTA8PAh9p54FWZ2Mn3y9h3JwT5h9qcH5R7Fsx8/Ca6q0+PsIxsEpFVshXzCtjJcYPTfn7hx88zT69eRFL7ONKzLOz16myGbaA06SPB6od2obZy93JvD5Nsb4yZXBK3XgqAZnj+i4bd4fP3eJkf1neP4Upj99wYvzmmofZy6qKAlktEV/mvDkcFlxy3L53KPYDo7AhVf15TGZnmug6aDdvnD99Wb8bHI64Y+Y/PALrOi+NaYPMfY9Cdwy9a2oeu0iXivx2njgwD4Y6DsNsovAK6e5H+Rkni+heEH/T1HfcvwMOFcZvMbSdftR2bemva54Oe6QI/qqS2/VwhR+4ZUVS1V1plqYxN+TQv4sz9PXX2JqsSTq9aooLs2IydlVlbC+LHIoG51dFuVSSRSLRVEsVUQDpcrGmCiUK6K0PCfymA5G5qRM59vTe7fsBVEpr4qZsQzilBeFOpWqLsrlsijMjeG5MbGM2JQrUuDislopi6WZcYntyGwxBoq6mM6ByE1Mi8k87qcKgfR1MYNyyIyLwlpdVCsFMT05J9akK7qOwn6y9R7IwfvJ+VIV01n0A+t6toQa1UV5TLgsUzC5mAXjJUbPy7wrR5UFVW9lJ7e6bB85Vbdce8B6L1EbwL9ypSRmRgiLEVFw2lW7nWfbGOcnJ2OcrJSofXtxXcBjKm+52hCcTDj5Ta+qNrA4jrhkp1T/wuS3pUQMZmzZZSEqYiKj2kV+2uk78Xy8ngGBDvjCxVJqPw3ux53m8zP1rTF9iLHvifMmvm8dmS6IRqMkJqjvG51Hg5wvnEz7EhEv1WV1DcW+dXyhIhP6+29df61dV3R+O2cP/qJqAOXFCQUKRDXwqS5PYOc9JvRFwK9HF7IsVsSUuto3iaSNzCReCtRWnM6hnQl1MW5K2aM/nLJP6qtafUlkEIsZp3OnUtX9A0inmH5s6VRhCnFBnOQgxUkT3q2JCbQ9j2DWF0YFjC+rJDgQXcOLTqM8JwcYc2UacgY2xk+u3gNWfD85X66LKRyAZbADyGNnUJxDX9FvgJw78ImOlyqv58u9K4dVVZezJYXn8mRWQH5WxjLbHnzONUqqTiaX+Zr1qbR8yLUxzk9OlsSJqLjWeiaZxDA7IyqVBRkTGlutt9X3STAzlb1RmsUy58XsDA2ow32gSc+ESSd84WJJ+9Gqn1ov7Z7LLyyL6UOYaxXnH9e3qr7cuSFCI8qnvFjFftncD3Iy5UlkvKD/9JABaACNN7g09FE3ZFnZt6a7rnAl356ypldd3EOuoV99ELLwObj7yKP4muV5uHRFP2hTWnfj7mOZQThy5Aj+4SsdfMXiPtgv/Bh+eO01ePXKRXj2q3NYX7+xrdYeGcay//xnVNoaXP7Lfw8FjMpDv+wtRNRQELH/vvM33w9QeAFecUGLSr4XPjA3Do89cAQeeN+LMPYr/w2ePXMajuAj1i99twz1H5dQKQdvN3x/G+dnVI7mc5wvGBuvADzyqVm444t5+L3HX4GpWRyyQdU1Z4yXGD3XQDcOht4Fp3GENve9VzG3GvzNV16C0UfeIxdijGsPyr1r8Ll7cpCZWIRP3N/h1XYMbYzzk5MlgZeLa5Ps/o9/GUZeegRfCbwPsuOL8AcHt+y34pEQJMHMVPbVbz6DzTMH//x3MSbgMbh0Tb/uUlmZ9CIdwZMd88UQS9qPVv3Uemn3XH6Rspg+5G50xHitMjjJ9a0bN3AyQeY43ON0+bjuKm5l+DntOV84Gaqa4oV60amnl2Cs8ARMXapB/wCeMGzJrisG5W18OvHAB/Y+BN9aK8L8Y78F/33hy3Ds8N1w/MkX3ff1dL3GV10wP38BLlwowoXPvN9ZV2M3Sj4H+fzvwD2H3wtPvDQCFx4/vq0gpXXTnnjv3fiedRiOPvJ9mJz/S3gg5XUusiH70LrnoQ/B448cw8EVwMtffRwe+SbAk4U1ePzhg7iSM2HtDS58avKwnX6SQbMvvwKvo/yt9/wm/LNMAX09AQ+/+4D0Qf9jipc4Pa3fnf0QPPTHeXjmmb/FlaRfhq8UMvC7DyDOtMW0B0py6WwenoBxmP/UQ/SzgxvTxjg/OVmnvO2/Fz6zMIbW8zD5p53GpQOFSI3ZdZj/2Bzk//DdsGfo1+ARdG3mOzSg3sTWEV+YWNqEq91UjetDTH0P6yPTt9Z/8TNUJdzUttFQk2RpPML5wskAZ3Cy8fLWI3B6fgSeGJmGVxte3tqH4D7uuhJMv91/Rwx88LmAM4IcCIwk+/cegoc/dAq++LUXobo8CS898RwUnZsWutz+6j98J9x110E4ePAQHLxLX/mxejOTcOnF74NoFGEM10P95PmVbYUrNaSJpTV6bYh/L8InHj7UVL4AjE0y/WOtfAUPs/Ar7Oqz6/CtL30Jrt17Cqr1C/CbcCeMf/gIvJTZB2cuvQYDsnH+FH7WfCOps5BP4Mx+muvdNdB0wPny9zLlz28MwQf+ryKsfjsPvyy7AM+AOV7w6Rmj51noztGhf/xBfOTz1/Ctb30LCpk/gvfosMbsufawfuU8HPvkSzBXGjNSMLSvBHwb4/zkZO3zr9nSvv1vwz7hPe4dcrN06/9Khdm1SzCDRXvmkcN4g3QAn/fg8V9823sqnrLY7feFj6WUbnZMzdS3cn0I1/eYHOX61iGK58JlqDj97uBbm2/yOF+Msph4ef1GA/Y//GkYLXwS/s2/W0C36Xl+eEt2XQnrbfczTQOfwTvoqjsHhZfpK4t1+L8vvIAdlBpNrr/6Ipy/cBmuy+/Y1+GHhe9hmjth2HlSTbD/uFwB4ly5jp9S0yfv7vW3AIC0WXilOAR/ujQBcyc/CR36wIVy6fpGDWlPZAvcwE/Ka/CT136OKX4Oa3hcq7mo4Ll1WFvH1UIvPw/59z8FuakTMRfJPfCBx78In/jA/fg07cfwzZfeCR/+yEfgFM54nvlPP4I99+ZgEp+wvO9fPwuvUTbrr+GA87L6qgt/mvzk6h3VDBvnS9nRQSf2H4J79/cj75Y6pe882HihyDHoGZzp3Om7HoSJzNP4huIJyD/2T9zVgdn2gBxPY4dPQhZfcWV/ue60B1xewF/17fbY0MY4PzlZu93z25MxgP724pYWs6vfmcEnnxOAczLkDVK9iMOguS/D9zbxQVvHfDHE0taqr7i+1dyH8H1PdCm5vnXo7f8IX10+DV9fpOkfNfgP507iK80/hne5N7FmX+jr0Ki+Lj5eqDM5CH86PwbPfA5foTZtrV5XmpR3xo/mqUsNsTStJ6Kqyahzq+pTlHpxTk5gRlSE+suK6SU1qxxnV7kzzT25msiqJ8t5H7RUxCROzMqGvkhq9qRnfmHZabLZlJ7c7HdcT0RzMcNyT6gJyWpCscYyI8bxizg9AdxvwnzcEMu6rjL41ZwGeK0gxpwvqmRd5KbVVzOcn/iNnanezfn7JUFfcOIe1vGkniWPSeur0xg3GBNUSGO8xOj5s+zi8fJUHn3PiDlnkjNlzbWH5rrVdQxiokMTnLk2xvnJyZLAG87X00or8yxszaMkmIXLrr7gaf4KsyzGsV8YnS+5BQ3ruaLIg074EvYh3F+H00S617aTkfkZ+9aYPsTY9yRw19S3ompxnj7+0W19RCyvyW+amX6Q85OJl7lvyuuN97FESYzTRGf6Yhb71ua+J811JQEO2yBJNGWFZJ1GomNknA5OPUzLTotBYbcuIkBPmgaQob0l9nmm3rvoek9l1SvtgfOTk/VUZXTR2a2E2VbypYtVcMuyMvWtG7iAYQ1fbQztHQpdN2+ZszbjSASiBz6RSe1Ji4BFwCJgEbAIWAQsAr2NQNMcn94uivXeImARsAhYBCwCFgGLAI+AHfjw+FipRcAiYBGwCFgELALbCAE78NlGlWmLYhGwCFgELAIWAYsAj4Ad+PD49KaUJinj5Gb64LGlLa0el0lam2n1OF+6LFvHOqBlHbq10eRKWkpCLZ/WSq4bUq8ml6poQQ/rKF1+LeSxVZNuc0b0bscuW81p+wJOj5OxzkQJa7ByeQWusx3uBly7sgLXOrqmBfmWxJetUIYNeHXlMlzlQYtytC3nujTwWYcXzz4JF7YVLfvm8a9duwznTp/ABc364NxKey6Q11eehSP4Ndfw8DAMnDgDLgl0jLtp9TizaW2m1eN8SSK7eJbq4oS3xpRmQvYxrfsZ1k31t3HtRcniPoh1sG/fMPSdeBKutKF6TflJpvhzp2AAqUv27dsHg1iGC1e94Y9ZDzWvXUS25wGpNzw4kJBBfgMunj0FfRhnXn5tKGCSSrrlaUyM6LfIsdolOO6Lz/Ob7EfY2I1pD51AIG1fwOlxsqRluHL+UWzX59VNRu1lyBzNwH+Ri9WZLNTgK4cz8Pm/S9dOmvIzZUHnE/kSYSCRXjvLUIfnMkfh2R+kwyOiBK2d6s4n+XUxiWscTMhFXLqT45bPxSHAhPxIYF2GzXheEqOIc25ySdSran2hLB7Hb2n1OMtpbabV43yJl6l1hmg9DIdIlVQkoWFGzBZKolwqIdt6SSDpvdqY+qsWZsTI+IxYLa+JanlJjGCdZCYdQllHveUdk58mCZ5YoDVh1sTsKJYjP6PWheL0kOKQSG9hZFqUqnVRWV0Wy2VdQM7DqpgZGxPzxYpoVEtiEteNykwkiTPOZo/IGEb0W1OCuihhXJYKs5Ic2VvfJZ03bOxy7SFddjFaafsCTo+Txbijxc6aaC7WEpesKERwQ2sV2q+VS6KSpHn5leg4mF9Q7v/t+LIc44tfRR53vQxqHaNOrW0WKl/gBK0i2rwhyKPZvBif0AsZYsfvMI2Xl6a9RQxzE8JZ21Dqm2TUkDLUudJfJiuyuNjSCDJ27/itsSYKBeK6b4hpxKQdAVBfnUGckaUXg74hFwxEzLNTagFDBvC0eoxJXLBw6/jC+alkJTGG8Tm5MIcLcWbFkl4M0ukMFspVUa3qk461FuqvQKzuOWcgEu9MdAouPzm4yYglp1NdncL8YBKHQLgxevWiWlSyUG2I+lpF4C7FVhezeRr4bHJglyLnW6ESx4je1A9iLM0W01zpUpQsdHGsi/nxnOp3qe/NjYuCDAi0XV/FRU5zYmyMFuakvjmPg9hAfDsuNMUu1x5SuBynEt+H1MXcWE5ksriAqw9mTo+Txfmj5asziGvGaV90EnGhRWxzeY33iFgse42pin1hFq99udwIXkt9OCesh1B+mKUxzhxfRkbj61aXR+67XoaqXMh4wlnkdmlqBK9VE0KtEcvELjnLjFGaysT8iBj4OLT3dBe4VsU7iUV1F7i2KAcwEwtF0ahXxMwINpj8LF62ceNkjTpeNIpyldJx1K1X18Rauh6WKUYvi3QA6F4pfVmQPw07sTFRrqu7mtFxDCbs1PydQpT1tHpRtvS5tDbT6ul80+yXaWAyMo+qBRzY+wY+OKBAcnbn4kD7UbFU8To0lVdM/WHnlkcbI3PeCr1pfPR0ovLDjmJMXcAmJsakv1OhVaLDes2rvKpyTi87q7F7GTJH+HSJ+gHExV05nEm9LUTY18mYyOTFxPSsWFqlmxe9IcZY13o15kpxWRQSPUHT+pvYy0EJrZau+5G6KCwuiTI+ycMrhYoP7K/l+MC5yCGliqjjwFjW4XjEE7tg7CZqD5soQ0A1vi9QMU2rqrs3K2iD0+NkgeyjfzZUe0bOQ0/u4rmA+FbFIvUn/oERXQPX1DWw6QbX1WPqISo/zMMYZ9rmJGPT89w70noTXSyDXN2/JBbG6UbNxz6AKBpjlzx2fJVPqv1jFK80sUeRA59sIJDIihswjsn66pTs8Kg752QquX6s5RvtOnbsLnxBSouJWtp9XExTIGFHVi3SHb3vQm4wnFbPYE6eTmszrR7nCyerF2cRI4dKo7EsBz7eG1l8/VNxOrhGWUzjk43wkxuu/spigpaTH5mNferG+dgsi8ivXhQT9LppZFLMzk7JgVZ+akndlLjKYT098Jl2HgUUZ2mgPJnYV9Xu88J5IOzmtN0PGngRm5+ZEqN56rCRhmZ8wcEaqQZyWN/uoKiVQeQmUXMuBt7AR4jS0iz6mBPZXE7kiMZGP/3FtNTHLzihXVnAwXJ2OlDvUbGbpD1sshw+9SR9QbVSFuVyRQ3oHF1Oj5P5sjYeFmfpScqEepqqU0k8Qcw71d0oUZ8S7Hf1NbB5wBRXD5H5YU0Z4yxR3WrHfftbVQZ5Y+nFovbIGLuUwCmjf7Cr9ZLuDZOb7zRMFBrUxO2O/AZsuDPZORlIbu5oIk9DVjvotKKBDZKDpAEALRWegJNPHIPy4w/A4A2iJX0Yft0ly0NCVPyyYOXK1QArdJxer/ti9v/lrz+Jwjk4+cARnKx7FF7C/44OPupMcN4D+/fvVcr9d8Gx38J7/bm/V4S7PpPR9fcqnDlyNzx2bBaq5/7AJTf1qaU+DOZXe/nr8NhLozB/7hPwB39wCqZXp+CZj30Jit78ZplXUE85kIOjh1UZD777QTz1Avww4XzDgTuG8Rr//p5lWU9bAWZG9CH4yAtVKHzpEXh79btw7PABOPXslbTZtKinWJJ3D6h+ZP3qebjn2JPwnv/1/4Svf+1r8MSH8bnjT5F53d3uhLc4Xc4eYhd/qer7CtQUu8nag5vFpg/i+6XBoX0wtG8I9jTlxelxsiYjET+uwpkPPgPjiyfB6RV8aTIunjBwu+983CFXD6b84uKMs8n5080y4JgAL0+5iVmYHkFi7ZPn4LrjWnzsUkLTGIUrnyczDHy8BPpo8G2/jodPwDdWyD1ibv8yDmofhLux8XAypT8Ad+FEnxdeehk1N3yDJW19Z+438HPnWm0NedsBflap4DGhk34bOvzbgN0bzmv9MLK8X4evPP5JfIL4G14jrX0fTuKXBZnDvwcv+y5usXopXIq12UVfOPcz/8t3oILYf/vbuC/OI8tyBuaKZyGDg8WN167ApZVrsI6j+/XrV+Fbz72EeL7bxdNYf+vYYR25Bx67cxJKX/jngN98w3Ws281upvwG7jiApp+C/yy/mtyAwtLf4O//AQadq4FJb+idvwk5HPS99P8QqzSOmZcW8N8T8KvuQFmeNv5Tu/EP4I/ef8go344CnhF9Ha6uVOCehx6GD33i8zCHs9qf/m/UujuzXblwDp6/9KrsM66XVrAmM/A/3aMqr/HzCmb6z+AfP3AI9g7W4HsvPIPXCjX0NXkjx0FM7Ma1B5PdtOdj+xC8ffvKP8UvWAf/KVxK2J/F2zR7++qFM8jBPg4fe2h/KNEwFODpuRV5fvU7s7jPwq/pdiSfDqzLm//XG9TD8728rAdMZc6v9TjTNqWDhn+6WwYc+PwU4Pj7T8BHzhVhdO5j8PtnLknP0sSuoUjm06FHQ/IxEk6QjXgrtTqr5g+gNXyUl2+awMXJKI+Kb2J0brNfuISc7s0Ty5N6MhzhSX/OK5dNFKeyRK8gHXvI2u6fS+exoiOTb6B+Wb2U/rA2cYIaDtJkHHXDl0RF0LHvTJSsF+hVoa4b3OOEfneCKBo01V912VcHWl+/ZkjkSHQiU370JdecfyIrvsaYWvTmnpj1cJLkIs0L02XEybirvkfx0W64ZwvOJOpAKLny7XjAM6I7ryBcPGmSqxNMHQCjND/uqzsQeZzX4c5Aa6jXn7puc/kMxq/zoYMT5/pVgXr9o2Rc7Ma1hw4UEa8bvrYU7M/olQ+9fsZrUSt9CG/TVAo1b3JswWtXbkq3L9PtiD4I0q0iGBMqzRRNimPqAV9Uyi90I/PTr7qi4oy16XocPrgFZZjyfdTTKM3JWJ5YxPeFXOyS57qf1hCHSxN7pmWSUs1AO4gMtM2PF3Ec67DTRsmwAdqtWwjQ4mppWILT6nHlSmszrR7nSxoZLXRWr+M92iDsHQpGfBqDndOh9ldvAAwMhdsmm6vEGku4d2+oTbN6O1jIMaJzsvZDtoFPimkBmUEYGgrf19NCphgQ0LbQvRXtIW1fwOlxsohKuvbip+Hu9w1CWTyOT9PNWw2f7iI9O0RUhVkpQpIkv07FWTfLEFF091TbY9e1DNDywMenaw8tAhYBi4BFwCJgEbAI9BQCief49FSprLMWAYuARcAiYBGwCFgEIhCwA58IUOwpi4BFwCJgEbAIWAS2JwJ24LM969WWyiJgEbAIWAQsAhaBCATswCcClLaf4piAOVnbHeENpmVkTqvHe9N+Ke+nmaGc12u/n/S5K7Get8yWzriyUcNP6tEm/yEtYyBCxLPBM2VIG/Oot2XY4Gly7PUaLnXgBwYZpy9fhIsXL8Kly1fbirU/l24cdz/mzaVKG7tbqQzm0qWRJGFg7wQbvGJUf7XjDPNpMGlNp0sDn+3Nzs6xX3NMwJystWr0UnO+eKmaj1hG5uakTb+S6oVYz5ushH+kKQNZMenF+WliKI/T056HysewWNcun0UG+L7mv+Pe4l0mX3RecfuQL3j5vUjM7cP7JJP6wPEzoInb43zReUXZvMSwwXNlSBfzW4kNnmNn34Dvf+MZ+Mx73wvHjn4jsEioRrPN+23Azm5qt3QDYIpdDsW4dmvOj7PaLEvMlt6slvpXU35dZ1LXbtfgq8io/lRKhnltZUvsYz94b0uCbczOzrJfq7UYotnSOVlK0FlfzDZZRmazmkiiF8l6ztgUKcvA6fF+mhnKeT1ViMjyyXUmcC2PKFZ35LkrFouS6b1cLkgOO4/Z3OwLB5mWRfnSkJQcIKaWcH0M5HCT1BaaSZ31Ja58SKwbxQbPMr6njfktxAafgJ29Iel8klN/6PpLt+9xdnamvbOxy4DFtlsmP8ZkswjXvMnhGjp+epDmBG3+FczPWcfmVrDBV8tlsda5panaDJzZXARXl2VnN8MVIeHYrxmG8nawBIe8YXwJpWVONDEyM+mCorCegfU8qOj/nbYMLej5/WyFodyvp1w2lM/pmCJZ3f1ldch9ZxUlsWjFF78ZzhfFp+VdhEtzyMflJ1DUhgK+cDbVIDOaDZ4rQ3ti/taywcexsxNuQcw1xB3dBy+OyF7VE+zsTLsN4hiO3Wh29iDOTe2WyS+oZ/odYktHMtfRLBL16oVPsd/PIT+fHh8YmdQpA6y30WxejE+MOotR0uKHWlN5EM6v+2zwqzPoHzLMZ9FXb3FGWQBjnNECm1kfDkRmns+MOITGTHyqYnf034iBj2VnT4d4BAkkw5auGnXrTOrJfAv7kkwPUwUZmZMqRugZWc8T2Uxbhhi9gJ+aqBMfv7qr4EYylAf0qAjG8uFdZTyrO3LBT+HK3b4VnRP7EoGfyRcVZ6O4DqzaVqdptfAJfC7TvAV9IanJJgaJkQ2eK8PmY95hEr+VbPAsO7vCVK6E3ALZa3NNpPwlB9v+pxAMwzWmpScWW4udPdxu42NX6QTZ2ZsQjGi3Ti2JSd/KwU063I8otnTEE6luXIZ45fekQ2SKPiLWo/OqBVaKy6LgX83bqQsj07ghP1V/3WJSx8WU61VRreITYyxLE8M89gVGJvXKguxTNXmr7HtcMlxGj8O/TbLIgY9lZ0+DbkTDLSAdQCaaLX2zLMG8h2Ff+PRaGsXIrGXcPqzHs55ztrQsbRk4vbCf+kLNM5SH9fjyJWGxLoaWpE/mi8bH27O+NNRTKcA70olxYl+nAd6YcB4yOUbCvrA2GTZ4rgybjXl1Qbn1bPBmdnYFpyqn95TNq6kOHjkXUP/rFyPDNaaNYwVHMhMxgQMDwDt2jxkgSVynLWNEu00Qu1Hs7J4HUWXQ0oj8tIjZR7KlSzw9NvY69fvuwJdhUqd8nLrQ9CHBrM35dZMNXnsVwTCPImOc4aBoNocD7KlVTFURY9j3jBElhbOZ9XSK8L4wrfsw70aV+rSpIGdJWLXpjGHg41WiTq06nXH3TrEu32OPiCKSw3Aypa+CbJL4SbbtpoPCK6O+CNCFhhheGrJBTMg7AU62eYjCviibOB9gtSAKq0VfZ6Zzw9F8qKPTMm4frbc8gdxAGJCZjNqrC66fU4fzhfIzlYHzhdOL9lPVQ07o9+WNVeLn8nPVRevFl8/zc9XhtPKzYK0tEs8SXsRdciUscYF4iThfPJv+o1hf8PH+0sKcmFssiNUFzBdfdXlRikxfEb5wNtXrnlEZ0+SHmtOiBiRcGTYb8zSHKZOfcV8h+DG4Vceq7xsJ1CNd+Ly+siu+Oa+6JAcUZqheOWbEzFJRrFWrYnk679V74EKtn1B58Rkd88FyRMV1ME3y34b2HhO7jXpdVPEvvMWVwZBf2JDvTFEg76wY9128pdDBc9lxozRHr4X8bayKT0Xmxcykep01MkMDAWcL1IU+rfZcfhmx6FRYo0w8V8Frti6fV6ua40oPssL1bsjPdSo8WGTjDPXWlqifmxCrctqH19/F6blZBg4a1Yoo4zyj4F+r844SD3wazqQ+dWdcFwt0YcPHVlTXnEz5rd7LZyeXMH1DNHydfaBcPfmzgR2LfAyIA4exeRxUVKmUuDmPKfMy0NfEFI5+YWxBlZGTbQIFoy9k030F4z2WlVnRHTwNerKTooS+V9fWsLOM6kwCjjF6jeqaQNZz/MN9cV4+Cp4rrnkkiiZfMAu2DAEX/D+Neoyf9I5dTlR0SD3lBQLv1mR3wehx5WtUVsVSoSzqGOj1taKYzPrqXTqs7gK9Sc1OKThf/AUNHHO+IJqiXCypwUJ1Vd51ZacKPgvRvnA29STquSINnxrqooqvn+TDfK4Mm4z5yvKsmJyhPuTWbfXSgpieW8YJntTC607Z1Y2N65UzgXYGCV/pwtypbXVuSswulWSbWpMXFq9dN81FapRV36NfqwYutvoCKAfDXMzHxnW6khrbbYLYnaK2FbzoM2UgD8358f7LOUZRA1ok1Rx1B0RrYmaE+lKHEBZjpFjQN5oNMUcy/XEBZReoC78HxvxQh/qs/LRqx4UZHNT6/ZIX2Ip8lTdOHzXICAnn1VTvKDbm5zoVHviwcUZ6DjZ045v1lTtWz82zMwfGgU/UkyOOgZ2TkevbmZ2dY7/mmIA5Wdrq5nwxsbNzjMycH4n1nMat74ikTbxAmtjZ2TIwDpn04vw0MZTH6bmuBMoXx2Kt7tBAzDW/b5LmTL64ecUdBHyRT87kxYEuEPgEbmzWmXugDHG+uFmFbPJs8FwZNhPzW4ENnmdn14jVxeKUfiSfc+d+aGm79tuFnd3UbuNil+RR7Oxx7dacH1cz6ovEaLb0hlicpMGHamP5fFZAbtp5quq86nJkACNiMTDHJ9v0hFn7wOTn9p0qP5rj5E04Duan0myODV77FPEUKY5JHVUV3pnm/i6Bns61E/uWSUo5BnZOhkGxczeOCZiT7VzEul9yWQ9tZCinRfrSsrq32xdcD2UdGbzrMNBWhnmWDZ4rwzaI+U4xY7ce+Nudnb0zsdsqzonY0nGR0MbAEAzt6Q+ZbzVekuRHmXSVSX3jKpweeAfcW6jCqfuGmsqYlkk9rV5T5il+tDzwSZGHVbEIWAQsAhYBi4BFoBcRoAVZBzPwtPR9DIqNz8Kh8Niup0pmBz49VV3WWYuARcAiYBGwCHQTgXV49WoZnxv3w4GDB2Goxwc9hJwd+HQzfmxeFgGLgEXAImARsAjcUgS6xNV1S8toM7cIWAQsAhYBi4BFwCIgEbADnzYFQlomYJ7hOqVzm2C/pslmTYTTKV1w1baSL65T4QOOAZqThS15Z9LGhGchfMTZ5GKJk8Em6mjLsKWHoersGZqgHWJn72yW3bTOxVk3/ZB5bSI+jf1ZyzaTMKK3ikwnbLbqw85M36WBz/ZlZ2eZgBmWbmIe5hiu04ZjOvZrgLR6nJ9pbabV43wxMzJzDNCMjKlbNiY4JzkZ5vcosroPDg8jy/ow9B1/ElZqWoGLJU6Wtt63Elu6xqBbe46dvVs++PLZBuzsvtKEDtP2BZweJws5oE8kYkTXiRPuO2EzYdY7PlknvpEP29y+7OwsE7Bc/8TE0k3LxoOB4TqMYLIzadmv0+pxXqW1mVaP8cVZUA7yIyFWZY4BmpPppeajGNjZmGDcZEX1sliYXxSlNVwss1KQCxFmJpeViowzQyxxMlxykBZey9HColW1kCMtMhq/bSG29Hhn25siATs7n2FdrGEdtm/rcXZ2Foi08cnpcTLGGWctK73CO5MyucixubzNFvRNDsCtSxmxgKGZLbaJZTaHy1D72q9JRheBjF68idhdcYXgEWfFyVtX7M7l3MQE7AR2JEu3vBjjSqvOwq7tWP49Lft1Wj0OxbQ20+pxvgiGkVlRDnjLy/sZoDmZXnE1sm4DzjTFRECW9qeklBh3BilcLDGy9mB9a9nS0+KXVq9pxdkII039IC5MN1sMrNyM9cGSakbYTHRKr5i9rCkKGPZrJO4cy+bE2JhedC8v5uUq3OGcmmKX68/Cqps+Ex+f0ezsnB4nYx3GstNqybk8kfzSooC0EKEesTBYo1FjTDg2R0bj64H1zQpbRiBi4GPZ2VtGUSsEmYCxkzOzdJsZrrW5VvfqQt0643taPc6/tDbT6nG+eLKoJdeJVymavVz5Ei3z6D/06qmjYqmiO0Ivx9Rs9z4T7iGSNk6NjYrRvOI/81Zr5WLJLNs81luALd0Fp0sHLDs7xhdeFI1M3OSiHDx41BJt81ra7WV29jAS8fGp2nNwIMnpcbKwB74zziAlOxHFiM4xjTMxoW1OLiK9jdOW9M2ML2t72H4EIgc+lp09DdBRTMAMmzHxySCVQGZkUszOTkn6hvzUkmZVSeMAklziRdzABs8ZTKvXCZud8MXzMzzwERwDNCdDDh7iIZMbciHJpfNzQQLNqJjwvGn9aE0sLyyIudlJ+RR1bG5VmeBiiZFtFmt1Ebn1bOmt47g5DTM7u0MXkMmLielZsbTqMVEXpvVdvR4oq72fTX1TXjkXUb89I/u1HCRlxIITvpWFMcm76HuAj65ExW6SmN9UKZqUk8RnFDs7p8fJmjIP/pCYmRnRjVgTrQZxNEbEhB4E8/UQdMT+bgcChoFPkOkVWVGWmxmHLTu7H/44JmCV1v86Sz0yj2a49ltu5Tie/TqaET1erxUvVNp4m93zxfNec800d/H0KszIXs7JPMPCX7fqdLKY8Jlo6bCyQEzPE5J3i4slVibZ4OkCrEg2GzRwdmwmcWYrsqUn8budaVS/6Gdnj2bibtSrcm7PGpKcZpBbaR4Je4kMuBrxkDCVf86rrt5lZw+XOr4PQQ7MCHZ2To+ThT3wnXEGi1GM6PFM49ExoV+Xm9nSffnbw7YikHjgwzGwczLl7TZmZ2eYgDmWbpbhOm0Vx7Ffu6/eAo/a4/TS+BNns5u+oP9mRmaOvdws4+pWMDGRBkrSqeOE5sXlEl4oG9jZl8XsKA5YstOSqZyLJU4m4uooxtmtwJYe42LbxTw7ewwTN3lTpzk+0Bbi0u3Czm6spNj4xBuZKHZ2To+TGR2hejMzojfN+8Knv1P0hCcJO7scTHkPGeTTKPDmG3LuWNnmEDAOfCw7ezJgOSZgnqWbZ7hOlns4Fct+7bL65kWwflm9cDaJzrA2u+yLmZFZd5705CPIXm6WcXXLxUQi4CIS6QGMmlhJvo6IhZKeOMvFEicTgq2jCD/8p7YCW7rfn24c8+zsQWbsABM3OdioitVCUQ5YN+vvdmFn53Dg4xPxzlNbaK0/420avHH7K9VPNDGis0zjTExEDXwyUw6ru8EPe7otCLRMWUELoSHRMwzuHYI92Av7N07mT7ejjmmhLIalmzCrNwAGhsJ4psYpLft1Wj3O0bQ20+pxvhhlHAM0I4upW2N2qQXoy/oGNBoNGMJ4CW5cLHEypG6H69imh7BNbwManiAsHfnNsW1zsvY7s93Z2RGxtPHJ6XGymEoyMaJzTOPdjYmYAlix5eqyMWARsAhYBCwCFgGLwM5BoEsrN+8cQG1JLQIWAYuARcAiYBHYugjYgc/WrRvrmUXAImARsAhYBCwCbUbADnzaDKg1ZxGwCFgELAIWAYvA1kXADnzaVDc0eTQNU3VHWJBbZh52QEirx2GY1mZaPc4XRsYxsHMyxiTOyVQM3lyaVmWcTS4GOb1WfXDTYx2liXlXv5cPZHuvAc41t1unEUjbF3B6nCyyPJ1gUu+EzUjn7ckAAl0a+PQ+OzvH7p2EZf3i2RPQ13cCLmtGbZZtO1BLLfxMxTyM9tPqca6ltZlWj/OFq7+L507BwPA+ZD3fBwPHz8DVdW2p99nZkzLFh+JTQxC5t+zsfYPDGC/DMDjQB6efvxqJUjdOmuPay721uuX1kuTnWdj8Udq+gNPjZEaPO8Gk3gmbxgJYQRMCbfkoPtZIj7Oz42J7kmg1gt1brb5pYMZ2cPHWYMl56+dwbNuxeJoSpGQeTs3SbfKDzm8hX5j64xjYOZlebn6rs7MnYYqPjE+uanGlkZmxMVx9uILL0pTEJFGvTCRhdWeN9oZw0+zsbSwmE9c6l9brVmlG6iXIT+fbnn0n+pCUNp01dyw7e3tq9lZbiVjA0LKzhyqFYfcmskpagt7Msl4SY7gw3uTCHPJxeat0BvNoYtsOChP+Tss8nFaPcyutzbR6nC87mp09AEwT27aUJYvPgBnfT8vO7gPDzMTtT9SuY65fknlwdRvNbK5cM+jF5teugik78X1BdBk4PU7Geu+s3GzZ2VmUekYYMfCx7Ozm2osgucQ1WOfH1OqhExNI9oeDnKllh/0PDS1PZgWMzONRAZnaAwMfI9u22QNOkpZ5OK1er/ji+RmuP1X2aAZ2TtY77Oxe6aOY4tn49KlGH1p29qXVsg8ahonbl6r9h+G4pjz4ulU6QWbzeD1KEZ0fSdq5xfdL0WXg9DgZ67sz8LHs7CxKPSOMnONThQwsfeEjcBBXcj1430Nw/117oPbK30IBxiB//BD079kPv3d6CuCZ70IZr/ScDBPjKrMH4AC+K9r9Swdgz9Be2Du0jdaHXS9DYQm7j5H3wK/92kHIIx5/870fAM15XL/6PBz95DAsTz4MsIHLM+M2MCB36p/+YXjP7/wuZHN/hIgDXP4BobmJjWxnBuFbnz8JT40vwfiHHsQTZbihsjYbTqtntogF3UK+MH4OZXIY1U/BPcdPw5knT8Hhk3OY+mdwAyuQk8HQEXiuskY3DiAaZZjOPwXHPvoX4E4PknlegzMPHIZnRmbhCx84yHiRUGSKFyYGPcthX2Lj01OOPKpd/hp88Ok8rNa/CPeFF5KO1On5k3sfgm+tFWH+sd+C/77wZTh2+G44/uSLsr1T2YZzAE899mdw5vzz8F8bvwL3Yd95K7b4uh2Ck98uQ7n8bTjiq7t4vS6WJrYPiS4D2/fE2jSXr4qiT508jowFQ/Bg7uMAhRfgB3LO5h4Yvv1H8PmP/0s4fuJfwhReD6D8U9DdLhcTdK39s0cfgj39e+G3/wW+G3hpFfQ0ULMnVrJpBEJDtAB/iJarkfK4qDgndiY7e5jdm2O/lq+viP8pk5FPgrCyInllCFI/27bGvNV9PPNw9xjRt5IvHo7h+pMyjoGdk3mGtyw7u3Ixmim+lfj0FdU9pHkgmfxMW3inXKM9dqD6xXh29s4WKxzXSeo2itk8iR498ZnK4LzGIOFfmwsZ34dYdvY2Q75jzEW+6gq9kkE4OAZ2TqaQ7H12dhO7t54EOFesEkpieTqPgxv16qRRXROVSgX/cF+cl3OB5oprmIpn21aYpfg3jnkY5yNl5eDLsrNXq3VZD1Rn5WJJXbyrq3I+Vnaq4IBvlvUKOzvHFM/FZ5Los+zsdae9jwn1wisBO3sSYFtIY+qX4usWBy8RzOZxeqb8WnA5edK4/owGYBFlEJweJ+M8c1515adV31CYoX5ePQiw7OwccFtTZhz4RA3mV2fVHBb95GKxTJdwtXEySlFZmnYuuiByk8uOVu/szOzePPu1W0LnSdqyQ6itB0wKS3oS5GfbdrVaPmCZh12G4dbYjFt2wlHYSr6Y6093nop1OTM2K7wZWmZZr7CzJ2aKD8Rnkjq37OwUM1kxvaSfgzNM3EkATZHGHNc+Y5F1a2Y2dzUj9BLl5xrY/AHbh+DAx7Kzbx7jnWjBsrNv+mWhMsCyXxvz4Nm2jWpxgrTMw2n1OH/S2kyrx/lilDEM7Dh7Y71WhzpOHNg7FJivQYug1euYYjAsM+a1GQEfL+licDP+7Fxdjm2bk+1cxDZR8rR9AafHyWJctezsMQD1gLjlgU8PlMm6aBGwCFgELAIWAYuARSASgcivuiJT2pMWAYuARcAiYBGwCFgEehwBO/Dp8Qq07lsELAIWAYuARcAikBwBO/BJjpVNaRGwCFgELAIWAYtAjyNgBz5tqkCOGZvLIi3zN2cTWmYedqyl1eOcSWszrR7jC89QviGZxmtRdNuML1y9czLGTVbEl4FRTVkGxiIuyrmD2dlZYKywrQgwscvmw+lxMtaoFW4HBLo08Nmh7OzIwH6qrw9Z2b2/sy49O8P8vYnISsU8jPml1eNcTWszrZ7RF6yHR7EOBocVo3bf8Sdhxbc86sa1i1hPA5KdfXhwALw64nDZgEvE6i5ZuvfBYN8JuODSunMyo5e8IKYMWjmKiduMZ1o/dy47e23lfFN7Pn7qHFz1xZKuh27tk7ClR8VEEv+i9JLkl8R20jTm2OUtcHqcjLdqpdsGge58w79D2dnlOhgZEcXgzTJ/p66UlMzDqZnUOUe3kC/1sliYXxSltaqoVgpykcKMu5ZURUzQoo4j06KEixpWVpfFctlZbInDRdYtrl67UEIQkLNqFG3oVYw5GQcZJ2PLoBS9taFywluHi6mH1H7uXHb2amES1+4ZE4VyRZSWiXiYYmfOWQxTV2BdrGGsdXxLwJYeHRPxnkXqJcgv3nIrKZjYZc1wepyMNWqF2wiBiAUMLTt7qH45VmKOnV1eWLJioYwX3GpzR6iWup/EJbjUVpobEZCZ9C2eF/Ii9kRa5uG0epxDaW2m1eN8CcrksvzjS/J0vTiNF7KcKFQbor5WEbhzN9YXrt45mWt9cwf+MihL0YzaqcuQ2L0dxs5OAx9sp3poXJzOYfxMNLdbrP8o8s/EkCZNyPVL0kZ0TCjz0czmSmbQi80vqePJ0rGxK01El4HT42SsV3Vc1T2bFfk81TcOdjOjYqnidRZl3wK9tKjlbFFHCGcVCa7HHXtkMzcuCnr1VMxvNDsqCu6CtzMiNzIr465enEUWgBGx5KQtzY8LyI6LkucOl6mVIQIRAx/Lzm6OjChWYoadHTtARRGBQU2BjVQWurGogU80K7g5f16ibOLy+XV1VzM6joMpyLuNx6SdVs9kj86ntZlWj/NFyholMTU2KkbzijdtdlUNOT0+IF1HIKaX1Uq8vC9MvWP3ND9G9vJiYkKtdj61rHu0WE/NCQxlIAUTE3f6Mpjd8CQ7j5296YnP6qIYR8qEzPiCBwkdyRueAC1Mc4o2/4rql8wxoTKPZjYnmSmWPKej8/Pk7TniY5fyiC4Dp8fJWK+xTpF/Vmh29oWJLA42ppwbV/QDZaPz9PQXWQqKy/hEMNnAp7C4JMr4pBmDRvUZeTW4oRjKgBdDym/vxniJ8scBeKEwI68tM05/Jh2w/8QiEDnHx7Kzt/Amk2PGZhi8WebvFrJvSpqWeTitXlPmgR9pbabVC2Qf+mliNncSThcU03pxdgROHv13iiGZ84Wrd04WcqyFE4YysIzaacuQwK0dyc4OuxGZz0E+/ztwz+H3whMvjcCFx49LtFbOP6rm/wwehZegAMeG1dy+s5evJ0CzvUnYmJBZRTObx+u110/WGhe7TBk6x86OTOofVezs7/39P0Ym9efgZWd+F8fAbi4jz+p+J9zpqg4QFrj1qx088Km/gtljn4RM5hEYXyjDh+4dciR2lwiB0NDIeT2zpN/BOAnUiNOyswdZiTl29iC2q1M4Sgdv1C4SMn8H7Zh+e08vFGliQ85H8D+G3+ns7Aq5ysIo1oPCRWGGr7qcx8QNZBynR9U0R4bDk6t3Tmaqu1bP+8vAMWqnLUMSf2geyE5jZ5dPfPSrrkZRzhfLOcSVjXpVzu1ZKy3Iu/V5JCSuruFfx19BIKdcgC2diwldt5adHSmKQ32kRiewd57iLToPbhtFetKSFd51sioKi/NiZpL6FhAjM6sBA+Gf6jV7RswsFcUaToWQBNcYW/LS61yHNbdjaQ7tapk0VRFTOfWUemQ2Pq9w7jv7TOSrLsvOHg4KEyuxngQYyc5eWRVLhbKoN2j+SFFMEpPwmH4sbmb+Duee8Ewc87D76s17hCotx+klzL4pWZzNLvpSxwnNi8slvAA1RAMnCcuJyNlpNU8DiVvpEfbkouLXlp2PHpwyZeDqnZM1YdTCD64MLKN2yjIkcW0nsrOrV13ezcva0oQ7UHYxq9McH/BdFF1J2w9M/RIbE9ILTcDrv3jjQKC6JiqVCv7hvjgvB3BzOIDTYzdTfm0vGBlkYlflF10GVi/WpqEkOBChfqKZnV3fVNZFsVB0Xns1xNwI9vMTag6hwZo8zbK646B6FPMbX6TX7mtihmy6r9YwD/qYIjctyqV5GWuTesIPl6GVuQgYBz7eVyFuWsExsHMysrAT2dk5Bm96Pz1FAyEMbvprZgX3MG/1iGUz3qHs7HogorEGnBi4UPLewZcX6UsdXRc4MXHVm49jxnNNzPknJuL7+Cln8EQdlVnWao2q9HFlcK0G7hTpfLoyuBaNBzuRnV0/8fEeiFfEJD5tyU4VPJwaVbGKF0IvwjxRu48SsaVHxAT1PyZmc9fHCL1E+bkGNn9gjl2ybS4Dp8fJjB47Ax9/P6Fudh0/nKcvSj4iFpPM8cHBzYTvGpCj+Yc5PW+oIRYn826/lM/j2wIc6FDcyac/2IcVnCAsL6rB96JvsrWxHFYgEWiZpJQWZUOyahjcOwQBrmpcz8wsw4DY1huVvd4AGBgK4EILZRkZvBnm782glZZ5OK0e52tam2n1jL7wzOZIwQ7X68izvndvKK6VDGAIY16/Y9fZGOsdE3Ayrd/aPqYMnDEGz/b7yTliZRaBFhFgYpe1xOlxsiij65fh+OA4fKH+AryrgXO2BrGfCHQG62gTu/rIfiLKpD5Xq+FEoYEhGApeUDHBeu06NKQskJlWtvtUCLQ88EmVi1WyCFgELAIWAYtAryJQuwR9w8dgsSrgITuPuFdr0fXbDiNdKOyBRcAiYBGwCFgEIhDAL3RLxRLss4OeCHB675R94tN7dWY9tghYBCwCFoE2I/Dnf/7nRot/8id/YpRZQe8hELmOT+8Vw3psEbAIWAQsAhYBi4BFIB6Bnhj4rL92FS5fugSXV67BRnyZOpqiNV824NXLF+HixYtw6fLVgO+crD1FWL92BVautrJ42gZcu7IC12rtRJlhPWeK2QkWciY7VpTaF9bq1hK2Ftec752Pay739sqwLCuX4dWm9lCDlcsrcL2dTWTTTveKnzhZdwv15ZuG3RroWQS6NPDh2dlrr67ANy9cgG9eXFEr5vrg3Hj1AgweeAccHRmB/+1L3wGcNH/LttZ92YDvf+MZ+Mx73wvHjn4jUDZO1p4ivvzMYcg8+4MWjNXgK4cz8Pm/c5YjbUEzKinHeh6VXp5LyEIepZ+WddnIOM35grJTyPje5/vzs7pH+Xerz0WxbZNPrcc1V5L2xPUVWgX5xHlY57JKJOP7Hm0iOr8afDVzFJ7yt4fay5A5moH/cos6ol7xU+Pq37c3zvyWo49rK+fh0Scv4pdRl+DUo+cD/W+0jj27QxDozmf9Znb2wgzxSQESsI3KBaIg00y2Vpcra3qkgN3xNzqXtL40VqewjB4hqd86J/OnS3NMK0VnJpZbUl0rl0SlLQuQcKznjEsJWMijtVOyLuNCihlawyc/ohYy9HNqcb7INU4yYrZQwkXESqJYLIm1tuAWXbrNnvXWAfIztyuraeOa82lTca0XlfTXBZcZKzP3Pa4ak1+1XG6uV2dtG73St2ujGwe94qcBi07EmSErebowkRG5WVy4dAlJPEfmuaRSdvbsWWH6i1W2CXoKgYgFDLvHzq5oMHIuy6xo4DLcuKDTJK2eiI18NJMRGVwcjAZGGToemZELOAmGuZbQ55hy11bnRF4vVocMu4kWmtqEL+SPJphz1puiU+7GydxETQdIZudfOM/P6IvpivO0mBVhpsg4s5Nq4FOcU2SZJMuPjiry1PykKDtLslZXZ0Q2kxW53Agu4OfzVLIS58TYmF5MKy/miz55k2/eD4713EsVfxRmIY/WSc263ALjdJMvzgVwoVwVVVxuvpUtbXySnhyk4VL5o2MjIj82l3CRPAPbNhfXWCDOzyZZbkL4Q4awMMd1NKO2H7/VGWSsxuX5vWUkA77482NYs6tI4KjwwvaAsZ3FvmTEoZeIy291higCUCebD7QHtYJvTrN040Jyi7oRoVEOlyZZgMGbk2lfo3DZin5qf909F2cd6MtVX6b6P13v1O9lx2bV9cN1rPnANOih83bbXghEDHy6xc5eF9M4yJnAQY57N+oMcuTABxdJpwtKaRFH6zAuini8JllssQLwomNmrmWYctcWZUc4sVCStaieNk0IxcXNVWxaX5RNvcx91OWRk0V7VEdOmGhG30Z5Tg56ppBdvLFWkDxCeuAjGZeRLqMkl9gfEatI4zCCnS+uS6G2Rh15hYpiHDuICf+dNmJNS7VnJxaResNh4x5PsBx7gZ5yqUGr3mvW8+hy+c4yLOS+VE2H6kLbOjO9El7FKQAADTFJREFUZ8TAOG3yxaXc0GUcFUuJVk5NGZ9r6skUxW6j6qz4ikvY+wcHXlmaj8xs20xc4yXCyDjttqMiUoBU1HL6yCqtaQ0od3NcK5xpYO7xHPn8dSgFJvxL8HP5ufG5gIPAqmhizaaYRqwopscXcCVlpGNYCxJnReWH7hDvVrVaEhPG9qDyW5xULNmyHjg/OTxZmYNNr/jpq0rvkImzTvTluHJ2aZk49/Jisbgkb3RnkLKGaDi4zQ58OHS2lyxyjk932NnrUIU8/E5mAP79x08CcpKA+H4D5kYysN6gmYP9MISrIO/7pbfi8VvhAB7v9S1tyTHXmphya6/8LXImA3zz7J/BiRMn4MxfLOGvGbiCU1pWzp9qmq+h526cu0zzXdL7gspqw1tP4xaQ8b6YGX3rP76CWUzCh+7fD/1774MP4+Ozn/omSWTedhfc/ba34zXnfnjH/sNwf3bYc6l/D644egAOBHyhBBQPf/bRh3Cl0r3w2/9iDFmJV+X7ct5PZTqK9TxWz8BCzuoxTM6snodA9JHBF8B1PZ6rrNGNA4hGGabzT8Gxj/6FnJMSl1+a+Ky9cgljdwzyxw9C/9Ah+P0/xueWP31driTN5cezbfNxzftJvhyC/j374fdOTwE8810oBxGMiCVc1xZOfrsM5fK34UjEmihXX/g/4BmYgI8+sNe1ptqtOT8VnxGs2RTTQyqmd//SAdgztBf7kOaly6Lyo4z79+BKukP74K0RZaii/FMnVX4P5j4OUHgBfoDdRJyfJjwpP05G8q3uJxeDm+k/TbiY+3Jc3RwG4Y5f/Agg9364d/A6xtMI3P+ug7B/vxdThKnddi4Czb2Ai8Od7lHzwSDQ9cXbbsAGjVHkZpA5ObyOafY0K0utAWjA6z8FOPQ/7pe/f/ntd8L35VH8PwOOvZ+88gpezH/VURiCj7xQhaMXvwsrf/sf4djhDwIy5cK5D92LchoFjMP010bhjnU67oezX6POHw9//3+H8j/5DB40b4MJV6yK9sVnq/BzmXtEX48dZ7PsMOPL+tXzcM+xL8LM0l/CE+86AK98/eMw90VCN7whg0bztt6A/oP3Qg7+Br8w24BorWYV9etOeItTj3v2vw0HPlX5hRrnJ/yQNHNw9LDqbA6++0H8/VX4Ye0TkGHKp/LbC/cfPw73w3F4cOEVOPC+C/Cn4l7g89uNOD4BJwtjUBYPwODKJTT1MPw6Aj4Um5/KFS1gHQWbRLQvRGyxf7+zxnz/XXDst7IAH/t7Ofme9RPzSBOfdRk9Xhvrv/0O5TT+y+X38tknMUUBTj5wBAoFGvYDHB18FJarX4P7I4NRJsF/uHZEaTxflIbTF/jhC8S1SoeaOKCgLbxC/1U488Fn5E1Q+BJlyM8xGtG1OBKQcR7V9+BwgslPqUe3kYzbHmDgdjcfdWDws5/Dk5OR1a3vJxeDAYAif0b3nxwuhr58oAD/auAoPE254DyJA3ermD88eCNBzEe6Zk9uRwRCD7Dw0WN32NnVI++ZUkOUZmmCM85bGMV3+/RY2veYO/KROctca2bKbZQVky29CqKNHtMvL60mnCdheHzP+uKg60ygnUHyy0Y9MAOWkznq/h3H6NsozUr85oqUR1mywftfdWUmClhofHWF8yfq+N9kNud71UUvKhTh4vgS4eO8uAjEQ2R9+B3Ux/hen16RRbKe6zQRe46FPCK5dyot6zJaMDFOc740KqtiqVDG138NUcdXhJNENoivEuO3lPHpxO6MnExTDbA1m3ONY9smzeg6jfcTn+ahdh1fL+F8Cs12r10xxrUm521mBSe10hz1A+OhV8+63Ubm57zqimbNJqt1MZvHV7WTS3jUEFhd7mbKz01Ar6Dw9XvUq9/m/JTPrJ+Yu5nBm5OZcdlqfnr+RB9Fxhnbf5px0VhH9+UV+Zp/vlIV81j3Y4v8Ky7trX3VpZHY/vvIOT408OkGO7vqeNQcm3p5VRRW6T1sWVR87+FlY8loxlpdIWbmWuzGxTTDlFtqYuLGi5WeMK1NM/vWfdHG6mJxSn29hk9BAnMbOJnW9+1ZRl8hltx81NyT3JSa3FyYyonMpDPwyQYHPkHMlO4U0f9GDXxC9eHzz3fIsZ77kjUduvO9cNBEg+Agk3pT4sCPVKzLaMPEOM35Ui/QHALtI+5xwq0cBwR8Cv8MYt3M5MzFp/4CkvKVk/5xjo+eohXOJ+KMU5fLwbE3fTkZqlPez9VZb7K8nEvhm+CrcjbFNdrFixHpNPcx6qu8sYVyhONCGPNzBj5eXWSFx5qtTFVwUjg+j5P1lXMm++NwQoziOVN+ShMHaaGBT8H7OELaxC/7fDO7jX6y/RKHda/4GVltTSdb7z85XLAGTX15ZR7ncuJgtF7EuvLNY2zyJvzDDnzCmGzXMy1TVhCTc/vY2Wvw/Olh+OBTOZhZeALuv+sOfPE1AO+891DEY3Ds2gIbx1zLMuUiY/r1WgMGBwdhT5BiN5BH0p+cL0lttJKOZ/StIaPvILL9+t87tGK9jWklC7KB9dyYTWdYyI3ZsQLGF4yjGtIxY+ma5p+x5hxh2vikOKsP7IX+0jkYPvw6VMUn8KVU5zbOT64vaNWjay9+Gu5+3yC+pnwc7jIoR+a3Hs+aHWUuSX6wcRVOD7wD7i1U4dR9YZRr13FxUJw3FJg2BJF+Ok5weEbJesXPKIxbOcf1n1G4uLbb2JdbygoX1W1/0PLApxOIXL30PHzl3/41/OjGT3DS47tg8q8+C/eFJwB0Imtr0yLQkwjULj8Jw0d3w5r4FITnw/RkkdI53QnWbFqccjCj5onghPJi47NwaAvcQ4QA6hU/Q45vzRN24LM166UTXm2JgU8nCmZtWgS2MwIbtWtQrAzAvYfURwHbuax82dbh1as/gX2HDrbxyRfZLOOTvH44cBDtbsVBjwSlV/zka3CrSO3AZ6vUROf9sAOfzmNsc7AIWAQsAhYBi4BFYIsgELmOzxbxzbphEbAIWAQsAhYBi4BFoK0I2IFPW+G0xiwCFgGLgEXAImAR2MoI2IHPVq4d65tFwCJgEbAIWAQsAm1FYNfRo//o39x2223wlrfcAf393Pqnbc3XGrMIWAQsAhYBi4BFwCLQdQT6iz/8Afy/K38H66+/ATc3bkIDOShu3rwJb775pvzDBYykU2/iuQ3nj9Jt3HxTpiNOK+gTcBv0yRXCdvXh0S58kCT64Bc36lD7RR1u3FiH199owE20uQsHWXtuvx1u390Pu3b1Qf9tu3DV912wG88N9O+SchqIAf69eROJFTbQD5nvBjSQw4t86yMbe/bA7ajz5psC3njjDfj/MJ/111/H9DfR3z64Dd1qyPJov5FTCYsiy0V79Fa8qVY1kwINPZXH2WTR0JYuH5WrH/92oc+7+vtgd38/+t2PfmOZ0eWbDiYbEkPMBFV39WFa1BkYUJ+GNBo34XX0U4ibeL4fy4B/aOeOQcSE0lB29B9mvnv3bonPm+hoo9GQdURlpDLLWqEsMB3hQXryPJaJzu3atQtuI1/x7zZ0jjRukh6VHfeEA9UHnVP1TVjgeUwgcdH1jj8wGeoJlRdiQ7hQ/rTXvso8EfTbpD9YfSTDv9sHdsFbBnfDW+7YI+uM6lzqoQFBacm3N7GOJD8bGkXFNxG/XYiJlOEpgQ5Q+W/U1+Xf+hs30Z83MW9VLvJCxqn0h3xVedNeFQNrWx0oAYHlbNIX+k0HWKp+jMHduH7+AOZPcUjlIVzof4kN5ku2BOJGcSHzkEJlUOA5sqRw8fJ/E2OD6pGSyqyc/CmfAbzh6Me6p/oiObVBiiH88gBj4Hb8QzmmefPmGxjrDfQJ4+n2AekfYUM+kG+3IXYNbC/1G7i+zy9+Aeu4xtANombBttiPZaK47adYJQewbHegjcHdu+R6VhQvfejfG9jmxE20hb7sGbxD1gOV/01sSxSzt1Hsoy3aOyVWGBAu6AvZljLc03+qH9lQ8SbLhf0A2qL42DP4Fui/nYhCKCbRPupTeqpbwvcmniM8qFzUVigm+okiAnU3NhoyTig9bTJWCAjcqH6UHSdmpU8UI30y5inebqIvtPVTPVNbkW2ayoQxhflTG0En4I0N7BcxNsk3nT+lpXLSH/lNeWG1Yx3gH/VZeE7GANaTrFP1S/olDzEh+ajrQTpC/zj61CY3bjYkBnSa8iM/ZXr8TXUt85TGUE5tyvmP0lN9yRiltJQX+kdYEjzU/5It70/d7FJ61W8RLlQ26Q6ZU347NknQhzhSBWp/KE3wWOVPfmKmlLH8H//Bjf6V5cc9YU959WE/STYIN2WejtQm1Skm6ED6QTuvjG5K0idj7kbp9W88Vurwpq4slKJVdV4KpVnlj6Mn44isOLab9jofmQXlrfSlQW1Wp3H22htKLH2VZSI9co721Ec4fQ76RGlUP0R9HZWGLCCumN615UgU5tII/qNsKrMKO1kXGAtkh/7VMCg9D09q63Stp+uDlEnsnT4W9ZRNlZ7yob756G/8z3TYM9v/D5w9Lgrk0fZJAAAAAElFTkSuQmCC",
        fileName:"sample",
        fileType:"png",
        cache:true
      }], (error, url) => {
          if (error) {
            console.error(error);
            this.setState({animating: false});
          } else {
            console.log(url)
            this.setState({animating: false});
          }
        })
    }
  }

  /*
  * mp4 Video
  */
  handlePressVideo(video) {
    this.setState({animating: true});
    if(Platform.OS === 'ios'){
        OpenFile.playMovie(video, (error, url) => {
                if (error) {
                    console.error(error);
                    this.setState({animating: false});
                } else {
                    console.log(url)
                    this.setState({animating: false});
                }
            })
     }else{
      this.setState({animating: false});
      Alert.alert("Coming soon for Android")
      }
    }

    setToggleTimeout() {
      this.setTimeout(() => {
        this.setState({animating: !this.state.animating});
        this.setToggleTimeout();
      }, 2000);
    }
  
  render() {
    return (
      
      <View style={styles.container}>
      <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.didPressToObjcButton}>
          <Text style={styles.buttonText}></Text>
        </TouchableHighlight>
        <Text>{this.state.progress}</Text>
        <Text>{this.state.donebuttonclicked ? "Done Button Clicked" : ""}</Text>
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"/>
        <Text style={styles.welcome}>
          Doc Viewer React Native
        </Text>
        <Button
          onPress={this.handlePress.bind(this)}
          title="Press Me Open Doc Url"
          accessibilityLabel="See a Document"
        />
        <Button
          onPress={this.handlePressLocal.bind(this)}
          title="Press Me Open Doc Path"
          accessibilityLabel="See a Document"
        />
        <Button
          onPress={this.handlePressLocalXLS.bind(this)}
          title="Press Me Open XLS DOC Path"
          accessibilityLabel="See a Document"
        />
        <Button
          onPress={this.handlePressBinaryinUrl.bind(this)}
          title="Press Me Open BinaryinUrl"
          accessibilityLabel="See a Document"
        />
        <Button
          onPress={this.handlePressb64.bind(this)}
          title="Press Me Open Base64 String"
          accessibilityLabel="See a Document"
        />
        <Button
          onPress={()=>this.handlePressVideo("http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4")}
          title="Press Me Open Video"
          accessibilityLabel="See a Document"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactDocViewerExample', () => ReactDocViewerExample);
