var langvi = {
  ERROR_PARSE_JSON: 'Lỗi xử lý dữ liệu',
  ERROR_NO_INTERNET: 'Không có kết nối Internet',

  error: {
    'Network Error': 'Không có kết nối Internet',
    'Request failed with status code 500': 'Lỗi Server',
    LOGIN_FAILED: 'Tài khoản/ Mật khẩu không chính xác',
    'Network request failed': 'Lỗi Server',
    DEL_INVOICE_NULL: 'Lỗi: Chưa xuất hoá đơn',
    DEL_WEIGHT_NULL: 'Lỗi: Chưa có khối lượng',
    DEL_WRONG_STATUS: 'Lỗi: Sai tình trạng đơn hàng',
    DEL_WRONG_PARTNER: 'Lỗi: Sai nhà vận chuyển',
    DEL_DUPLICATE_SUBORDER: 'Lỗi: Đơn hàng bị trùng',
    DEL_WRONG_BOOKSTORE: 'Sai mã nhà sách',
    DELI_MSCAN_NO_ITEM: 'Đơn hàng không hợp lệ',
    DEL_ORDER_NOT_FOUND: 'Không tìm được thông tin',
    ERR_SUBORDER_REJECTED: 'Đơn hàng đã bị từ chối',
    ERR_SUBORDER_CANCELED: 'Đơn hàng đã bị hủy',
    ERR_SUBORDER_NOINFO: 'Không có thông tin đơn hàng',
    EBIZ_POST_FAILED: 'Kết nối ebiz thất bại',
    TOTE_NOT_EXISTED: 'Khay không tồn tại',
    NO_SUBORDER_ID: 'Không có đơn hàng chờ nào',
    NO_ITEM_TO_PICK: 'Không có hàng để soạn',
    SUBORDER_NOT_FOUND: 'Đơn hàng đang được soạn',
    SUBORDER_NOT_ALLOCATED: 'Đơn hàng chưa được xuất',
    GRAB_ORDER_NOT_FOUND: 'Đơn hàng không hợp lệ',
    DEL_EVENT_INCORRECT: 'Đơn hàng giao sai ngày/giờ',
    RECHECK_EBIZ_ALREADY: 'Vị trí này đã được kiểm tra chênh lệch',
    SQL_ERROR: 'Dữ liệu bị lỗi, vui lòng kiểm tra lại',
    DUPLICATE_PRIMARY_KEY: 'Trùng người kiểm lại, vui lòng phân người khác',
    WRONG_STATUS: ' Sai trạng thái, vui lòng kiểm tra lại!',
    WRONG_SECONDARY_SKU: 'Quét sai mã, vui lòng quét mã còn lại trên sản phẩm!',
    'Authentication Failed': 'Lỗi xác thực tài khoản',
    'inventory audit (Kỳ kiểm kê) has invalid docstatus to update':
      'Kỳ kiểm kê này đã được up phiếu',
    'orgCode is blank': 'Không tìm thấy đơn vị kiểm kê',
    'appId is blank': 'Không tìm thấy kỳ kiểm kê',
    'orgCode invalid': 'Đơn vị kiểm kê không tồn tại',
    'appId is invalid': 'Kỳ kiểm kê không tồn tại',
    'orgCode not match with inventory audit':
      'Kỳ kiểm kê không đúng với đơn vị kiểm kê',
    'empty data': 'Dữ liệu kiểm kê trống',
    'data has invalid format': 'Format dữ liệu không đúng',
    'data invalid (has barcode duplicate in request)':
      'Có sku trùng trong dữ liệu kiểm kê',
    'data invalid (exists one line qty < 0 or barcode empty)':
      'Có sku số lượng bằng 0',
    'data invalid (has barcode not exists in idempiere)':
      'Có sku không tồn tại trong Idempiere',
    "Inventory audit doesn't exists": 'Kỳ kiểm kê không tồn tại',
    'request invalid': 'Không có dữ liệu kiểm kê',
    'Users invalid': 'Tài khoản user không tồn tại trên Idempier',
    'Inventory audit exists': 'Kì kiểm kê đã tồn tại',
    'userName/password invalid': 'Thông tin tài khoản không chính xác',
    'token invalid': 'Tài khoản user Idempier đã hết hạn đăng nhập',
    INVALID_TOTE_TYPE:
      'Đây là khay đơn (single), vui lòng mang qua khu đóng gói',
    INVALID_TOTE_TYPE_MULTIPLE:
      'Đây là khay đơn (multiple), vui lòng mang qua khu đóng gói',
    INVALID_SUBORDER_STATUS:
      'Trạng thái đơn hàng chính bị sai, vui lòng kiểm tra lại',
    PICKING_NOT_COMPLETED: 'Đơn hàng chưa soạn xong, vui lòng kiểm tra lại!',
    PICKING_WAS_REJECTED: 'Đơn hàng đã bị từ chối',
    WALL_LOCATION_COMPLETED: 'Vị trí tường đã hoàn tất!',
    NO_WALL_LOCATION_AVAILABLE:
      'Tất cả ô tường đều đã đầy, vui lòng tạo thêm ô tường!',
    TOTE_NO_ITEM_INFO: 'Không có thông tin hàng trong khay!',
    WALL_NO_LOCATION_INFO: 'Không có thông tin tường!',
    PRODUCT_NOT_IN_TOTE:
      'Sản phẩm không nằm trong khay, vui lòng kiểm tra lại!',
    'AMOUNT_IN_ TOTE_EXCEEDED': 'Sản phẩm vượt quá số lượng trong khay! ',
    NO_ORDER_TO_PICK: 'Không có đơn để soạn!',
    ERROR_REJECTED_SUBORDER: 'Đơn đã bị từ chối!',
    ERROR_CANCELED_SUBORDER: 'Đơn đã bị huỷ!',
    ERROR_PACKED_SUBORDER: 'Đơn đang đợi xuất hàng!',
    ERROR_DELIVERING_SUBORDER: 'Đơn đang được đi giao!',
    DUPLICATE_IDEM_USER:
      'Tài khoản Idempiere này hiện đang được sử dụng bởi nhân viên khác, vui lòng kiểm tra lại!',
    NO_PERIOD_ID: 'Không có kì kiểm kê nào đang diễn ra',
    USER_IN_INVENTORY:
      'Không thể xóa tài khoản. Tài khoản đang trong kỳ kiểm kê.',
    EXCEED_AMOUNT_IN_LIST: 'Sản phẩm vượt quá số luợng trong bảng kê!',
    PRODUCT_NOT_IN_LIST: 'Sản phẩm không có trong bảng kê',
    REQUEST_IS_PENDING: 'Bảng kê đã được duyệt rồi. Không thể hoàn tất duyệt!',
    USER_NOT_FOUND: 'Người dùng không tồn tại!',
    PASSWORD_NOT_MATCHED: 'Mật khẩu không hợp lệ!',
    NOT_DOCUMENT_NO: "Thùng không chứa phiếu",
    REQUEST_PROCESSED: "Bảng kê đã được xử lý",
    NOT_FOUND_BOX: "Không tìm thấy thùng"
  },
};

module.exports = langvi;
