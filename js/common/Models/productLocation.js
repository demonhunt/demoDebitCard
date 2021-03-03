import PriceFormat from '../../common/PriceFormat';
function productDetail(object) {
  this.entity_id = object.entity_id ? object.entity_id : null
  this.name = object.name ? object.name : ''
  this.image = object.image ? object.image : null
  this.sku = object.sku ? object.sku : ''
  this.childSku = object.childSku ? object.childSku : ''
  this.unit = object.unit ? object.unit : ''
  this.ebizNearQty = object.ebizNearQty ? object.ebizNearQty : 0
  // this.type_id = object.type_id ? object.type_id : null;
  // this.final_price = object.final_price ? object.final_price : 0;
  this.productType = object.productType ? object.productType : null
  this.price = object.price ? object.price : null
  this.age = object.age ? object.age : null
  this.reading_level = object.reading_level ? object.reading_level : null
  this.manufacturer = object.manufacturer ? object.manufacturer : null
  this.origin = object.origin ? object.origin : null
  this.noi_san_xuat = object.noi_san_xuat ? object.noi_san_xuat : null
  this.warranty = object.warranty ? object.warranty : null
  this.color = object.color ? object.color : null
  this.ink_color = object.ink_color ? object.ink_color : null
  this.material = object.material ? object.material : null
  this.soon_release = object.soon_release ? object.soon_release : null
  this.author = object.author ? object.author : null
  this.translator = object.translator ? object.translator : null
  this.publisher = object.publisher ? object.publisher : null
  this.publish_year = object.publish_year ? object.publish_year : null
  this.weight = object.weight ? object.weight : null
  this.size = object.size ? object.size : null
  this.qty_of_page = object.qty_of_page ? object.qty_of_page : null
  this.book_layout = object.book_layout ? object.book_layout : null
  this.number = object.number ? object.number : null
  this.pieces = object.pieces ? object.pieces : null
  this.salePower = object.salePower ? object.salePower : 0
  this.suggestionDisplay = object.zone_id ? object.zone_id : 0


  this.location =
    object.location && Object.keys(object.location).length > 0
      ? object.location.map(item => {
          return {
            bookshelfEntityId: item.bookshelfEntityId,
            bookshelfId: item.bookshelfId,
            decription: item.decription,
            quantity: parseInt(item.quantity),
          }
        })
      : []
}

function productLocation(object) {
  let product = new productDetail(object)
  return product
}

function selectListDetail(product) {
  let titleDays = 'SL NS bán ' + product.days + ' ngày:';
  let titleDaysHT = 'SL hệ thống bán ' + product.days + ' ngày:';
  return {
    'Tên:': product.name,
    'SKU:': product.sku,
    'Giá:': PriceFormat.formatTotal(product.price) + " / " + product.unit,
    'Tồn:': product.invQty,
    'Sức bán:': product.consumption,
    'SL NS bán 1 tuần:': product.bsSaleQty2,
    [titleDays]: product.bsSaleQty1,
    'SL hệ thống bán 1 tuần:': product.sysSaleQty2,
    [titleDaysHT]: product.sysSaleQty1,
    'Ngành:': product.category,
    'Nhóm:': product.category2,
    'Thể loại:': product.category3,
  };
};

function selectProductDetail(product) {
  let titleDays = 'SL NS bán ' + product.days + ' ngày:';
  let titleDaysHT = 'SL hệ thống bán ' + product.days + ' ngày:';
  return {
    'Tên:': product.ProductName,
    'SKU:': product.SKU,
    'Giá:': PriceFormat.formatTotal(product.ItemPrice) + " / " + product.unit,
    'Tồn:': product.BookstoreStock,
    'Sức bán:': product.consumption,
    'SL NS bán 1 tuần:': product.bsSaleQty2,
    [titleDays]: product.bsSaleQty1,
    'SL hệ thống bán 1 tuần:': product.sysSaleQty2,
    [titleDaysHT]: product.sysSaleQty1,
    'Ngành:': product.Category,
    'Nhóm:': product.Category2,
    'Thể loại:': product.Category3,
  };
};

function groupByLocationBasedOnProduct(object, listProduct) {
  if (object == null) return []
  let result = []
  listProduct.map(product => {
    let products = object.filter(x => x.sku == product.sku)
    let productInfo = {}
    if (products.length > 0) {
      productInfo = {
        productId: products[0].product_id,
        name: products[0].name,
        sku: products[0].sku,
        image: products[0].image,
        productType: products[0].productType,
        price: products[0].price,
        location: products
          .map(location => {
            return {
              bookshelfEntityId: location.bookshelfEntityId,
              bookshelfId: location.bookshelfName,
              decription: location.decription,
              quantity: location.quantity,
            }
          })
          .filter(x => x.bookshelfEntityId != null),
        quantity: product.quantity,
      }
    }
    result.push(productInfo)
  })
  return result
}

function groupByLocationBasedOnBookshelf(object) {
  if (object == null) return []
  //create list bookshelf
  let listShelf = object
    .map(location => {
      return {
        bookshelfEntityId: location.bookshelfEntityId,
        bookshelfId: location.bookshelfName,
        floor: location.floor ? parseInt(location.floor) : 0,
        type: location.type,
        shelfId: location.bookshelfId ? parseInt(location.bookshelfId) : 0,
        decription: location.decription,
        row: location.row ? parseInt(location.row) : 0,
      }
    })
    .filter(
      (value, index, self) =>
        self.findIndex(x => x.bookshelfEntityId == value.bookshelfEntityId) ===
        index
    )
  listShelf.sort((a, b) => {
    if (a.floor < b.floor) return -1
    if (a.floor > b.floor) return 1
    if (a.type < b.type) return -1
    if (a.type > b.type) return 1
    if (a.shelfId < b.shelfId) return -1
    if (a.shelfId > b.shelfId) return 1
    if (a.row < b.row) return -1
    if (a.row > b.row) return 1
    return 0
  })
  listShelf.map(shelf => {
    let products = object.filter(
      x => x.bookshelfEntityId == shelf.bookshelfEntityId
    )
    shelf.listProduct = products.map(product => {
      return {
        productId: product.product_id,
        name: product.name,
        sku: product.sku,
        image: product.image,
        productType: product.productType,
        price: product.price,
      }
    })
  })
  return listShelf
}

function mixMediaGalleryWithImage(media_gallery, image) {
  var images = []
  images.push({
    file: image ? image : '',
  })
  if (Object.keys(media_gallery).length > 0) {
    media_gallery.images.map(function(item) {
      if (item.file !== image) {
        images.push(new parseImageInMediaGallery(item))
      }
    })
  }
  return images
}

function parseImageInMediaGallery(object) {
  this.file = object.file ? object.file : ''
}
module.exports = {
  productLocation,
  groupByLocationBasedOnProduct,
  groupByLocationBasedOnBookshelf,
  mixMediaGalleryWithImage,
  selectListDetail,
  selectProductDetail
}
