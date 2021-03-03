import {
  showToast,
  getDocumentTypeList,
  getDocNoFiltered,
  getMovement,
  loadImageDoc
} from "../../actions";
import Movement from "./MovementEbiz"
export default class DocumentList {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.docType = "";
  }

  async getDocList(action, newEbiz) {
    this.action = action;
    let temp = await this.props.dispatch(getDocumentTypeList()).then(res => {
      return res.data.filter(item => {
        let condition = true
        if(action=="import"){
          condition = item.vn.search("Nhập") != -1 || item.vn =="Danh mục kiểm hàng";
        
        if (!newEbiz) {
          condition =
            condition ||
            (parseInt(item.lct) >= 200 && parseInt(item.lct) <= 300) ;
        }
      }
      else{
        condition =  item.vn.search('Nhập') == -1 || item.lct == 300;
      }
        return condition;
      });
    });
    this.docTypeList = temp;
    return this.docTypeList.map(item => item.vn);
  }

  setActiveDocType(vn) {
    let temp = this.docTypeList.find(item => item.vn == vn);
    this.docType = temp.docType != undefined ? temp.docType : temp.lct;
  }

  async filterListDoc(text) {
    return await this.props
      .dispatch(getDocNoFiltered(this.docType, text))
      .then(res => {
        this.movementList = res.data;
        let temp = res.data.map(item =>
          typeof item == "string" ? item : item.docNo
        );
        return temp;
      });
  }

  getMovement(moveId, docType) {
    return new Movement(moveId, docType,this.action);
  }

  getMoveId(idx) {
    return typeof this.movementList[idx] == "string"
      ? this.movementList[idx]
      : this.movementList[idx].moveId;
  }
}
