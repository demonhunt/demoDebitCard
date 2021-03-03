const blackList = {
    ex_supervisor: [
        "bookshelf/inventory/product/insert",
        "bookshelf/inventory/manager/insertinventoryrecheckassign",
        "bookshelf/inventory/manager/addproducttoshelfinv",
        "bookshelf/inventory/manager/updatestatusdiffchecked",
        "bookshelf/inventory/manager/updaterecheckqtyforproduct",
        "bookshelf/inventory/manager/removeproductfrombsinv",
        "bookshelf/inventory/manager/assignuserforrecheck"
    ],
    supervisor: [],
    manager: [],
    staff: []
};

function checkPermissionInventory(role, url) {
    if (blackList[role].includes(url)) {
        return false;
    } else return true;
}

export { checkPermissionInventory };
