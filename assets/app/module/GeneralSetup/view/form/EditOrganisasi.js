Ext.define('ERPh.module.GeneralSetup.view.form.EditOrganisasi', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editorganisasi',
    id      : 'editorganisasi',
    layout  : 'fit',
    modal   : true,
    requires: [
        'ERPh.module.GeneralSetup.store.ViewOrganisasi',
    ],
    title   : 'Edit Organisasi',
    autoShow: true,
    width   : 600,
    height  : 400,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype       : 'form',
                border      : false,
                bodyPadding : 5,
                items: [
                    {
                        xtype       : 'textfield',
                        name        : 'id',
                        fieldLabel  : 'ID',
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        name        : 'value_asli',
                        fieldLabel  : 'Value',
                        anchor      : '100%',
                        labelWidth  : 120,
                        readOnly    : true
                    },{
                        xtype       : 'textfield',
                        name        : 'name',
                        fieldLabel  : 'Nama Organisasi',
                        anchor      : '100%',
                        labelWidth  : 120
                    },{
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Parent Organisasi',
                        fieldLabel  : 'Parent Organisasi',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewOrganisasi'),
                        displayField: 'name',
                        valueField  : 'value',
                        anchor      : '100%',
                        labelWidth  : 120
                    },{
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        fieldLabel  : 'Aktif',
                        anchor      : '100%',
                        inputValue   : 'isactive',
                        labelWidth  : 120
                    },{
                        xtype       : 'htmleditor',
                        name        : 'description',
                        fieldLabel  : 'Keterangan',
                        labelWidth  : 77
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Edit',
                xtype   : 'button',
                iconCls : 'icon-disk',
                action  : 'update',
                disabled: updateOrganisasi
            }
        ];
        me.callParent(arguments);
    }
});

// xtype : 'combobox',
// name : 'id_country',
// emptyText : 'Type to Select Country',
// fieldLabel : 'Country',
// autoScroll : false,
// store : Ext.create('HRIS.module.MasterData.store.MinCountry'),
// displayField: 'name',
// valueField : 'id',
// ardianwebikirda@yahoo.com:‎ anchor : '100%',
// listeners: {
// buffer: 100,
// change: function() {
// var store = this.store;
// //store.suspendEvents();
// store.clearFilter();
// //store.resumeEvents();
// store.filter({
// property: 'name',
// anyMatch: true,
// value : this.getValue()
// });
// }
// }
// },