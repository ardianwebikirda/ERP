Ext.define('ERPh.module.GeneralSetup.store.ViewOrganisasi', {
    extend      : 'Ext.data.Store',
    model       : 'ERPh.module.GeneralSetup.model.ViewOrganisasi',
    requires    : [
        'ERPh.module.GeneralSetup.model.ViewOrganisasi'
    ],
    autoLoad    : true,
    autoSync    : false,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_organisasi/viewOrganisasi'
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