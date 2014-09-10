Ext.define('ERPh.model.TreeStore', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'number'
        },
        {
            name    : 'text',
            type    : 'string'
        },
        {
            name    : 'iconCls',
            type    : 'string'
        },
        {
            name    : 'leaf',
            type    : 'boolean'
        },
        {
            name    : 'selector',
            type    : 'string'
        },
        {
            name    : 'cls',
            type    : 'string'
        }
    ]
});
