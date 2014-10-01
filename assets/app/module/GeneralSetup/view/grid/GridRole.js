Ext.define('ERPh.module.GeneralSetup.view.grid.GridRole', {
    extend   : 'Ext.grid.Panel',
    store    : 'ERPh.module.GeneralSetup.store.Role',
    title    : 'Grid Role',
    alias    : 'widget.gridrole',
    id       : 'gridrole', 
    margins     :'3px 3px 3px 3px',
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : Ext.create('ERPh.module.GeneralSetup.store.Role'),
        dock        : 'bottom',
        displayInfo : true
    }],  
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '20%'
        },
        {
            text     : 'Description',
            dataIndex: 'description',
            width    : '40%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add', disabled : createRole },
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteRole },
         { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
         '->',
         {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type a keyword and press enter',
            width               : '50%',
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});