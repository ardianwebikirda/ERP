Ext.define('ERPh.module.GeneralSetup.view.grid.GridOrganisasi', {
    extend   : 'Ext.grid.Panel',
    store    : 'ERPh.module.GeneralSetup.store.Organisasi',
    title    : 'Grid Organisasi',
    alias    : 'widget.gridorganisasi',
    id       : 'gridorganisasi', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'ERPh.module.GeneralSetup.store.Organisasi',
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
            hidden   : true,
            dataIndex: 'id',
        },
        {
            text     : 'Kode',
            dataIndex: 'value',
            width    : '10%'
        },
        {
            dataIndex: 'value_asli',
            hidden   : true
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '30%'
        },
        {
            text     : 'Parent',
            dataIndex: 'parent',
            width    : '10%'
        },
        {
            text     : 'Description',
            dataIndex: 'description',
            width    : '40%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add', disabled : createOrganisasi },
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteOrganisasi },
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