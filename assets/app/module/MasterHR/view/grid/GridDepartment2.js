Ext.define('ERPh.module.MasterHR.view.grid.GridDepartment2', {
    extend      : 'Ext.grid.Panel',
    store       : 'ERPh.module.MasterHR.store.Department2',  
    title       : 'Companies Department',
    alias       : 'widget.griddepartment2',
    id          : 'griddepartment2',
    margins     : '0px 0px 0px 0px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'Code',
            dataIndex: 'code_department',
            width    : '15%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name_department',
            width    : '65%'
        }
    ],
    tbar: [
        '->',
        { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : true },
    ]
});