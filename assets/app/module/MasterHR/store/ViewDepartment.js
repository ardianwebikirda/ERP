Ext.define('ERPh.module.MasterHR.store.ViewDepartment', {
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.MasterHR.model.ViewDepartment',
    requires    : [
        'ERPh.module.MasterHR.model.ViewDepartment'
    ],
    autoLoad    : true,
    autoSync    : false,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'MasterHR/c_department/viewDepartment'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});