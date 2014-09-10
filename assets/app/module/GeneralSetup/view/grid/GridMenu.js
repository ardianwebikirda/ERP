Ext.define('ERPh.module.GeneralSetup.view.grid.GridMenu', {
    extend   : 'Ext.grid.Panel',
    store    : 'ERPh.module.GeneralSetup.store.Menu',
    title    : 'Grid Menu',
    alias    : 'widget.gridmenu',
    id       : 'gridmenu', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'ERPh.module.GeneralSetup.store.Menu',
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
            text     : 'ID',
            dataIndex: 'id',
            width    : '5%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '20%'
        },
        {
            text     : 'Parent',
            dataIndex: 'parent',
            width    : '5%'
        },
        {
            text     : 'Icon',
            dataIndex: 'icon',
            width    : '10%'
        },
        {
            text     : 'Description',
            dataIndex: 'description',
            width    : '40%'
        },
        {
            dataIndex: 'id_menu',
            hidden   : true
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add', disabled : createMenu },
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteMenu },
         { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
         '->',
         {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type a keyword and press enter',
            width               : '35%',
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});