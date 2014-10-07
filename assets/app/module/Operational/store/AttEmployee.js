Ext.define('ERPh.module.Operational.store.AttEmployee',{
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.Profile.model.Employee',
    requires    : [
        'ERPh.module.Profile.model.Employee'
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
            read    : BASE_URL + 'Operational/c_attendance/getAttEmployee'
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