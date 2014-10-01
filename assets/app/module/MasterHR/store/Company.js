Ext.define('ERPh.module.MasterHR.store.Company',{
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.MasterHR.model.Company',
    requires    : [
        'ERPh.module.MasterHR.model.Company'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'MasterHR/c_company/getCompany'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});