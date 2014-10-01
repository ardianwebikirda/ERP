Ext.define('ERPh.module.GeneralSetup.view.Users', {
    extend   :  'Ext.panel.Panel',
    title    : 'Users',
    iconCls  : 'icon-user',
    alias    : 'widget.Users',
    id       : 'Users',
    layout   : 'fit',     
    requires : [
        'ERPh.module.GeneralSetup.view.grid.GridUsers',
        'ERPh.module.GeneralSetup.view.form.FormUsers',
        'ERPh.module.GeneralSetup.view.grid.GridUsersOrg'
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
        {xtype   : 'gridusers', flex : 1},
        {xtype   : 'formusers', flex : 2},
        {xtype   : 'gridusersorg', flex : 1}
         
    ]
});