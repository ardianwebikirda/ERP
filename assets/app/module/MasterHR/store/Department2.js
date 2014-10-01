Ext.define('ERPh.module.MasterHR.store.Department2',{
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.MasterHR.model.Department2',
    requires    : ['ERPh.module.MasterHR.model.Department2'],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type    : 'ajax',
        api     : {
        read    : BASE_URL + 'MasterHR/c_company/getDepartment2'
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