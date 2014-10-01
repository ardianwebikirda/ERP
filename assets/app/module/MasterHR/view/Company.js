Ext.define('ERPh.module.MasterHR.view.Company', {
    extend   :  'Ext.panel.Panel',
    title    : 'Company',
    alias    : 'widget.Company',
    iconCls  : 'icon-building',
    id       : 'Company',
    layout   : 'fit',
    requires : [
        'ERPh.module.MasterHR.view.CompDep',
        'ERPh.module.MasterHR.view.grid.GridCompany'
    ],
    height      : 250,
    width       : 1000,
    layout      : {
        type    :'hbox',
        padding :'3',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },
    closable    : true,
    items       : [ 
        {xtype   : 'gridcompany', flex : 1},
        {xtype   : 'compdep', flex : 2}
         
    ]
});