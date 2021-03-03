import React, { Component } from "react";
import { showToast, updateMovement, getMovementIdem, loadImageDoc } from "../../actions";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import PriceFormat from "../PriceFormat";
import {Image} from "react-native";
import ImageUtil from "../image/ImageUtil";
export default class Movement {
    constructor(moveId, docType, action) {
        this.action = action;
        this.moveId = moveId;
        this.docType = docType;
    }

    async loadInfo(dispatch) {
        await dispatch(getMovementIdem(this.moveId, this.docType)).then(async res => {
            this.data = res;
            let tempSKU = "";
            let tempList = [];
            this.totalQty = 0;
            this.listProduct = [];
            this.data.fhsMovementLineCollection.forEach(item => {
                let qty = this.action == "export" ? item.qty : item.qtyEnteredTotal;
                tempSKU = tempSKU.concat("'" + item.barcode + "',");
                this.totalQty += qty;

                tempList.push({
                    sku: item.barcode,
                    qty: qty,
                    price: item.price,
                    name: item.productName
                });
            });
            let listImage = await dispatch(loadImageDoc(tempSKU))
                .then(res => res.data)
                .catch(e => {
                    throw e;
                });
            for (let i in tempList) {
                let element = listImage.find(item => item.sku == tempList[i].sku);
                if (element != undefined) {
                    tempList[i].thumbnail = element.thumbnail;
                } else {
                    tempList[i].thumbnail = "";
                }
            }
            this.listProduct = tempList;
        });
    }

    async getProductList() {
        return this.listProduct;
    }

    reloadItems() {}

    getMovementBrief() {
        return {
            docno: this.data.docno,
            orgImport: this.data.orgImport,
            orgExport: this.data.orgExport,
            status: this.data.status,
            created: this.data.created,
            docType: this.data.docType != undefined ? this.data.docType : this.data.lct,
            docTypeVn: this.data.docTypeVn != undefined ? this.data.docTypeVn : this.data.lctVn,
            totalQty: this.totalQty,
            totalItem: this.listProduct.length,
            description: this.data.description
        };
    }

    getProcessedList() {
        if (this.processedList != undefined) {
            let temp = [];
            for (let i in this.listProduct) {
                let element = this.processedList.find(
                    item =>
                        item.sku == this.listProduct[i].sku &&
                        item.bundle_id == this.listProduct[i].bundle_id
                );
                if (element != undefined) {
                    let newElement = Object.assign({}, this.listProduct[i]);
                    newElement.qty = element.qty;
                    temp.push(newElement);
                }
            }
            return temp;
        } else {
            return this.listProduct;
        }
    }

    setListProduct(list) {
        this.listProduct = list;
    }

    async updateMovement(newEbiz, dispatch) {
        let movement = newEbiz
            ? await this.loadProcessedMovementNew()
            : await this.loadProcessedMovementOld();
        return dispatch(updateMovement(movement));
    }

    async loadProcessedMovementNew() {
        let data = this.data;
        data.status = "CHECKED";
        data.fhsMovementLineCollection.forEach(item => {
            item.priceReal = -1;
            item.qtyEntered = this.collectedItems[item.barcode].qty;
        });
        return data;
    }

    async loadProcessedMovementOld() {
        let data = this.data;
        data.status = "Completed";
        data.fhsMovementLineCollection.forEach(item => {
            item.priceReal = -1;
            item.qtyEntered = this.collectedItems[item.barcode].qty;
        });
        return data;
    }

    setProcessedList(processedList) {
        this.processedList = processedList;
    }

    setListCollected(list) {
        this.collectedItems = list;
    }

    async splitList() {
        let temp1 = [];
        let temp2 = [];
        for (let i in this.listProduct) {
            let src = Object.assign({}, this.listProduct[i]);
            let des = Object.assign({}, this.listProduct[i]);
            src.qty = parseInt(this.collectedItems[src.sku].qty);
            des.qty = parseInt(des.qty) - parseInt(src.qty);
            if (src.qty > 0) temp1.push(src);
            if (des.qty > 0) temp2.push(des);
        }
        return [temp1, temp2];
    }

    renderItem({ item, index }) {
        let temp = {
            flexDirection: "row",
            flex: 1,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: index % 2 == 1 ? "#f2eeed" : "white"
        };

        return (
            <View style={temp}>
                <View style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
                    <Image
                        source={
                            item.thumbnail.length > 0
                                ? {
                                      uri: item.thumbnail
                                  }
                                : ImageUtil.getImageSource("noImage")
                        }
                        resizeMode={"contain"}
                        style={{ width: 100, height: 130 }}
                    />
                </View>

                <View style={{ flex: 2, flexDirection: "column" }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "black",
                            paddingRight: 20,
                            fontWeight: "bold"
                        }}
                    >
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", flex: 3 }}>
                            <Text>{item.sku}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text>{PriceFormat.formatTotal(item.price)}</Text>
                                <View style={{ justifyContent: "flex-start" }} />
                            </View>
                            <Text>
                                Số luợng:{" "}
                                {item.qty > 1 ? (
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "orange"
                                        }}
                                    >
                                        {item.qty}
                                    </Text>
                                ) : (
                                    item.qty
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: "black",
        paddingRight: 20,
        fontWeight: "bold"
    }
});
