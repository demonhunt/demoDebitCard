import PriceFormat from "../PriceFormat";

//
export default function generate(listOrder,shipperName) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var totalAll = 0 
    var Header = `<h2 style="text-align: center;">${"BẢNG KÊ XUẤT HÀNG GRAB"}</h2>
    <h3 style="text-align: center;">${dd}/${mm}/${yyyy}</h2>  

        <table class = "maintable">
            <caption>&nbsp;</caption><tbody>
        <tr>
        <th style="width: 3%;">&nbsp;STT</th>
        <th style="width: 12%;">&nbsp;M&atilde; đơn h&agrave;ng</th>
        <th style="width: 20%;">&nbsp;&nbsp;Kh&aacute;ch h&agrave;ng</th>
        <th style="width: 7%;">SĐT</th>
        <th style="width: 20%;">Địa chỉ&nbsp;</th>
        <th style="width: 8%;">Số CT/ HĐ</th>
        <th style="width: 3%;">Ng&agrave;y xuất HĐ</th>
        <th style="width: 5%;">&nbsp;Th&agrave;nh tiền</th>
        <th style="width: 10%;">&nbsp;Phương thức thanh to&aacute;n</th>
        <th style="width: 5%;">&nbsp;Nhận h&agrave;ng</th>
        <th style="width: 5%;">&nbsp;Trả hàng L1</th>
        <th style="width: 5%;">&nbsp;Trả hàng L2</th>
        <th style="width: 5%;">&nbsp;Note</th>
        </tr>`;
  var Body = ``;

  

  for (let i in listOrder) {
    let order = listOrder[i];
    let index = 1 + parseInt(i);
    let method = order.method == "cashondelivery"? "COD" : "Chuyển khoản trước"
    let total = method == "COD"?PriceFormat.formatString(order.total): 0;
    totalAll += method == "COD"? parseInt(order.total): 0
    let html = `<tr style="height: 10px;">
    <td class="maintable"  style="width: 3%; ">
        <p>&nbsp;${index}</p>
    </td>
    <td class="maintable"  style="width: 12%; ">
        <p>&nbsp;${order.suborder_id}</p>
    </td>
    <td class="maintable"  style="width: 20%; ">
        <p>${order.customerName}</p>
    </td>
    <td class="maintable"  style="width: 7%;  text-align: center;">
        <p>&nbsp;${order.telephone}</p>
    </td>
    <td class="maintable"  style="width: 20%;  text-align: left;">
        <p>&nbsp;${order.address}</p>
    </td>
    <td class="maintable"  style="width: 8%;  text-align: center;">
    <p>${order.invoice_number}</p>
    </td>
    <td class="maintable"  style="width: 3%;  text-align: center;">
    <p>${order.invoice_timestamp.split(" ")[0]}</p>
    </td>
    <td class="maintable"  style="width: 5%;  text-align: center;">
        <p>${total}</p>
    </td>
    <td class="maintable"  style="width: 10%; text-align: center;">
        <p>&nbsp;${method}</p>
    </td>
    <td class="maintable"  style="width: 5%; text-align: center;">
    <td class="maintable"  style="width: 5%; text-align: center;">
    <td class="maintable"  style="width: 5%; text-align: center;">
    <td class="maintable"  style="width: 5%; text-align: center;">
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
</td>
    </tr>`;
    Body += html;
  }

  var Footer = 
  `
    </tbody>
    </table>


    <p>Tổng cộng: &nbsp; &nbsp; &nbsp; ${PriceFormat.formatTotal(totalAll)} &nbsp; &nbsp; &nbsp;</p>
    <table style="height: 5px;" width="100%">
    <tbody>
    <tr style="height: 73.8438px;">
    <td class="footer" style="width: 50%; height: 73.8438px;">
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p style="text-align: center;">&nbsp; &nbsp;B&Ecirc;N GIAO&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>

    </td>
    <td class="footer" style="width: 50%; text-align: right; height: 73.8438px;">
    <p style="text-align: center;">&nbsp;Ng&agrave;y ${dd}/${mm}/${yyyy}</p>
    <p style="text-align: center;">&nbsp; B&Ecirc;N NHẬN</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p style="text-align: center;">${shipperName}&nbsp;</p>
    </td>
    </tr>
    </tbody>
    </table>
    <style>
        p {
            font-size: 75%
        }

        th {
            height: 50px
        }
        td {
            height: 40px
        }
        
        table.maintable,
        th,
        td.maintable {
            border: 1px solid black;
            border-collapse: collapse;
        }

        td.footer {
            border: 0px;
            border-collapse: collapse;
        }
    </style>`;
  return Header + Body + Footer;
}
