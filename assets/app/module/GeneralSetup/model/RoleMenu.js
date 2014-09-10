Ext.define('ERPh.module.GeneralSetup.model.RoleMenu', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'idrole',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'menu',
            type    : 'string'
        },
        {
            name    : 'isactive',
            type    : 'string'
        },
        {
            name    : 'iscreate',
            type    : 'string'
        },
        {
            name    : 'isupdate',
            type    : 'string'
        },
        {
            name    : 'isdelete',
            type    : 'string'
        },
        {
            name    : 'isprocess',
            type    : 'string'
        }
    ]
});
