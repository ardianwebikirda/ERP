Ext.define('ERPh.module.GeneralSetup.view.grid.GridUsers', {
    extend   : 'Ext.grid.Panel',
    store    : 'ERPh.module.GeneralSetup.store.Users',
    title    : 'Grid Users',
    alias    : 'widget.gridusers',
    id       : 'gridusers', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'ERPh.module.GeneralSetup.store.Users',
        dock        : 'bottom',
        // displayInfo : true
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '50%'
        },
        {
            text     : 'Username',
            dataIndex: 'username',
            width    : '30%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteUsers },
         { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
         {
            xtype               : 'textfield',
            emptyText           : 'Type a keyword and press enter',
            width               : '100%',
            labelwidth          : 20,
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});