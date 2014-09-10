Ext.define('ERPh.module.GeneralSetup.store.ViewRole', {
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.GeneralSetup.model.ViewRole',
    requires    : [
        'ERPh.module.GeneralSetup.model.ViewRole'
    ],
    autoLoad    : true,
    autoSync    : false,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_role/viewRole'
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