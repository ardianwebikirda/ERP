Ext.define('ERPh.module.GeneralSetup.model.Menu', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'parent',
            type    : 'string'
        },
        {
            name    : 'id_menu',
            type    : 'string'
        },
        {
            name    : 'icon',
            type    : 'string'

        },
        {
            name    : 'isactive',
            type    : 'string'
        },
        {
            name    : 'description',
            type    : 'string'

        }
    ]
});