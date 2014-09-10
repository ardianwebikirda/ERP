Ext.define('ERPh.module.GeneralSetup.view.Organisasi', {
    extend   :  'Ext.panel.Panel',
    title    : 'Organisasi',
    alias    : 'widget.Organisasi',
    id       : 'Organisasi',
    layout   : 'fit',     
    requires : [
        'ERPh.module.GeneralSetup.view.grid.GridOrganisasi',
    ],
    height      : 250,
    width       : 1000,
    layout      : 'fit',
    closable    : true,
    items       : [ {xtype   : 'gridorganisasi'} ]
});