Ext.define('ERPh.module.GeneralSetup.view.Menu', {
    extend   :  'Ext.panel.Panel',
    title    : 'Menu',
    iconCls  : 'icon-application_osx_link',
    alias    : 'widget.Menu',
    id       : 'Menu',
    layout   : 'fit',     
    requires : [
        'ERPh.module.GeneralSetup.view.grid.GridMenu',
    ],
    height      : 250,
    width       : 1000,
    layout      : 'fit',
    closable    : true,
    items       : [ {xtype   : 'gridmenu'} ]
});