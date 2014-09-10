Ext.define('ERPh.module.GeneralSetup.model.Organisasi', {
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
            name    : 'value',
            type    : 'string'
        },
        {
            name    : 'value_asli',
            type    : 'string'
        },
        {
            name    : 'parent',
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