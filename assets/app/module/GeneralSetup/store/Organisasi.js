Ext.define('ERPh.module.GeneralSetup.store.Organisasi', {
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.GeneralSetup.model.Organisasi',
    requires    : [
        'ERPh.module.GeneralSetup.model.Organisasi'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_organisasi/getOrganisasi'
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