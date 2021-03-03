import PriceFormat from "../PriceFormat";


export default function generate(total,shipperName,managerName) {
    let totalMoney = PriceFormat.formatTotal(total)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var hh = today.getHours()
    var min = today.getMinutes()

    var totalWord = num2word(total)

    const template = `<table style="width: 100%;">
    <tbody>
    <tr style="height: 77px;">
    <td style="width: 340.2px; height: 77px;">
    <p style="text-align: center;">CTY CP PH&Aacute;T H&Agrave;NH S&Aacute;CH TP.HCM</p>
    <p style="text-align: center;">TRUNG T&Acirc;M TMĐT FAHASA.COM</p>
    </td>
    <td style="width: 345.8px; height: 77px;">
    <p style="text-align: center;">CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</p>
    <p style="text-align: center;">Độc lập - Tự do - Hạnh ph&uacute;c</p>
    <p style="text-align: center;">----------***----------</p>
    </td>
    </tr>
    </tbody>
    </table>
    <h1 style="text-align: center;"><strong>BI&Ecirc;N NHẬN THU TIỀN</strong></h1>
    <p style="text-align: left;"><strong>Người nhận tiền: &nbsp;&nbsp;</strong>${managerName}</p>
    <p style="text-align: left;"><strong>C&oacute; nhận của:&nbsp;&nbsp; </strong>${shipperName}</p>
    <p style="text-align: left;"><strong>Số tiền l&agrave;:&nbsp;&nbsp;</strong>${totalMoney}</p>
    <p style="text-align: left;"><strong>Bằng chữ:</strong>&nbsp;&nbsp;${totalWord}&nbsp;đồng</p>
    <p style="text-align: left;"><strong>Về việc:</strong> &nbsp;&nbsp;Tiền giao hàng</p>
    <p style="text-align: right;"><strong>${hh + "h " +min}&nbsp;ng&agrave;y&nbsp;&nbsp;${dd}/${mm}/${yyyy}</strong></p>
    <table style="height: 5px;" width="100%">
    <tbody>
    <tr>
    <td style="width: 167.75px; text-align: center;">&nbsp;Người nhận tiền</td>
    <td style="width: 167.75px; text-align: center;">&nbsp;Người nộp tiền</td>
    <td style="width: 167.75px; text-align: center;">&nbsp;TP Kho &amp; XLĐH</td>
    <td style="width: 167.75px; text-align: center;">Người lập&nbsp;</td>
    </tr>
    <tr style="height: 88.9334px;">
    <td style="width: 167.75px; text-align: center; height: 88.9334px;">
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>${managerName}</p>
    </td>   
    <td style="width: 167.75px; text-align: center; height: 88.9334px;">
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>${shipperName}</p>
    </td>
    <td style="width: 167.75px; text-align: center; height: 88.9334px;">&nbsp;</td>
    <td style="width: 167.75px; text-align: center; height: 88.9334px;">&nbsp;</td>
    </tr>
    </tbody>
    </table>`

    return template
}

var ChuSo=new Array(" không "," một "," hai "," ba "," bốn "," năm "," sáu "," bảy "," tám "," chín ");
var Tien=new Array( "", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso)
{
    var tram;
    var chuc;
    var donvi;
    var KetQua="";
    tram=parseInt(baso/100);
    chuc=parseInt((baso%100)/10);
    donvi=baso%10;
    if(tram==0 && chuc==0 && donvi==0) return "";
    if(tram!=0)
    {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1))
    {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi)
    {
        case 1:
            if ((chuc != 0) && (chuc != 1))
            {
                KetQua += " mốt ";
            }
            else
            {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0)
            {
                KetQua += ChuSo[donvi];
            }
            else
            {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0)
            {
                KetQua += ChuSo[donvi];
            }
            break;
        }
    return KetQua;
}

function num2word(SoTien)
{

    var lan=0;
    var i=0;
    var so=0;
    var KetQua="";
    var tmp="";
    var ViTri = new Array();
    if(SoTien<0) return "Số tiền âm !";
    if(SoTien==0) return "Không đồng !";
    if(SoTien>0)
    {
        so=SoTien;
    }
    else
    {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999)
    {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if(isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
     if(isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
     if(isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
     if(isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
     if(isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
  if(isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0)
    {
        lan = 5;
    }
    else if (ViTri[4] > 0)
    {
        lan = 4;
    }
    else if (ViTri[3] > 0)
    {
        lan = 3;
    }
    else if (ViTri[2] > 0)
    {
        lan = 2;
    }
    else if (ViTri[1] > 0)
    {
        lan = 1;
    }
    else
    {
        lan = 0;
    }
    for (i = lan; i >= 0; i--)
    {
       tmp = DocSo3ChuSo(ViTri[i]);
       KetQua += tmp;
       if (ViTri[i] > 0) KetQua += Tien[i];
       if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
   if (KetQua.substring(KetQua.length - 1) == ',')
   {
        KetQua = KetQua.substring(0, KetQua.length - 1);
   }
   KetQua = KetQua.substring(1,2).toUpperCase()+ KetQua.substring(2);
   return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}
