Ext.define('ERPh.module.MasterHR.view.CompDep', {
    extend   : 'Ext.form.Panel',
    title    : 'Company Detail',
    alias    : 'widget.compdep',
    id       : 'compdep',
    layout   : 'fit',
    requires : [
        'ERPh.module.MasterHR.view.form.FormCompany',
        'ERPh.module.MasterHR.view.grid.GridDepartment2'
    ],
    height      : 250,
    width       : 1000,
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },
    items       : [ 
        {xtype   : 'formcompany', flex : 1},
        {xtype   : 'griddepartment2', flex : 2}         
    ]
});