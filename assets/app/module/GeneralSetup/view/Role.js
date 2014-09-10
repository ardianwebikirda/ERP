Ext.define('ERPh.module.GeneralSetup.view.Role', {
    extend   :  'Ext.panel.Panel',
    title    : 'Role',
    alias    : 'widget.Role',
    id       : 'Role',
    layout   : 'fit',     
    requires : [
        'ERPh.module.GeneralSetup.view.grid.GridRole',
        'ERPh.module.GeneralSetup.view.grid.GridRoleMenu'
    ],
    height      : 250,
    width       : 1000,
    layout      : {
        type    :'hbox',
        // padding :'5',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },
    closable    : true,
    items       : [ {xtype   : 'gridrole'},
                    {xtype   : 'gridrolemenu'} 
    ]
});